from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers
from app.api.v1.routes_health import router as health_router
from app.api.v1.routes_solve import router as solve_router
from app.api.v1.routes_scan import router as scan_router


def create_app() -> FastAPI:
    app = FastAPI(
        title="Rubik's Cube Solver API",
        description="API for scanning and solving a 3x3 Rubik's Cube",
        version="1.0.0"
    )

    # CORS configuration (important for frontend)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            "http://localhost:3000",
            "http://localhost:5173",
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Register routes
    app.include_router(
        health_router,
        prefix="/api/v1",
        tags=["Health"]
    )

    app.include_router(
        solve_router,
        prefix="/api/v1",
        tags=["Solver"]
    )

    app.include_router(
        scan_router,
        prefix="/api/v1",
        tags=["Scanner"]
    )

    return app


app = create_app()


@app.get("/")
async def root():
    return {
        "message": "Rubik's Cube Solver Backend is running",
        "docs": "/docs",
        "version": "1.0.0"
    }