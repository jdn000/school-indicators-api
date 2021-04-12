SELECT
    cc.id,
    cc.alumn_id AS "alumnId",
    cc.subject_id AS "subjectId",
    cc.grade_id AS "gradeId",
    cc.calification_id AS "calificationId",
    cc.value,
    cc.evaluation_number AS "evaluationNumber"
FROM ${ schema~ }.cummulative_calification cc 
 INNER JOIN ${ schema~ }.semester s
 ON cc.semester_id=s.id
WHERE cc.calification_id = ${calificationId}
 AND cc.alumn_id=${alumnId}
  AND s.status=true
