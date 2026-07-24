# 🧠 Mental Health Prediction System using Machine Learning & FastAPI

A full-stack Machine Learning application that predicts a student's **Mental Health Score** based on demographic information, academic background, social media usage habits, lifestyle factors, and stress level.

The project demonstrates an end-to-end Machine Learning workflow, from data preprocessing and model training to API development and an interactive frontend interface.

## 🚀 Features

* Predicts Mental Health Score using a trained Machine Learning model
* FastAPI REST API for real-time predictions
* Interactive and responsive web interface
* Input validation using Pydantic
* CORS enabled for frontend integration
* Clean and modular project structure
* Real-time prediction with loading animation and error handling

## 📊 Input Features

The model makes predictions using the following features:

* Age
* Gender
* Country
* Academic Level
* Most Used Social Media Platform
* Purpose of Social Media Usage
* Average Daily Usage Hours
* Daily Phone Unlocks
* Study Hours
* Physical Activity Hours
* Sleep Hours Per Night
* Stress Level

## 🛠️ Tech Stack

### Machine Learning

* Python
* Pandas
* NumPy
* Scikit-learn
* Joblib

### Backend

* FastAPI
* Pydantic
* Uvicorn

### Frontend

* HTML5
* CSS3
* Vanilla JavaScript
* Fetch API

## 📂 Project Workflow

1. Collect and preprocess the dataset
2. Perform data cleaning and feature engineering
3. Train the Machine Learning model
4. Save the trained model using Joblib
5. Build REST API with FastAPI
6. Connect frontend with backend using Fetch API
7. Display prediction results in a modern user interface

## ▶️ Running the Project

### Install dependencies

```bash
pip install -r requirements.txt
```

### Start the FastAPI server

```bash
uvicorn main:app --reload --port 8500
```

The API will be available at:

```
http://127.0.0.1:8500
```

## 📡 API Endpoint

### POST `/predict`

Returns the predicted mental health score based on the provided student information.

## 📁 Project Structure

```text
├── main.py
├── Mental_Health_Model.pkl
├── requirements.txt
├── index.html
├── style.css
├── script.js
└── README.md
```

## 🎯 Learning Outcomes

This project demonstrates practical experience with:

* Machine Learning Model Development
* Data Preprocessing
* Feature Engineering
* Model Deployment
* REST API Development
* Frontend–Backend Integration
* Full-Stack AI Application Development

## 🔮 Future Improvements

* User Authentication
* Database Integration
* Prediction History
* Model Performance Dashboard
* Docker Deployment
* Cloud Deployment (AWS, Azure, or Render)
* Explainable AI (SHAP/LIME)
* Improved Model Accuracy through Hyperparameter Tuning

## 👨‍💻 Author

**Umair Babar**

Aspiring Machine Learning Engineer passionate about building AI-powered applications that solve real-world problems through Machine Learning, Data Science, and Generative AI.
