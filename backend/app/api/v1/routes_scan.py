from fastapi import APIRouter, HTTPException
from app.models.scan_model import ScanRequest, ScanResponse
from app.services.vision_service import process_scan


router = APIRouter()


@router.post("/scan", response_model=ScanResponse)
async def scan_cube(request: ScanRequest):
    try:
        cube_string = process_scan(request.faces)

        return ScanResponse(
            success=True,
            cube=cube_string
        )

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Internal server error during scan processing"
        )