import joblib
import numpy as np
import pandas as pd

class ModelService:
    def __init__(self, model_path: str = "models/house_price.pkl"):
       
        self.model = joblib.load(model_path)

    def predict(self, df: pd.DataFrame) -> float:
       
        raw_pred = self.model.predict(df)[0]
       
        predicted_price = float(np.expm1(raw_pred)) if raw_pred < 50 else float(raw_pred)
        return predicted_price