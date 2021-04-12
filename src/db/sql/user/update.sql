UPDATE
    ${schema~}.user
SET
    username = ${username},
    first_name = ${firstName},
    last_name = ${lastName},
    second_surname = ${secondSurname},
    email = ${email},
    status = ${status},
    role_id = ${roleId},
    updated_at = now()
WHERE 
    id = ${id} 
RETURNING 
    id,
    username AS "username",
    first_name AS "firstName",
    last_name AS "lastName",
    second_surname AS "secondSurname",
    email AS "email",
       role_id AS "roleId",
    status
    