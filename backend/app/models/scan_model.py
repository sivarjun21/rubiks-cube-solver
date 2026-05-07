from pydantic import BaseModel, Field
from typing import Dict, List


# Type alias for a 3x3 face grid
FaceGrid = List[List[str]]


class ScanRequest(BaseModel):
    """
    Request model for cube scan.

    faces:
        Dictionary of 6 faces (U, R, F, D, L, B),
        each containing a 3x3 grid of color strings.
    """
    faces: Dict[str, FaceGrid] = Field(
        ...,
        description="Cube faces with 3x3 color grids"
    )


class ScanResponse(BaseModel):
    """
    Response model after processing scan.
    """
    success: bool
    cube: str = Field(
        ...,
        description="54-character cube string in URFDLB format"
    )