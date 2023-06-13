import { Body, Controller, Get, Inject, Param, Post, UseGuards } from '@nestjs/common';
import { Routes, Services } from 'src/utils/constants';
import { IConversationsService } from './conversations';
import { AuthenticatedGuard } from 'src/auth/utils/guards';
import { CreateConversationDto } from './dtos/create-conversation.dto';
import { instanceToPlain } from 'class-transformer';
import { AuthUser } from 'src/utils/decorators';
import { User } from 'src/utils/typeorm';

@Controller(Routes.Conversations)
@UseGuards(AuthenticatedGuard)
export class ConversationsController {

    constructor(
        @Inject(Services.Conversations) private conversationsService: IConversationsService
    ) { }

    @Post()
    createConversation(@AuthUser() user: User, @Body() createConversationPayload: CreateConversationDto) {
        return instanceToPlain(this.conversationsService.createConversation(user, createConversationPayload));
    }

    @Get()
    async getConversations(@AuthUser() { id }: User) {
        return this.conversationsService.getConversations(id);
    }

    @Get(':id')
    async getConversationsById(@Param('id') id: number) {
        return this.conversationsService.findById(id);
    }
}