INSERT INTO
    ${ schema~ }.calification (

        subject_id,
        grade_id,
        is_cummulative,
        objective_id,
        evaluation_number
    )
VALUES
    (
        ${subjectId},
        ${gradeId},
        ${isCummulative},
        ${objectiveId},
        ${evaluationNumber}
    ) 
    RETURNING 

    id, 
    subject_id AS "subjectId",
    grade_id AS "gradeId",
    is_cummulative AS "isCummulative",
    objective_id AS "objectiveId",
    evaluation_number AS "evaluationNumber"

