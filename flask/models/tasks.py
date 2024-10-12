from sqlalchemy import Column, Integer, String, Date, DateTime
from sqlalchemy.ext.declarative import declarative_base
from models.base import Base 

class Task(Base):
    __tablename__ = 'tasks'
    id_task = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(200), nullable=False)
    description = Column(String(200), nullable=False)
    date = Column(Date, nullable=False)
    hour = Column(DateTime, nullable=False)
    id_course = Column(Integer, nullable=False)

class UploadTask(Base):
    __tablename__ = 'upload_task'
    id_upload = Column(Integer, primary_key=True, autoincrement=True)
    file = Column(String(200), nullable=False)
    state = Column(String(200), nullable=False)
    date = Column(DateTime, nullable=False)
    id_user = Column(Integer, nullable=False)
    id_task = Column(Integer, nullable=False)