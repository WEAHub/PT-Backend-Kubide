
import { Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MessagesController } from "./controller/messages.controller";
import { MessageEntity } from "./entities/messages.model";
import { MessagesService } from "./services/messages.service";

import { UsersModule } from "@modules/users/users.module";

@Module({
  imports: [ 
    UsersModule, 
    TypeOrmModule.forFeature([MessageEntity]) 
  ],
  providers: [ MessagesService, JwtService ],
  controllers: [ MessagesController ],
  exports: [ MessagesService ]
})

export class MessagesModule {}
