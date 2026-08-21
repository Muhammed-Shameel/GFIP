from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.models.domain import Trainer

router = APIRouter(prefix="/api/v1/trainers", tags=["Trainers"])

@router.get("")
def list_trainers(db: Session = Depends(get_db)) -> dict:
    trainers = list(db.scalars(select(Trainer).order_by(Trainer.trainer_code)))
    return {
        "items": [
            {
                "id": item.id,
                "trainer_code": item.trainer_code,
                "full_name": item.full_name,
                "skill_tags": item.skill_tags,
                "max_active_members": item.max_active_members,
                "active": item.active,
            }
            for item in trainers
        ],
        "total": len(trainers),
    }
