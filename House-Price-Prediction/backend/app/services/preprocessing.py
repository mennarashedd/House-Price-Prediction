import pandas as pd
from app.schemas.prediction import PredictionRequest

def prepare_features(request: PredictionRequest) -> pd.DataFrame:
    
    data = {
        "Carpet_Area_sqft": [request.carpet_area_sqft],
        "Floor_Number": [request.floor_num],
        "Total_Floors": [request.total_floors],
        "Bathroom": [request.bathroom],
        "Balcony": [request.balcony],
        "Car Parking": [request.car_parking],
        "location_grouped": [request.location],
        "Furnishing": [request.furnishing],
        "Transaction": [request.transaction],
        "Ownership": [request.ownership],
        "facing": [request.facing]
    }
    return pd.DataFrame(data)