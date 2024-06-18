from pydantic import BaseModel, EmailStr

class UserSignup(BaseModel):
    firstname: str
    lastname: str
    email: EmailStr
    enroll: int
    password: str

class UserLogin(BaseModel):
    enroll: int
    password: str

class UserResponse(BaseModel):
    firstname: str
    lastname: str
    enroll: int
    email: EmailStr

class AccessToken(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    id: str

class UserScoreResponse(UserResponse):
    score: int
