DELETE  
FROM ${schema~}.user_subject
WHERE id = ${id}
RETURNING true