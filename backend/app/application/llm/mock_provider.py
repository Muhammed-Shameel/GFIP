import json
from typing import Dict, Any

class MockLLMProvider:
    """
    Mock LLM Provider for Stage 4 LLM Agent Integration.
    Generates predictable, valid structured JSON output matching schema without requiring external API keys.
    """
    def __init__(self, model_name: str = "mock-agentic-v1"):
        self.model_name = model_name

    def generate(self, prompt: str, safe_context: Dict[str, Any], recommendation: str) -> str:
        route = safe_context.get("selected_route", "standard")
        attendance = safe_context.get("attendance_metrics", {})
        risk = safe_context.get("engagement_risk", {})

        checkins = attendance.get("checkins_last_30_days", 0)
        days_since = attendance.get("days_since_last_checkin", 0)
        risk_level = risk.get("risk_level", "low")

        if route == "dormant" or attendance.get("is_dormant"):
            summary_text = (
                f"[MOCK LLM] Member has been inactive for {days_since} days with only {checkins} check-in(s) in the last month. "
                f"Automated re-engagement outreach is prioritized to prevent churn."
            )
            obs = [
                f"No visit recorded in last {days_since} days.",
                "High churn risk due to prolonged dormancy."
            ]
            risks = ["Member churn risk", "Loss of routine habits"]
        elif route == "high_risk" or risk_level == "high":
            summary_text = (
                f"[MOCK LLM] Member displays elevated churn risk indicators (risk score {risk.get('risk_score', 0.8)}). "
                f"Urgent personalized check-in and workout plan adjustment recommended."
            )
            obs = [
                "Attendance frequency declining significantly.",
                "Engagement risk flag triggered."
            ]
            risks = ["Imminent membership drop", "Decreased facility utilization"]
        else:
            summary_text = (
                f"[MOCK LLM] Member maintains regular facility visits ({checkins} in last 30 days). "
                f"Standard workout progression and trainer guidance recommended."
            )
            obs = [
                "Consistent workout schedule maintained.",
                "Positive engagement indicators."
            ]
            risks = []

        output = {
            "agent_name": "ExplanationSummaryService",
            "mode": "llm_assisted",
            "summary": summary_text,
            "observations": obs,
            "recommendation": recommendation,
            "confidence": 0.95,
            "risks": risks,
            "missing_information": [],
            "protected_fields_changed": False,
            "should_fallback": False
        }
        return json.dumps(output)
