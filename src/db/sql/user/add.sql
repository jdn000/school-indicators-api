INSERT INTO
    ${ schema~ }.user (
        username,
        password,
        salt,
        first_name,
        last_name,
        second_surname,
        email,
        role_id,
        created_at
    )
VALUES
    (
        ${username},
        ${password},
        ${salt},
        ${firstName},
        ${lastName},
        ${secondSurname},
        ${email},
        ${roleId},
         now()
    ) RETURNING *