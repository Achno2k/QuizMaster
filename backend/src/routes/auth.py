from fastapi import APIRouter, Depends, HTTPException, Response, status
from sqlalchemy.orm import Session
from .. import database, schemas, models
from .. import utils, oauth2

router = APIRouter(
    prefix="/users",
    tags=['Authentication']
)

@router.post("/login", status_code=status.HTTP_200_OK)
async def login(user_credentials: schemas.UserLogin, db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.enroll == user_credentials.enroll).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Enrollnment number not found. Please try again")
    
    if not utils.verify_password(user_credentials.password, user.password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Invalid credentials. Please try again")
    
    access_token = oauth2.create_token({"user_id": user.id})
    return {"access_token": access_token, "user": {"firstname": user.firstname, "lastname": user.lastname, "enroll": user.enroll}}