import { BadRequestException, HttpException, Inject, Injectable } from '@nestjs/common';
import { IMessageService } from './messages';
import { Message } from 'src/utils/typeorm';
import { CreateMessageParams, CreateMessageResponse, DeleteMessageParams, EditMessageParams } from 'src/utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Services } from 'src/utils/constants';
import { IConversationsService } from 'src/conversations/conversations';
import { ConversationNotFoundException } from 'src/conversations/exceptions/conversation-not-found';
import { CannotCreateMessageException } from './exceptions/cannot-create-message';
import { instanceToPlain } from 'class-transformer';
import { CannotEditMessageException } from './exceptions/cannot-edit-message';

@Injectable()
export class MessagesService implements IMessageService {

    constructor(
        @InjectRepository(Message) private readonly messageRepository: Repository<Message>,
        @Inject(Services.Conversations) private readonly conversationService: IConversationsService,
    ) { }

    async createMessage(params: CreateMessageParams): Promise<CreateMessageResponse> {
        const { conversationId, content, user } = params;
        const conversation = await this.conversationService.findById(conversationId);
        if (!conversation) {
            throw new ConversationNotFoundException();
        }
        const { creator, recipient } = conversation;
        if (creator.id !== user.id && recipient.id !== user.id) {
            throw new CannotCreateMessageException();
        }

        const message = this.messageRepository.create({
            content,
            conversation,
            author: instanceToPlain(user),
        });

        const savedMessage = await this.messageRepository.save(message);
        conversation.lastMessageSent = savedMessage;
        const updated = await this.conversationService.save(conversation);
        return {
            message: savedMessage,
            conversation: updated,
        };
    }

    getMessages(conversationId: number): Promise<Message[]> {
        return this.messageRepository.find({
            relations: ['author'],
            where: { conversation: { id: conversationId } },
            order: { createdAt: 'DESC' },
        });
    }

    async deleteMessage(params: DeleteMessageParams) {
        const { conversationId } = params;
        const msgParams = { id: conversationId, limit: 5 };
    }

    async editMessage(params: EditMessageParams): Promise<Message> {
        const messageToEdit = await this.messageRepository.findOne({
            where: {
                id: params.messageId,
                author: { id: params.userId },
            },
            relations: [
                'conversation',
                'conversation.creator',
                'conversation.recipient',
            ],
        });
        if (!messageToEdit) {
            throw new CannotEditMessageException();
        }
        messageToEdit.content = params.content;
        return this.messageRepository.save(messageToEdit);
    }
}
