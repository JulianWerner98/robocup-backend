import * as Joi from "joi";

export const validationSchema = Joi.object({
   PORT: Joi.number().default(3000),
   MONGO_URI: Joi.string().default('mongodb://mongoDB:27017/robocup'),
   KEYCLOAK_URI: Joi.string().default('https://keycloak.crashtec.de/auth'),
   KEYCLOAK_REALM: Joi.string().default('RoboCup'),
   KEYCLOAK_CLIENT_ID: Joi.string().default('app-backend'),
   KEYCLOAK_SECRET: Joi.string().default('secret')
});