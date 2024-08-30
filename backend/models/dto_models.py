from pydantic import BaseModel, UUID4
from typing import Optional, List


class SignUpInfo(BaseModel):
    """
    Used to register a new user. Holds all information necessary to create a new user.
    """
    email_address: str
    first_name: str
    last_name: str
    password: str
    user_type: Optional[str] = None


class SignInInfo(BaseModel):
    """
    Used to sign in a user. 
    """
    username: str
    password: str


class SuccessfulUserAuth(BaseModel):
    """
    Represents the OAuth2 data that is generated upon successful login.
    """
    token_type: str
    access_token: str
    refresh_token: str
    user_id: UUID4


class RefreshToken(BaseModel):
    """
    A OAuth2 refresh token.
    """
    refresh_token: str


class UserFilters(BaseModel):
    """
    Used to make filter queries on users. 
    """
    ids: Optional[List[UUID4]] = None
    emails: Optional[List[str]] = None
    user_types: Optional[List[str]] = None
