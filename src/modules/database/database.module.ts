import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from "../users/entities/user.model";
import { MessageEntity } from "@modules/messages/entities/messages.model";

@Module({
	imports: [
		TypeOrmModule.forRootAsync({	
      imports: [ConfigModule],					
      inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				type: 'mysql',
				host: config.get<string>('DATABASE_HOST'),
				port: config.get<number>('DATABASE_PORT'),
				username: config.get<string>('DATABASE_USER'),
				password: config.get<string>('DATABASE_PASSWORD'),
				database: config.get<string>('DATABASE_DBNAME'),
				entities: [
					UserEntity,
					MessageEntity
				],
				synchronize: false
			})
		})
	]
})

export class DatabaseModule {

}