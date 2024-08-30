from pydantic import BaseModel, UUID4
from typing import Optional, List


class BaseFilterObj(BaseModel):
    skip: Optional[int] = None
    take: Optional[int] = None
