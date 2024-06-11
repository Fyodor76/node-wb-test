import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const url = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_URL : process.env.DEVELOPMENT_URL;

// Определение настроек Swagger
    const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
        title: 'My API',
        version: '1.0.0',
        description: 'API Documentation',
        contact: {
            name: 'Your Name',
        },
        servers: [
            {
            url: url,
            },
        ],
        },
    },
    apis: ['./routes/*.js', './models/*.js'], // Путь к файлам, содержащим аннотации Swagger
    };

    // Генерация документации Swagger
    const swaggerDocs = swaggerJSDoc(swaggerOptions);

    export { swaggerUi, swaggerDocs };