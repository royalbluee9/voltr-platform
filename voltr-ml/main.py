from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import random

app = FastAPI(title="VOLTR AI Forecasting Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Open to Node gateway
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PredictRequest(BaseModel):
    instrument_id: str
    current_price: float
    history_window_size: int = 50

class PredictResponse(BaseModel):
    instrument_id: str
    predicted_price: float
    confidence_score: float
    trend: str

@app.post("/predict", response_model=PredictResponse)
async def predict_price(req: PredictRequest):
    # Simulated Geometric Brownian Motion (GBM) step for fake inference
    # S(t+1) = S(t) * exp((mu - 0.5 * sigma^2)*dt + sigma * dW)
    
    mu = 0.001     # Drift
    sigma = 0.02   # Volatility
    dt = 1.0       # Time step

    # Random shock
    W = np.random.normal(0, np.sqrt(dt))
    
    drift = (mu - 0.5 * sigma**2) * dt
    diffusion = sigma * W
    
    growth_factor = np.exp(drift + diffusion)
    predicted_val = req.current_price * growth_factor
    
    # Generate a realistic-looking confidence bound (70%-99%)
    confidence = round(random.uniform(70.0, 99.0), 2)
    
    if predicted_val > req.current_price * 1.001:
        trend = "BULLISH"
    elif predicted_val < req.current_price * 0.999:
        trend = "BEARISH"
    else:
        trend = "NEUTRAL"
        
    return PredictResponse(
        instrument_id=req.instrument_id,
        predicted_price=round(predicted_val, 4),
        confidence_score=confidence,
        trend=trend
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
