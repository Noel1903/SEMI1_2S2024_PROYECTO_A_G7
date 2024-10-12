from sqlalchemy import Column, Integer, String, Date, DateTime
from sqlalchemy.ext.declarative import declarative_base
from models.base import Base 

class Schedule(Base):
    __tablename__ = 'schedules'
    id_schedule = Column(Integer, primary_key=True, autoincrement=True)
    datetime_start = Column(DateTime, nullable=False)
    datetime_end = Column(DateTime, nullable=False)
    id_course = Column(Integer, nullable=False)
    id_user = Column(Integer, nullable=False)

###### RECORDATORIOS ######

class Reminder(Base):
    __tablename__ = 'reminders'
    id_reminder = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(200), nullable=False)
    description = Column(String(200), nullable=False)
    date = Column(Date, nullable=False)
    hour = Column(DateTime, nullable=False)
    id_user = Column(Integer, nullable=False)