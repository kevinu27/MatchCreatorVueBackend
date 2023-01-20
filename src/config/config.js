module.exports = {
    port: 8081,
    db: {
        database: process.env.DB_NAME || 'tabtracker', // aqui poner lo que toque mas adelante
        user: process.env.DB_USER || 'tabtracker',// aqui poner lo que toque mas adelante
        password: process.env.DB_PASS || 'tabtracker',// aqui poner lo que toque mas adelante
        options: {
            dialect: process.env.DIALECT || 'sqlite',// aqui poner lo que toque mas adelante
            host: process.env.HOST || 'localhost',// aqui poner lo que toque mas adelante
            storage: process.env.DB_USER || './tabtracker.sqlite',// aqui poner lo que toque mas adelante
        }
    }
}