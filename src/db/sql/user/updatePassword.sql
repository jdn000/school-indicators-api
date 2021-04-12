UPDATE
    ${schema~}.user
SET
    password = ${password},
    salt=${salt},
    updated_at = now()
WHERE 
    id = ${id} 
RETURNING 
    id             "id",
    username       "username",
    first_name     "firstName",
    last_name      "last_name",
    second_surname "secondSurName",
    status         "status",
       role_id AS "roleId",
    email          "email"

    