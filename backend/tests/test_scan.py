import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def get_valid_scan_payload():
    return {
        "faces": {
            "U": [["white"] * 3 for _ in range(3)],
            "R": [["red"] * 3 for _ in range(3)],
            "F": [["green"] * 3 for _ in range(3)],
            "D": [["yellow"] * 3 for _ in range(3)],
            "L": [["orange"] * 3 for _ in range(3)],
            "B": [["blue"] * 3 for _ in range(3)],
        }
    }


def test_scan_valid_cube():
    payload = get_valid_scan_payload()

    response = client.post("/api/v1/scan", json=payload)

    assert response.status_code == 200

    data = response.json()

    assert data["success"] is True
    assert "cube" in data
    assert len(data["cube"]) == 54


def test_scan_missing_face():
    payload = get_valid_scan_payload()
    del payload["faces"]["U"]

    response = client.post("/api/v1/scan", json=payload)

    assert response.status_code == 400


def test_scan_invalid_color():
    payload = get_valid_scan_payload()
    payload["faces"]["U"][0][0] = "pink"

    response = client.post("/api/v1/scan", json=payload)

    assert response.status_code == 400


def test_scan_wrong_grid_size():
    payload = get_valid_scan_payload()
    payload["faces"]["U"] = [["white"] * 2 for _ in range(2)]

    response = client.post("/api/v1/scan", json=payload)

    assert response.status_code == 400