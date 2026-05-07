import kociemba


def solve(cube: str) -> str:
    """
    Solve the Rubik's cube using Kociemba algorithm.

    Args:
        cube (str): 54-character cube string in URFDLB format

    Returns:
        str: Solution moves (e.g., "R U R' U'")
    """

    try:
        solution = kociemba.solve(cube)
        return solution

    except Exception as e:
        # Normalize error message
        raise ValueError(f"Kociemba solver error: {str(e)}")