SELECT
    id, 
    subject_id AS "subjectId",
    grade_id AS "gradeId",
    is_cummulative AS "isCummulative",
    objective_id AS "objectiveId",
    evaluation_number AS "evaluationNumber"

FROM ${ schema~ }.calification 
