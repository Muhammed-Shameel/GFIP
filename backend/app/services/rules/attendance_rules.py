from typing import Any
from app.services.context.base import SharedWorkflowContext
from app.services.rules.base import DeterministicRule

class DormancyDetectionRule(DeterministicRule):
    def __init__(self):
        super().__init__(
            rule_id="R-ATT-001",
            name="Dormancy Detection",
            reason_code="ENGAGEMENT_LOW",
            description="Triggered if member has 0 attendance records in recent summary."
        )

    def evaluate(self, context: SharedWorkflowContext) -> tuple[bool, int, dict[str, Any]]:
        # Deterministic logic: No records = Triggered
        records = context.attendance_summary.get("records", [])
        if not records:
            return True, 50, {"reason": "No recent attendance found"}
        return False, 0, {}
