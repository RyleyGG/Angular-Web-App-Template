from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime
import uuid
from sqlalchemy import Column, String, Integer, Float, ForeignKey, ForeignKeyConstraint


class Dummy(SQLModel, table=True):
    __tablename__ = 'Dummy'
    id: Optional[uuid.UUID] = Field(default_factory=uuid.uuid4, primary_key=True)
    some_str: str = Field(sa_column=Column(String(255)))
