INSERT INTO
    ${ schema~ }.grade (
        name,
        grade_number
        description,
        head_teacher_id
    )
VALUES
    (
        ${name},
        ${gradeNumber},
        ${description},
        ${headTeacherId}
    ) 
    RETURNING 
    id,
    name AS "name", 
    grade_number AS "gradeNumber",
    description,
    head_teacher_id AS "headTeacherId"