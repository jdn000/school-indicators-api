UPDATE
    ${schema~}.alumn
SET
    run = ${run},
    names = ${names},
    last_name = ${lastName},
    second_surname = ${secondSurname},
    grade_id = ${gradeId}
WHERE 
    id = ${id} 

RETURNING 
    id,
    run, 
    names,
    last_name AS "lastName",
    second_surname AS "secondSurname",
    grade_id AS "gradeId"
    