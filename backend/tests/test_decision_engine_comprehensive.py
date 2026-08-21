import pytest
from app.services.context.base import SharedWorkflowContext
from app.services.rules.attendance_rules import DormancyDetectionRule

# Rule-to-Test Matrix
# | Rule ID | Test Function | Description |
# | :--- | :--- | :--- |
# | R-ATT-001 | test_dormancy_rule_triggered | Validates rule trigger on no attendance |
# | R-ATT-001 | test_dormancy_rule_not_triggered | Validates rule suppression on active attendance |

def test_dormancy_rule_triggered():
    rule = DormancyDetectionRule()
    ctx = SharedWorkflowContext.create_scoped_context(session_id="s1", member_id="m1")
    ctx.attendance_summary = {"records": []}
    
    triggered, score, metadata = rule.evaluate(ctx)
    assert triggered is True
    assert score == 50
    assert metadata["reason"] == "No recent attendance found"

def test_dormancy_rule_not_triggered():
    rule = DormancyDetectionRule()
    ctx = SharedWorkflowContext.create_scoped_context(session_id="s1", member_id="m1")
    ctx.attendance_summary = {"records": [{"checked_in_at": "2026-08-01"}]}
    
    triggered, score, _ = rule.evaluate(ctx)
    assert triggered is False
    assert score == 0
