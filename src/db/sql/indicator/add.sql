INSERT INTO
    ${ schema~ }.indicator (
        name,
        description,
        objective_id
    )
VALUES
    (
        ${name},
        ${description},
        ${objectiveId}
    ) 
    RETURNING 
    id,
    name,
    description ,
    objective_id AS "objectiveId",
    status
