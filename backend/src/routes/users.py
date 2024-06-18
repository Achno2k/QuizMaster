from fastapi import status, HTTPException, Depends, APIRouter
from .. import models, schemas, utils
from ..database import get_db
from sqlalchemy.orm import Session
from sqlalchemy.future import select


router = APIRouter(
    prefix="/users",
    tags=['Users']
)

@router.post("/signup", status_code=status.HTTP_201_CREATED, response_model=schemas.UserResponse)
async def create_user(user: schemas.UserSignup, db: Session = Depends(get_db)):

    user_query = db.execute(select(models.User).filter(models.User.enroll == user.enroll))
    if user_query.first():
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Enrollnment number already registered. Please try again")

    user_query2 = db.execute(select(models.User).filter(models.User.email == user.email))
    if user_query2.first():
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Email id already exists")

    user_enroll = str(user.enroll)
    if not (user_enroll.startswith("2") or user_enroll.startswith("9")):
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Enrollment number must start with '2' or '9'")

    if not (len(user_enroll) == 8 or len(user_enroll) == 10):
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Invalid Enrollment Number")
    
    if "mail.jiit.ac.in" not in user.email:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Please use the college email id to login")
    
    user.password = utils.hash_password(user.password)
    new_user = models.User(**(dict(user)))
    # print(new_user)

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return  new_user