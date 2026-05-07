import cv2
import numpy as np
from typing import Tuple


def resize_image(image: np.ndarray, width: int = 500) -> np.ndarray:
    """
    Resize image while maintaining aspect ratio.
    """
    h, w = image.shape[:2]
    aspect_ratio = width / float(w)
    new_dim = (width, int(h * aspect_ratio))
    return cv2.resize(image, new_dim)


def convert_to_hsv(image: np.ndarray) -> np.ndarray:
    """
    Convert BGR image to HSV color space.
    """
    return cv2.cvtColor(image, cv2.COLOR_BGR2HSV)


def apply_blur(image: np.ndarray, kernel_size: int = 5) -> np.ndarray:
    """
    Apply Gaussian blur to reduce noise.
    """
    return cv2.GaussianBlur(image, (kernel_size, kernel_size), 0)


def get_center_region(image: np.ndarray, size: int = 50) -> np.ndarray:
    """
    Extract a square region from the center of the image.
    """
    h, w = image.shape[:2]
    cx, cy = w // 2, h // 2

    half = size // 2
    return image[cy - half:cy + half, cx - half:cx + half]


def compute_average_color(region: np.ndarray) -> Tuple[int, int, int]:
    """
    Compute average BGR color of a region.
    """
    avg_color = region.mean(axis=(0, 1))
    return tuple(int(c) for c in avg_color)


def draw_grid_overlay(image: np.ndarray, grid_size: int = 3) -> np.ndarray:
    """
    Draw a grid overlay on the image (for debugging / UI guidance).
    """
    h, w = image.shape[:2]
    step_x = w // grid_size
    step_y = h // grid_size

    output = image.copy()

    # Draw vertical lines
    for i in range(1, grid_size):
        cv2.line(output, (i * step_x, 0), (i * step_x, h), (0, 255, 0), 2)

    # Draw horizontal lines
    for i in range(1, grid_size):
        cv2.line(output, (0, i * step_y), (w, i * step_y), (0, 255, 0), 2)

    return output


def split_into_grid(image: np.ndarray, grid_size: int = 3) -> list:
    """
    Split image into NxN grid (default 3x3).
    Returns list of cells.
    """
    h, w = image.shape[:2]
    cell_h = h // grid_size
    cell_w = w // grid_size

    cells = []

    for row in range(grid_size):
        for col in range(grid_size):
            cell = image[
                row * cell_h:(row + 1) * cell_h,
                col * cell_w:(col + 1) * cell_w
            ]
            cells.append(cell)

    return cells