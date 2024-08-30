from typing import Optional
import uuid

from sqlmodel import SQLModel, Field

# class UserType(Enum):
#     """
#     An enum for user types.
#     """
#     USER = 'User'
#     ADMIN = 'Administrator'


class User(SQLModel, table=True):
    """
    Data representing a user. 
    """
    __tablename__ = 'User'
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True, index=True)
    first_name: str
    last_name: str
    email_address: str
    password: str
    # user_type: UserType