UPDATE
    ${schema~}.semester
SET
    code = ${code},
    description = ${description},
    status = ${status}
WHERE 
    id = ${id} 
RETURNING 
    id,
    code,
    description,
    status