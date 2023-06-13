import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IConversationsService } from './conversations';
import { CreateConversationParams } from 'src/utils/types';
import { InjectRepository } from '@nestjs/typeorm';
import { Conversation, Message, User } from 'src/utils/typeorm';
import { Repository } from 'typeorm';
import { Services } from 'src/utils/constants';
import { IUserService } from 'src/users/users';
import { ConversationExistsException } from './exceptions/conversation-exists';

@Injectable()
export class ConversationsService implements IConversationsService {

    constructor(
        @InjectRepository(Conversation)
        private readonly conversationRepository: Repository<Conversation>,
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>,
        @Inject(Services.Users)
        private readonly userService: IUserService,
    ) { }

    async createConversation(user: User, params: CreateConversationParams) {
        const { id: authorId } = user;
        const { recipientId, message } = params;
        const conversationExists = await this.isCreated(authorId, recipientId);
        if (conversationExists) {
            throw new ConversationExistsException();
        }

        if (authorId === recipientId) {
            throw new BadRequestException("You can't create a conversation with yourself!");
        }

        const [author, recipient] = await Promise.all([
            this.userService.findUser({ id: authorId }),
            this.userService.findUser({ id: recipientId })
        ]);

        const newConversation = this.conversationRepository.create({
            creator: author,
            recipient,
        });

        const conversation = await this.save(
            newConversation,
        );

        const newMessage = this.messageRepository.create({
            content: message,
            conversation,
            author,
        });

        const savedMessage = await this.messageRepository.save(newMessage);
        conversation.lastMessageSent = savedMessage;
        const updatedConversation = await this.save(conversation);
        return updatedConversation;
    }

    async isCreated(authorId: number, recipientId: number) {
        return this.conversationRepository.findOne({
            where: [
                {
                    creator: { id: authorId },
                    recipient: { id: recipientId },
                },
                {
                    creator: { id: recipientId },
                    recipient: { id: authorId },
                },
            ],
        });
    }

    async getConversations(id: number): Promise<Conversation[]> {
        return this.conversationRepository
            .createQueryBuilder('conversation')
            .leftJoinAndSelect('conversation.lastMessageSent', 'lastMessageSent')
            .leftJoinAndSelect('conversation.creator', 'creator')
            .leftJoinAndSelect('conversation.recipient', 'recipient')
            .where('creator.id = :id', { id })
            .orWhere('recipient.id = :id', { id })
            .orderBy('conversation.lastMessageSentAt', 'DESC')
            .getMany();
    }

    async findById(id: number): Promise<Conversation> {
        return this.conversationRepository.findOne({
            where: { id },
            relations: [
                'creator',
                'recipient',
                'lastMessageSent',
            ],
        });
    }

    async save(conversation: Conversation): Promise<Conversation> {
        return this.conversationRepository.save(conversation);
    }
}