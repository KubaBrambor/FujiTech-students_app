from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Create FastAPI app with root path
app = FastAPI()

# List of allowed origins
origins = [
    # default port for Nuxt.js
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"message": "Backend działa!"}


@app.get("/users")
def read_users():
    return {"message": "Uzytkownicy zwróceni"}
