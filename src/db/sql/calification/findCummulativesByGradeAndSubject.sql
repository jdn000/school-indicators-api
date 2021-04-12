SELECT
    cc.id,
    cc.alumn_id AS "alumnId",
    cc.subject_id AS "subjectId",
    cc.grade_id AS "gradeId",
    cc.calification_id AS "calificationId",
    cc.value,
    cc.evaluation_number AS "evaluationNumber",
    ac.id AS "mainCalificationId",
    ci.indicator_id As "indicatorId"
FROM ${ schema~ }.cummulative_calification cc
INNER JOIN  ${ schema~ }.alumn_calification ac
ON cc.calification_id=ac.id_calification AND cc.alumn_id=ac.alumn_id
INNER JOIN  ${ schema~ }.calification_indicator ci
ON cc.id=ci.calification_id
INNER JOIN ${ schema~ }.semester s
ON cc.semester_id=s.id
WHERE grade_id = ${gradeId} AND subject_id = ${subjectId}  AND s.status=true
