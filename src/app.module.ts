import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {validationSchema} from "./config";
import {MongooseModule} from "@nestjs/mongoose";
import {KeycloakConnectModule} from "nest-keycloak-connect";
import {MemberModule} from "./member";
import {Connection, connections} from "mongoose";
import * as toJson from '@meanie/mongoose-to-json'

@Module({
    imports: [
        ConfigModule.forRoot({
                isGlobal: true,
                cache: true,
                validationSchema: validationSchema,
                validationOptions: {
                    abortEarly: true
                }
            }
        ),
        MongooseModule.forRootAsync({
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_URI'),
                connectionFactory: (connection: Connection) => {
                    return connection.plugin(toJson);
                },
            }),
            inject: [ConfigService]
        }),
        KeycloakConnectModule.registerAsync({
            useFactory: async (configService: ConfigService) => ({
                authServerUrl: configService.get<string>('KEYCLOAK_URI'),
                realm: configService.get<string>('KEYCLOAK_REALM'),
                clientId: configService.get<string>('KEYCLOAK_CLIENT_ID'),
                secret: configService.get<string>('KEYCLOAK_SECRET'),
            }),
            inject: [ConfigService]
        }),
        MemberModule
    ],
})

export class AppModule {
}
