SELECT
    u.id,
    u.username AS "username",
    u.first_name AS "firstName",
    u.last_name AS "lastName",
    u.second_surname AS "secondSurname",
    u.email AS "email",
   u.role_id AS "roleId",
    u.status AS status    
FROM ${schema~}.user u
WHERE id = ${id}