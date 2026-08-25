from langgraph.graph import StateGraph, END
from app.services.orchestrators.state import GFIPGraphState
from app.services.agents.attendance_agent import AttendanceAgent
from app.services.agents.engagement_agent import EngagementRiskAgent
from app.services.agents.trainer_agent import TrainerAllocationAgent
from app.services.agents.followup_agent import FollowUpRecommendationAgent
from datetime import datetime

# Initialize agents
attendance_agent = AttendanceAgent()
engagement_agent = EngagementRiskAgent()
trainer_agent = TrainerAllocationAgent()
followup_agent = FollowUpRecommendationAgent()

from app.services.context.base import SharedWorkflowContext

# Node Wrappers
def attendance_node(state: GFIPGraphState) -> GFIPGraphState:
    # Use model_dump to handle dictionary properly
    ctx = SharedWorkflowContext(**state["shared_context"]) 
    result = attendance_agent.run(ctx)
    state["agent_outputs"].append({"agent": "AttendanceAgent", "output": result})
    return state

def engagement_risk_node(state: GFIPGraphState) -> GFIPGraphState:
    ctx = SharedWorkflowContext(**state["shared_context"])
    result = engagement_agent.run(ctx)
    state["agent_outputs"].append({"agent": "EngagementRiskAgent", "output": result})
    return state

def trainer_allocation_node(state: GFIPGraphState) -> GFIPGraphState:
    ctx = SharedWorkflowContext(**state["shared_context"])
    result = trainer_agent.run(ctx)
    state["agent_outputs"].append({"agent": "TrainerAllocationAgent", "output": result})
    return state

def followup_recommendation_node(state: GFIPGraphState) -> GFIPGraphState:
    ctx = SharedWorkflowContext(**state["shared_context"])
    result = followup_agent.run(ctx)
    state["agent_outputs"].append({"agent": "FollowUpRecommendationAgent", "output": result})
    return state

def recommendation_node(state: GFIPGraphState) -> GFIPGraphState:
    recs = [res["output"]["recommendation"] for res in state["agent_outputs"]]
    state["final_recommendation"] = " | ".join(recs)
    return state

def audit_node(state: GFIPGraphState) -> GFIPGraphState:
    state["explanation"] = f"Workflow completed with recommendation: {state['final_recommendation']}."
    state["audit_reference"] = f"audit-{state['workflow_id']}"
    return state

# Graph Builder
def create_graph():
    workflow = StateGraph(GFIPGraphState)
    
    workflow.add_node("attendance", attendance_node)
    workflow.add_node("engagement", engagement_risk_node)
    workflow.add_node("trainer", trainer_allocation_node)
    workflow.add_node("followup", followup_recommendation_node)
    workflow.add_node("recommendation", recommendation_node)
    workflow.add_node("audit", audit_node)
    
    workflow.set_entry_point("attendance")
    workflow.add_edge("attendance", "engagement")
    workflow.add_edge("engagement", "trainer")
    workflow.add_edge("trainer", "followup")
    workflow.add_edge("followup", "recommendation")
    workflow.add_edge("recommendation", "audit")
    workflow.add_edge("audit", END)
    
    return workflow.compile()
