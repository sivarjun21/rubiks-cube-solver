from typing import Dict, List


# Color → Face mapping (STRICT)
COLOR_TO_FACE = {
    "white": "U",
    "red": "R",
    "green": "F",
    "yellow": "D",
    "orange": "L",
    "blue": "B",
}

# Required face order for kociemba
FACE_ORDER = ["U", "R", "F", "D", "L", "B"]


def map_faces_to_cube_string(faces: Dict[str, List[List[str]]]) -> str:
    """
    Convert scanned faces (color grids) into a cube string.

    Args:
        faces: Dict of face → 3x3 color grid

    Returns:
        54-character cube string
    """

    cube_string = ""

    # Iterate in correct order
    for face in FACE_ORDER:
        grid = faces[face]

        # Flatten 3x3 grid row-wise
        for row in grid:
            for color in row:
                if color not in COLOR_TO_FACE:
                    raise ValueError(f"Unknown color '{color}'")

                cube_string += COLOR_TO_FACE[color]

    return cube_string