UPDATE
    ${schema~}.calification_objective
SET
        calification_id = ${calificationId},
        objective_id = ${objectiveId}
WHERE 
    id = ${id} 

RETURNING 
    id, 
    calification_id AS "calificationId",
    objective_id AS "objectiveId"
    
