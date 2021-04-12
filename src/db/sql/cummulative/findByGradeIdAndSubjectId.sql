SELECT
    c.id, 
    c.alumn_id AS "alumnId",
    c.subject_id AS "subjectId",
    c.value,
    c.is_cummulative AS "isCummulative",
    c.objective_id AS "objectiveId",
    c.evaluation_number AS "evaluationNumber"
    
FROM ${ schema~ }.calification c
INNER JOIN ${ schema~ }.alumn a
ON c.alumn_id=a.id
INNER JOIN ${ schema~ }.grade g
ON a.grade_id=g.id
WHERE g.id = ${gradeId} AND c.subject_id = ${subjectId}
