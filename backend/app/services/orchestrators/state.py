from typing import TypedDict, List, Any, Optional

class GFIPGraphState(TypedDict):
    workflow_id: str
    member_id: str
    domain_input: dict[str, Any]
    shared_context: dict[str, Any]
    agent_outputs: List[dict[str, Any]]
    final_recommendation: str
    explanation: Optional[str]
    audit_reference: Optional[str]
    errors: List[str]
