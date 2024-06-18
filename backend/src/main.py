from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from .routes import users, auth, scores
from .database import engine
from . import models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Allow CORS for React development

origins = [
    "https://quiz-master-app.netlify.app/",
    "http://localhost:5174/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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