SELECT
        id, 
    calification_id AS "calificationId",
    objective_id AS "objectiveId"
    

FROM ${ schema~ }.calification_objective 
WHERE id = ${id}
