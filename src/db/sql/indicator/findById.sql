SELECT
    id,
    name,
    description,
    objective_id AS "objectiveId",
    status 
FROM ${ schema~ }.indicator 
WHERE id = ${id}
ORDER BY objective_id