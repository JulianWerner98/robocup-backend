import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {validationSchema} from "./config";
import {MongooseModule} from "@nestjs/mongoose";
import {KeycloakConnectModule} from "nest-keycloak-connect";

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
    ],
})

export class AppModule {
}
