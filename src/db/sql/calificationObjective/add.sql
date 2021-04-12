INSERT INTO
    ${ schema~ }.calification_objective (
        calification_id,
        objective_id
    )
VALUES
    (
        ${calificationId},
        ${objectiveId}
    ) 
    RETURNING 
    id, 
    calification_id AS "calificationId",
    objective_id AS "objectiveId"
    
