SELECT
    id,
    user_id AS "userId",
    subject_id AS "subjectId"

FROM  ${ schema~ }.user_subject 
WHERE user_id=${userId}