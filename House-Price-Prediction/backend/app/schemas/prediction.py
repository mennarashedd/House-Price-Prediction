from pydantic import BaseModel

class PredictionRequest(BaseModel):
    location: str
    carpet_area_sqft: float
    floor_num: int
    total_floors: int = 5
    bathroom: int
    balcony: int
    car_parking: int = 1
    furnishing: str
    transaction: str
    ownership: str
    facing: str

class PredictionResponse(BaseModel):
    predicted_price: float