from sqlalchemy.orm import Session
from app.models.domain import Member, Trainer
from datetime import date

def seed_data(db: Session):
    # Check if already seeded
    if db.query(Member).count() > 0:
        return

    # Create Trainers
    trainers = [
        Trainer(trainer_code="TRN-001", full_name="Alice Trainer", skill_tags=["strength", "yoga"], max_active_members=15),
        Trainer(trainer_code="TRN-002", full_name="Bob Trainer", skill_tags=["cardio", "HIIT"], max_active_members=20),
    ]
    db.add_all(trainers)
    db.commit()

    # Create Members
    members = [
        Member(member_code="MEM-001", full_name="John Doe", joined_on=date(2025, 1, 1), status="active"),
        Member(member_code="MEM-002", full_name="Jane Smith", joined_on=date(2025, 2, 1), status="active"),
    ]
    db.add_all(members)
    db.commit()
    print("Database seeded successfully.")
