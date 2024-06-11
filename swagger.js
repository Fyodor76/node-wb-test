import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

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
          url: 'http://localhost:8080', // URL вашего сервера
        },
      ],
    },
  },
  apis: ['./routes/*.js'], // Путь к файлам, содержащим аннотации Swagger
};

// Генерация документации Swagger
const swaggerDocs = swaggerJSDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };