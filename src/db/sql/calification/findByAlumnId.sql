SELECT
    c.id, 
    c.subject_id AS "subjectId",
    c.grade_id AS "gradeId",
    c.is_cummulative AS "isCummulative",
    c.objective_id AS "objectiveId",
    c.evaluation_number AS "evaluationNumber"
FROM ${ schema~ }.calification c
INNER JOIN ${ schema~ }.alumn al 
ON c.id=al.id_calification
WHERE al.alumn_id = ${alumnId}

