UPDATE
    ${schema~}.grade
SET
    name = ${name},
    grade_number = ${gradeNumber},
    description = ${description},
    head_teacher_id = ${headTeacherId}
WHERE 
    id = ${id} 

RETURNING 
    id,
    name AS "name", 
    grade_number AS "gradeNumber",
    description,
    head_teacher_id AS "headTeacherId"