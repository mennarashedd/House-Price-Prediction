from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.prediction import router as prediction_router
from app.services.inference import ModelService

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("⏳ Loading Machine Learning Model...")
    app.state.model_service = ModelService(model_path="models/house_price.pkl")
    print("✅ Model loaded successfully!")
    
    yield
    
    print("🛑 Shutting down server...")
    app.state.model_service = None

app = FastAPI(
    title="House Price Prediction API",
    version="1.0.0",
    lifespan=lifespan
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prediction_router, prefix="", tags=["Prediction"])

@app.get("/")
def home():
    return {"message": "House Price Prediction API is Running "}