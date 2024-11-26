module.exports = {
    sequelize: {
        development: {
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            dialect: 'postgres',
            logging: false,
            // logging: console.log,
        },
        test: {
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME_TEST,
            host: process.env.DB_HOST,
            dialect: 'postgres',
        },
        production: {
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            host: process.env.DB_HOST,
            dialect: 'postgres',
            logging: false,
        },
    },
    redis: {
        development: {
            url: process.env.REDIS_URL,
        },
        test: {
            url: process.env.REDIS_URL,
        },
        production: {
            url: process.env.REDIS_URL,
        },
    }
}