import { UsersService } from "@modules/users/services/users.service";
import { Controller, Get, UseGuards, Request, Body, NotAcceptableException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { sendMessageDTO } from "../dto/send-message.dto";
import { MessageEntity } from "../entities/messages.model";
import { MessagesService } from "../services/messages.service";

@Controller('messages')
@ApiTags('Messages')
@UseGuards(AuthGuard('jwt'))
export class MessagesController {
  constructor(
    private readonly usersService: UsersService,
    private readonly messagesService: MessagesService
  ) { }

  @Get('/getMessages')
  @ApiOperation({ summary: 'Get user messages'})
  async getMessages(@Request() req) {
    return this.messagesService.getUserMessages(req.user)
  }

  @Get('/sendMessage')
  @ApiOperation({ summary: 'Send message to user'})
  async sendMessage(@Request() req, @Body() newMessage: sendMessageDTO) {
    const toUser = await this.usersService.findOneByEmail(newMessage.toUser)


    if(!toUser.isOnline) {
      throw new NotAcceptableException(`The user (${newMessage.toUser}) is not Online.`);
    }

    const message = <MessageEntity>{
      fromUserId: req.user.userId,
      toUserId: toUser.id,
      created_dt: new Date(),
      message: newMessage.message
    }

    this.messagesService.createMessage(message);
    
  }

}