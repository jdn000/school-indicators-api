SELECT
    lo.id,
    lo.subject_id AS "subjectId",
    lo.description,
    lo.grade_id AS "gradeId",
    lo.name,
     (CASE WHEN c.id IS NOT NULL
           THEN TRUE
           ELSE  FALSE
      END)  AS "hasCalifications"
FROM ${ schema~ }.learning_objective lo   
LEFT JOIN  ${ schema~ }.calification c
ON lo.id=c.objective_id
WHERE lo.subject_id = ${subjectId} AND lo.grade_id = ${gradeId}
ORDER BY id

