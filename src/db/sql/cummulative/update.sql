UPDATE
    ${schema~}.calification
SET

        alumn_id = ${alumnId},
        subject_id =  ${subjectId},
        value = ${value},
        is_cummulative = ${isCummulative},
        objective_id= ${objectiveId},
        evaluation_number=${evaluationNumber}
WHERE 
    id = ${id} 

RETURNING 
    id, 
    alumn_id AS "alumnId",
    subject_id AS "subjectId",
    value,
    is_cummulative AS "isCummulative",
    objective_id AS "objectiveId",
    evaluation_number AS "evaluationNumber"