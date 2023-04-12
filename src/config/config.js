module.exports = {
    port: 8081,
    db: {
        database: process.env.DB_NAME || 'database-5012032476.webspace-host.com', // aqui poner lo que toque mas adelante
        user: process.env.DB_USER || 'dbu901674',// aqui poner lo que toque mas adelante
        password: process.env.DB_PASS || 'C3poyr2d2',// aqui poner lo que toque mas adelante
        options: {
            dialect: process.env.DIALECT || 'sqlite',// aqui poner lo que toque mas adelante
            host: process.env.HOST || 'dbs10128225',// aqui poner lo que toque mas adelante
            storage: process.env.DB_USER || './tabtracker.sqlite',// aqui poner lo que toque mas adelante
        }
    },
    authentication: {
        jwtSecret: process.env.JWT_SECRET || 'secret'
    }
}