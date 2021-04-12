SELECT
    id,
    name,
    description,
    objective_id AS "objectiveId",
    status 
FROM ${ schema~ }.indicator 
ORDER BY objective_id