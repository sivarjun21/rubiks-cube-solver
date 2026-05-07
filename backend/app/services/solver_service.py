from solver.kociemba_solver import solve as kociemba_solve

# Valid cube characters
VALID_FACES = {"U", "R", "F", "D", "L", "B"}


def solve_cube(cube: str) -> str:
    """
    Solve a Rubik's cube given a 54-character cube string.

    Returns:
        str: Solution moves (e.g., "R U R' U'")
    """

    # 1. Basic validation
    if not cube or len(cube) != 54:
        raise ValueError("Cube string must be exactly 54 characters")

    # 2. Validate characters
    for char in cube:
        if char not in VALID_FACES:
            raise ValueError(f"Invalid character '{char}' in cube string")

    # 3. Validate face counts (each must appear exactly 9 times)
    for face in VALID_FACES:
        if cube.count(face) != 9:
            raise ValueError(f"Invalid cube: '{face}' must appear exactly 9 times")

    try:
        # 4. Call solver
        solution = kociemba_solve(cube)

        # 5. Validate solver output
        if not solution or not isinstance(solution, str):
            raise ValueError("Solver returned invalid solution")

        return solution.strip()

    except Exception as e:
        # Catch solver errors (invalid cube, unsolvable state, etc.)
        raise ValueError(f"Failed to solve cube: {str(e)}")