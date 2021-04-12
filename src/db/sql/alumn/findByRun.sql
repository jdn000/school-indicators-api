SELECT
    id,
    run, 
    names,
    last_name AS "lastName",
    second_surname AS "secondSurname",
    grade_id AS "gradeId" 
FROM ${ schema~ }.alumn 
WHERE
    run = ${run}
ORDER BY last_name