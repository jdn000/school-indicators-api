INSERT INTO
    ${ schema~ }.alumn (
        run,
        names,
        last_name,
        second_surname,
        grade_id
    )
VALUES
    (
        ${run},
        ${names},
        ${lastName},
        ${secondSurname},
        ${gradeId}
    ) 
    RETURNING 
    id,
    run, 
    names,
    last_name AS "lastName",
    second_surname AS "secondSurname",
    grade_id AS "gradeId"
