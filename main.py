from pathlib import Path

import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from typing import Literal

BASE_DIR = Path(__file__).resolve().parent
model = joblib.load('Mental_Health_Model.pkl')

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_methods=['*'],
    allow_headers=['*'],
)

app.mount('/static', StaticFiles(directory=str(BASE_DIR)), name='static')

top_countries = ['Other', 'India', 'USA', 'Canada', 'Australia', 'UK', 'Germany', 'Mexico', 'Turkey', 'France']


class StudentData(BaseModel):
    age: int = Field(..., ge=10, le=100)
    gender: Literal['Male', 'Female']
    country: str
    acadimic_level: Literal['Undergraduate', 'Graduate', 'High School']
    most_used_platform: Literal['Facebook', 'LinkedIn', 'Instagram', 'Snapchat', 'Twitter', 'YouTube', 'TikTok', 'LINE', 'KakaoTalk', 'VKontakte', 'WhatsApp', 'WeChat']
    purpose_of_use: Literal['Networking', 'Education', 'Entertainment', 'News']
    avg_daily_usage_hours: float = Field(..., ge=0, le=24)
    daily_unlocks: int = Field(..., ge=0)
    study_hours: float = Field(..., ge=0, le=24)
    physical_activity_hours: float = Field(..., ge=0, le=2)
    sleep_hours_per_night: float = Field(..., ge=0, le=24)
    stress_level: Literal['Medium', 'Low', 'Very High', 'High']


# Describe what we send back
class PredictionResponce(BaseModel):
    predicted_mental_health_score: float


@app.get('/', include_in_schema=False)
def home_page():
    return FileResponse(BASE_DIR / 'index.html')


@app.get('/predict-page', include_in_schema=False)
def prediction_page():
    return FileResponse(BASE_DIR / 'index.html')


@app.post('/predict', response_model=PredictionResponce)
def predict(data: StudentData):

    country_group = data.country if data.country in top_countries else 'Other'

    input_df = pd.DataFrame([{
        'Age': data.age,
        'Gender': data.gender,
        'Country': data.country,
        'Academic_Level': data.acadimic_level,
        'Most_Used_Platform': data.most_used_platform,
        'Purpose_Of_Use': data.purpose_of_use,
        'Avg_Daily_Usage_Hours': data.avg_daily_usage_hours,
        'Daily_Unlocks': data.daily_unlocks,
        'Study_Hours': data.study_hours,
        'Physical_Activity_Hours': data.physical_activity_hours,
        'Sleep_Hours_Per_Night': data.sleep_hours_per_night,
        'Stress_Level': data.stress_level,
        'Grouped_Country': country_group
    }])

    prediction = model.predict(input_df)[0]
    return PredictionResponce(predicted_mental_health_score=round(float(prediction), 2))

