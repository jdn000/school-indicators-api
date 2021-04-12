SELECT
    id,
    subject_id AS "subjectId",
    description,
    grade_id AS "gradeId",
    name
FROM ${ schema~ }.learning_objective
WHERE id = ${id}
ORDER BY subject_id

