from fastapi import APIRouter, HTTPException, Request
from app.schemas.prediction import PredictionRequest, PredictionResponse
from app.services.preprocessing import prepare_features

router = APIRouter()

@router.get("/health")
def health_check():
    return {"status": "ok"}

@router.post("/predict", response_model=PredictionResponse)
def predict_house_price(request_data: PredictionRequest, request: Request):
    try:
        model_service = request.app.state.model_service
        if model_service is None:
            raise HTTPException(status_code=500, detail="Model is not loaded")
            
        df = prepare_features(request_data)
        predicted_price = model_service.predict(df)
        return PredictionResponse(predicted_price=predicted_price)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))