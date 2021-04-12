SELECT
    id, 
    alumn_id AS "alumnId",
    subject_id AS "subjectId",
    value,
    is_cummulative AS "isCummulative",
    objective_id AS "objectiveId"
    
FROM ${ schema~ }.calification 

WHERE alumn_id = ${alumnId}
