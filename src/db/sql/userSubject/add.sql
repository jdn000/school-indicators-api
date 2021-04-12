INSERT INTO
    ${ schema~ }.user_subject (
        user_id,
        subject_id
    )
VALUES
    (
        ${userId},
        ${subjectId}
  
    ) 
    RETURNING 
    id,
    user_id AS "userId",
    subject_id AS "subjectId"