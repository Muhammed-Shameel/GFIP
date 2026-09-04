from typing import Dict, Any

class SafeContextBuilder:
    """
    Safe Context Builder for LLM Node.
    Extracts minimal, sanitized summary context from LangGraph state / SharedWorkflowContext.
    Enforces boundary: No full DB dumps, no secret credentials.
    """
    @staticmethod
    def build_safe_context(state: Dict[str, Any]) -> Dict[str, Any]:
        shared_ctx = state.get("shared_context", {})
        
        # Extract member profile summary (sanitized)
        member_profile = shared_ctx.get("member_profile", {})
        safe_member = {
            "member_id": member_profile.get("member_id", state.get("member_id", "unknown")),
            "membership_tier": member_profile.get("membership_tier", "standard"),
            "primary_goal": member_profile.get("primary_goal", "general_fitness")
        }
        
        # Extract attendance metrics
        attendance = shared_ctx.get("attendance_metrics", {})
        safe_attendance = {
            "checkins_last_30_days": attendance.get("checkins_last_30_days", 0),
            "days_since_last_checkin": attendance.get("days_since_last_checkin", 0),
            "is_dormant": attendance.get("is_dormant", False)
        }
        
        # Extract engagement risk
        engagement = shared_ctx.get("engagement_risk", {})
        safe_engagement = {
            "risk_score": engagement.get("risk_score", 0.0),
            "risk_level": engagement.get("risk_level", "low")
        }
        
        # Extract agent outputs summary
        agent_outputs_summary = []
        for item in state.get("agent_outputs", []):
            agent_outputs_summary.append({
                "agent": item.get("agent"),
                "recommendation": item.get("output", {}).get("recommendation", "")
            })
            
        return {
            "workflow_id": state.get("workflow_id", "unknown"),
            "member_profile": safe_member,
            "attendance_metrics": safe_attendance,
            "engagement_risk": safe_engagement,
            "selected_route": state.get("selected_route", "standard"),
            "route_reason": state.get("route_reason", ""),
            "agent_outputs_summary": agent_outputs_summary,
            "final_recommendation": state.get("final_recommendation", "")
        }
