from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    """
    Application configuration settings.
    """

    # App info
    APP_NAME: str = "Rubik's Cube Solver"
    VERSION: str = "1.0.0"
    DEBUG: bool = True

    # Server
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # CORS
    ALLOWED_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
    ]

    # Solver settings
    MAX_SOLUTION_LENGTH: int = 30  # safety cap

    # Scan settings
    GRID_SIZE: int = 3
    REQUIRED_FACES: list[str] = ["U", "R", "F", "D", "L", "B"]

    class Config:
        env_file = ".env"
        case_sensitive = True


@lru_cache
def get_settings() -> Settings:
    """
    Cached settings instance.
    """
    return Settings()