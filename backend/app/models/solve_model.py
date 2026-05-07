from pydantic import BaseModel, Field, field_validator


class SolveRequest(BaseModel):
    """
    Request model for solving the cube.
    """
    cube: str = Field(
        ...,
        description="54-character cube string in URFDLB format",
        min_length=54,
        max_length=54
    )

    @field_validator("cube")
    @classmethod
    def validate_cube(cls, value: str) -> str:
        allowed_chars = {"U", "R", "F", "D", "L", "B"}

        # Ensure only valid characters
        for char in value:
            if char not in allowed_chars:
                raise ValueError(f"Invalid character '{char}' in cube string")

        # Ensure each face appears exactly 9 times
        for face in allowed_chars:
            if value.count(face) != 9:
                raise ValueError(f"Invalid cube: '{face}' must appear exactly 9 times")

        return value


class SolveResponse(BaseModel):
    """
    Response model for solved cube.
    """
    success: bool
    solution: str = Field(
        ...,
        description="Solution moves as a string (e.g., 'R U R' U')"
    )
    moves: list[str] = Field(
        ...,
        description="Solution moves as a list (e.g., ['R', 'U', \"R'\", \"U'\"])"
    )