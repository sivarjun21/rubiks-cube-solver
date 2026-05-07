import numpy as np
import cv2


# HSV color ranges (tuned for Rubik's cube colors)
# Format: (lower_bound, upper_bound)
COLOR_RANGES = {
    "white": ((0, 0, 200), (180, 40, 255)),
    "red1": ((0, 120, 70), (10, 255, 255)),
    "red2": ((170, 120, 70), (180, 255, 255)),
    "green": ((35, 80, 80), (85, 255, 255)),
    "blue": ((90, 80, 80), (140, 255, 255)),
    "yellow": ((20, 100, 100), (35, 255, 255)),
    "orange": ((10, 100, 100), (20, 255, 255)),
}


def get_dominant_color_hsv(region: np.ndarray) -> tuple:
    """
    Convert BGR region to HSV and return average HSV value.
    """
    hsv = cv2.cvtColor(region, cv2.COLOR_BGR2HSV)
    avg = hsv.mean(axis=(0, 1))
    return tuple(avg.astype(int))


def classify_color(hsv_pixel: tuple) -> str:
    """
    Classify a single HSV pixel into a cube color.
    """
    h, s, v = hsv_pixel

    # Check white separately (low saturation, high value)
    if s < 40 and v > 200:
        return "white"

    # Red (wraps around HSV spectrum)
    if (0 <= h <= 10) or (170 <= h <= 180):
        return "red"

    # Orange
    if 10 < h <= 20:
        return "orange"

    # Yellow
    if 20 < h <= 35:
        return "yellow"

    # Green
    if 35 < h <= 85:
        return "green"

    # Blue
    if 85 < h <= 140:
        return "blue"

    return "unknown"


def classify_grid_colors(cells: list) -> list:
    """
    Given 9 image cells, classify each into a color.

    Returns:
        3x3 grid of color names
    """
    colors = []

    for cell in cells:
        avg_hsv = get_dominant_color_hsv(cell)
        color = classify_color(avg_hsv)
        colors.append(color)

    # Convert flat list → 3x3 grid
    grid = [
        colors[0:3],
        colors[3:6],
        colors[6:9],
    ]

    return grid


def validate_color_grid(grid: list) -> None:
    """
    Ensure no 'unknown' colors exist.
    """
    for row in grid:
        for color in row:
            if color == "unknown":
                raise ValueError("Unrecognized color detected. Please rescan with better lighting.")