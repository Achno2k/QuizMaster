from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import users, auth, scores
from .database import engine
from . import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow CORS for React development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(auth.router)
app.include_router(scores.router)

@app.get('/')
async def get_root():
    return {"message": "Hello World"}