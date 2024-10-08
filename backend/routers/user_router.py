from fastapi import APIRouter, Depends
from typing import List

from sqlmodel import Session, select

from models.db_models import User
from models.dto_models import UserFilters
from services import auth_service
from services.api_utility_service import get_session

router = APIRouter()


@router.get('/me', response_model=User, response_model_by_alias=False)
async def get_current_user(user: User = Depends(auth_service.validate_token)):
    return user


@router.post('/update_user', response_model=User, response_model_by_alias=False)
async def update_current_user(updated_user: User, user: User = Depends(auth_service.validate_token), db: Session = Depends(get_session)):
    user.first_name = updated_user.first_name
    user.last_name = updated_user.last_name
    user.email_address = updated_user.email_address
    db.commit()
    return user


@router.post('/search', response_model=List[User], response_model_by_alias=False)
async def search_users(filters: UserFilters, db: Session = Depends(get_session)):
    if not filters:
        return None

    query_statement = select(User)
    if filters.ids:
        query_statement = query_statement.where(User.id.in_(filters.ids))
    if filters.emails:
        query_statement = query_statement.where(User.email_address.in_(filters.emails))
    if filters.user_types:
        query_statement = query_statement.where(User.user_type.in_(filters.user_types))

    return_obj = db.exec(query_statement).all()
    return return_obj
