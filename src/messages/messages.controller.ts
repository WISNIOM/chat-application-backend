import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IMessageService } from './messages';
import { CreateMEssageDto } from './dtos/create-message.dto';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';

@Controller(Routes.Messages)
export class MessagesController {

    constructor(
        @Inject(Services.Messages) private readonly messageService: IMessageService,
    ) { }

    @Post()
    createMessage(
        @AuthUser() user: User,
        @Body() createMessageDto: CreateMEssageDto) {
        return this.messageService.createMessage({ ...createMessageDto, user });
    }
}
