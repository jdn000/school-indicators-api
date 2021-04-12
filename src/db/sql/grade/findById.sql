SELECT
    id,
    name AS "name", 
    grade_number AS "gradeNumber",
    description,
    head_teacher_id AS "headTeacherId"
FROM ${ schema~ }.grade
WHERE id = ${id}
ORDER BY  grade_number