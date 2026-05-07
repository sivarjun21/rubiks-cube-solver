from fastapi import APIRouter, HTTPException
from app.models.solve_model import SolveRequest, SolveResponse
from app.services.solver_service import solve_cube


router = APIRouter()


@router.post("/solve", response_model=SolveResponse)
async def solve_cube_route(request: SolveRequest):
    try:
        solution = solve_cube(request.cube)

        return SolveResponse(
            success=True,
            solution=solution,
            moves=solution.split()
        )

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    except Exception:
        raise HTTPException(
            status_code=500,
            detail="Internal server error while solving cube"
        )