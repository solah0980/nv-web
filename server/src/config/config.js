module.exports = {
    port: 8081,
    db: {
        database: process.env.DB_NAME || 'nvWebblogDb',
        user: process.env.DB_User || 'root',
        password: process.env.DB_PASS || '',
        option: {
            dialect: process.env_DIALECT || 'sqlite',
            storage: './nvwebblog-db.sqlite'
            // host: process.env.HOST || 'localhost'
        },
    },
    authentication: {
        jwtSecret: 'korn'
    }
}