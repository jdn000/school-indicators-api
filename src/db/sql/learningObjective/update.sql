UPDATE
    ${schema~}.learning_objective
SET
    subject_id = ${subjectId},
    description = ${description},
    grade_id =${gradeId},
    name = ${name}
WHERE 
    id = ${id} 

  RETURNING 
    id,
    subject_id AS "subjectId",
    description,
    grade_id AS "gradeId",
    name



