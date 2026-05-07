import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def get_solved_cube():
    return "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB"


def get_valid_scrambled_cube():
    # Simple valid scramble (still solvable)
    return "UUUUUUUUURRRRRRRRRFFFFFFFFFDDDDDDDDDLLLLLLLLLBBBBBBBBB"


def test_solve_valid_cube():
    payload = {
        "cube": get_solved_cube()
    }

    response = client.post("/api/v1/solve", json=payload)

    assert response.status_code == 200

    data = response.json()

    assert data["success"] is True
    assert "solution" in data
    assert "moves" in data
    assert isinstance(data["moves"], list)


def test_solve_invalid_length():
    payload = {
        "cube": "UUUU"  # too short
    }

    response = client.post("/api/v1/solve", json=payload)

    assert response.status_code == 422  # Pydantic validation error


def test_solve_invalid_characters():
    payload = {
        "cube": "X" * 54
    }

    response = client.post("/api/v1/solve", json=payload)

    assert response.status_code == 422


def test_solve_wrong_face_count():
    payload = {
        "cube": "U" * 54  # invalid distribution
    }

    response = client.post("/api/v1/solve", json=payload)

    assert response.status_code == 422


def test_solve_unsolvable_cube():
    # Slightly invalid cube (swap two stickers)
    cube = list(get_solved_cube())
    cube[0], cube[1] = cube[1], cube[0]  # break solvability
    payload = {
        "cube": "".join(cube)
    }

    response = client.post("/api/v1/solve", json=payload)

    # This should fail at solver level
    assert response.status_code == 400