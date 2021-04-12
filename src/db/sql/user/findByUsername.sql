SELECT
    id,
    username AS "username",
    first_name AS "firstName",
    last_name AS "lastName",
    second_surname AS "secondSurname",
    password AS "password",
    role_id AS "roleId",
    email AS "email",
    status
    
FROM
    ${schema~}.user u
WHERE
    username = ${username}

