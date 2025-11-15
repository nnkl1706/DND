from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# 1. Define the input data structure
class CharacterName(BaseModel):
    name: str

# 2. Initialize the FastAPI app
app = FastAPI()

# 3. Configure CORS (Crucial for frontend to talk to backend)
# In a production environment, you would restrict the origins to your frontend URL.
origins = [
    "http://localhost:5173", # Default Vite development port
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 4. Define the endpoint to start the game
@app.post("/start_game")
def start_game(character: CharacterName):
    """
    Receives the character name and returns a starting message.
    """
    message = (
        f"The server welcomes you, **{character.name}**! "
        "Your adventure officially begins. Check the console for server confirmation."
    )
    print(f"--- SERVER: New game started for character: {character.name} ---")
    
    # In a full game, you would save the character here and return initial game state data
    return {"message": message, "character_name": character.name, "location": "Forest Entrance"}

# 5. Root endpoint (optional, good for health check)
@app.get("/")
def read_root():
    return {"status": "backend operational"}