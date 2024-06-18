from fastapi import status, HTTPException, Depends, APIRouter
from .. import models, schemas, utils
from ..database import get_db
from sqlalchemy.orm import Session
from .. import oauth2

router = APIRouter(
    tags=['Scores']
)

@router.put("/score/{score}", status_code=status.HTTP_200_OK, response_model=schemas.UserScoreResponse)
async def updateScore(score: int, db : Session = Depends(get_db), current_user: models.User =  Depends(oauth2.get_current_user)):    
    if score < 0:
        raise HTTPException(status_code=status.HTTP_406_NOT_ACCEPTABLE, detail="Score should be a positive integer")
    
    user = db.query(models.User).filter(models.User.id == current_user.id).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST)
    
    user.score = score
    db.add(user)
    db.commit()
    db.refresh(user)

    return user


    