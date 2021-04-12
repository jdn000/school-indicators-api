UPDATE
    ${schema~}.calification
SET
--        subject_id =  ${subjectId},
 --       grade_id = ${gradeId},
        is_cummulative = ${isCummulative}
--        objective_id= ${objectiveId},
 --       evaluation_number=${evaluationNumber}
WHERE 
    id = ${id} 

RETURNING 
    id, 
    subject_id AS "subjectId",
    grade_id AS "gradeId",
    is_cummulative AS "isCummulative",
    objective_id AS "objectiveId",
    evaluation_number AS "evaluationNumber"

        

