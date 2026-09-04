import json
import logging
from typing import Dict, Any, Tuple
from app.application.llm.schemas import LLMSummaryOutput, LLMValidationResult

logger = logging.getLogger(__name__)

class LLMOutputValidator:
    """
    Validator for LLM Structured Output and Protected Field Verification.
    """
    PROTECTED_FIELDS = [
        "workflow_id", "member_id", "selected_route",
        "route_reason", "audit_reference", "risk_level"
    ]

    @classmethod
    def validate(cls, raw_output: str, original_context: Dict[str, Any], expected_recommendation: str) -> Tuple[LLMValidationResult, Any]:
        errors = []
        protected_violated = False

        # 1. JSON Parsing Check
        try:
            parsed_data = json.loads(raw_output)
        except Exception as e:
            errors.append(f"Invalid JSON format: {str(e)}")
            return LLMValidationResult(
                is_valid=False,
                status="failed",
                errors=errors,
                protected_fields_violated=False
            ), None

        # 2. Schema Validation via Pydantic
        try:
            schema_obj = LLMSummaryOutput(**parsed_data)
        except Exception as e:
            errors.append(f"Schema validation error: {str(e)}")
            return LLMValidationResult(
                is_valid=False,
                status="failed",
                errors=errors,
                protected_fields_violated=False
            ), None

        # 3. Check for Fallback Request
        if schema_obj.should_fallback:
            errors.append("LLM explicitly requested fallback via output schema.")
            return LLMValidationResult(
                is_valid=False,
                status="failed",
                errors=errors,
                protected_fields_violated=False
            ), schema_obj

        # 4. Protected Fields Protection Check
        if schema_obj.protected_fields_changed:
            protected_violated = True
            errors.append("LLM indicated protected_fields_changed = true.")

        # Check if LLM attempted to modify or contradict protected deterministic route
        if "selected_route" in parsed_data:
            orig_route = original_context.get("selected_route")
            if orig_route and parsed_data["selected_route"] != orig_route:
                protected_violated = True
                errors.append(f"Protected route tampered: expected '{orig_route}', got '{parsed_data['selected_route']}'.")

        # 5. Output Boundaries & Quality Checks
        if len(schema_obj.summary.strip()) < 10:
            errors.append("Summary text is too short or empty.")

        if schema_obj.confidence < 0.0 or schema_obj.confidence > 1.0:
            errors.append(f"Confidence score {schema_obj.confidence} outside range [0.0, 1.0].")

        is_valid = len(errors) == 0 and not protected_violated
        status = "passed" if is_valid else "failed"

        return LLMValidationResult(
            is_valid=is_valid,
            status=status,
            errors=errors,
            protected_fields_violated=protected_violated
        ), schema_obj
