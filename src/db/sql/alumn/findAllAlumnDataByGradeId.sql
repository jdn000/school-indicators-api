SELECT
a.id AS "alumnId",
CONCAT(a.names ,' ', a.last_name,' ',a.second_surname) AS "alumnFullName",
a.run,
g.name AS "grade",
CONCAT(u.first_name ,' ', u.last_name,' ',u.second_surname) AS "headTeacher"
FROM  ${ schema~ }.alumn_calification ac
INNER JOIN   ${ schema~ }.calification c
ON ac.id_calification=c.id
INNER JOIN   ${ schema~ }.alumn a
ON ac.alumn_id=a.id
INNER JOIN  ${ schema~ }.grade g
ON c.grade_id=g.id
INNER JOIN  ${ schema~ }.subject s
ON c.subject_id=s.id
INNER JOIN  ${ schema~ }.user u
ON g.head_teacher_id=u.id
left JOIN  ${ schema~ }.previous_avg pa
ON g.id=pa.grade_id
WHERE g.grade_number = ${gradeNumber}
Group By a.names, a.last_name,a.second_surname,a.run,g.name,u.first_name,
u.last_name,u.second_surname,a.id




