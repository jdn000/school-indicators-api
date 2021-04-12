SELECT
    id,
    name,
    description,
    objective_id AS "objectiveId",
    status 
FROM ${ schema~ }.indicator 
WHERE objective_id = ${objectiveId}
ORDER BY objective_id