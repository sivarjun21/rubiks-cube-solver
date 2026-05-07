from typing import Dict, List
from app.services.cube_mapper import map_faces_to_cube_string


# Allowed colors
VALID_COLORS = {"white", "red", "green", "yellow", "orange", "blue"}

# Expected face order
REQUIRED_FACES = ["U", "R", "F", "D", "L", "B"]


def process_scan(faces: Dict[str, List[List[str]]]) -> str:
    """
    Process scanned cube faces and convert to cube string.
    """

    # 1. Validate all faces exist
    for face in REQUIRED_FACES:
        if face not in faces:
            raise ValueError(f"Missing face: {face}")

    # 2. Validate each face is 3x3
    for face_name, grid in faces.items():
        if len(grid) != 3:
            raise ValueError(f"{face_name} must have 3 rows")

        for row in grid:
            if len(row) != 3:
                raise ValueError(f"{face_name} must be 3x3 grid")

    # 3. Validate colors
    for face_name, grid in faces.items():
        for row in grid:
            for color in row:
                if color.lower() not in VALID_COLORS:
                    raise ValueError(f"Invalid color '{color}' in face {face_name}")

    # 4. Normalize colors (lowercase)
    normalized_faces = {
        face: [[color.lower() for color in row] for row in grid]
        for face, grid in faces.items()
    }

    # 5. Convert to cube string
    cube_string = map_faces_to_cube_string(normalized_faces)

    # 6. Validate cube string length
    if len(cube_string) != 54:
        raise ValueError("Invalid cube string generated")

    return cube_string