INSERT INTO
    ${ schema~ }.learning_objective (
        subject_id,
        description,
        grade_id,
        name
     
    )
VALUES
    (
        ${subjectId},
        ${description},
        ${gradeId},
        ${name}

    ) 
    RETURNING 
    id,
    subject_id AS "subjectId",
    description,
    grade_id AS "gradeId",
    name

