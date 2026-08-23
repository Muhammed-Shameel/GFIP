from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.services.context.builder import ContextBuilder
from app.services.orchestrators.base import OrchestrationService
from app.models.domain import WorkflowSession, DecisionRecord
from uuid import uuid4
from datetime import datetime

router = APIRouter(prefix="/api/v1", tags=["Workflow & Audit"])

@router.post("/reviews/member")
def trigger_review(member_id: str, db: Session = Depends(get_db)):
    # 1. Build Context
    builder = ContextBuilder(db)
    session_id = str(uuid4())
    context = builder.build_context(session_id=session_id, member_id=member_id)
        
    # 2. Run Orchestration
    orchestrator = OrchestrationService()
    result = orchestrator.run_workflow(context)
    
    # 3. Store Session/Decision
    session = WorkflowSession(workflow_session_id=session_id, member_id=member_id, status="completed")
    
    # Generate audit reference and store record
    audit_ref = str(uuid4())
    decision_id = str(uuid4())
    decision = DecisionRecord(
        decision_id=decision_id,
        audit_reference=audit_ref,
        workflow_session_id=session_id,
        explanation=context.explanation,
        recommendation=result["final_recommendation"]
    )
    
    db.add(session)
    db.add(decision)
    db.commit()
    
    # Add audit reference to result
    result["audit_reference"] = audit_ref
    
    return result

@router.get("/workflows/{workflow_session_id}/trace")
def get_trace(workflow_session_id: str, db: Session = Depends(get_db)):
    # In a real impl, retrieve from DB logs. Returning placeholder based on orchestrator structure.
    return {"workflow_session_id": workflow_session_id, "status": "trace_retrieved"}

@router.get("/audit/{audit_reference}")
def get_audit(audit_reference: str, db: Session = Depends(get_db)):
    record = db.query(DecisionRecord).filter(DecisionRecord.audit_reference == audit_reference).first()
    if not record:
        raise HTTPException(status_code=404, detail="Audit reference not found")
    return record
