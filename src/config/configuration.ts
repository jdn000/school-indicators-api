export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    database: {
        host: process.env.DATABASE_HOST,
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        database: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        ssl: { rejectUnauthorized: false }

    }
});


/*    host: 'ec2-3-218-75-21.compute-1.amazonaws.com',
  port: 5432,
  database: 'd7kmppelq5l3q8',
  user: 'wyoakpwxdfsezg',
  password: '8183ee0bdc7c14df1be96db5d4623586854db1fbfba79c27c3853a6fdbe41138',
  ssl: { rejectUnauthorized: false } */