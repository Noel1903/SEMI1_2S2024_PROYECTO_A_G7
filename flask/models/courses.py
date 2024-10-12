from sqlalchemy import Column, Integer, String, Date, DateTime
from sqlalchemy.ext.declarative import declarative_base
from models.base import Base 

class Course(Base):
    __tablename__ = 'courses'
    id_course = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(200), nullable=False)
    credits = Column(Integer, nullable=False)
    start_time = Column(DateTime, nullable=False)
    end_time = Column(DateTime, nullable=False)

class Notification(Base):
    __tablename__ = 'notifications'
    id_notification = Column(Integer, primary_key=True, autoincrement=True)
    message = Column(String(200), nullable=False)
    type = Column(String(200), nullable=False)
    datetime_notification = Column(DateTime, nullable=False)
    id_user = Column(Integer, nullable=False)