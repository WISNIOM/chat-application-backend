import { Conversation, Message, User } from './typeorm';
import { Request } from 'express';

export type CreateUserDetails = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
};

export type ValidateUserDetails = {
    email: string;
    password: string;
};

export type FindUserParams = Partial<{
    id: number;
    email: string;
}>;

export type CreateConversationParams = {
    recipientId: number;
    message: string;
};

export type ConversationIdentityType = 'author' | 'recipient';


export interface AuthenticatedRequest extends Request {
    user: User;
};

export type FindUserOptions = Partial<{
    selectAll: boolean;
}>;

export type CreateMessageParams = {
    content: string;
    conversationId: number;
    user: User;
};

export type CreateMessageResponse = {
    message: Message;
    conversation: Conversation;
};

export type EditMessageParams = {
    conversationId: number;
    messageId: number;
    userId: number;
    content: string;
};

export type DeleteMessageParams = {
    conversationId: number;
    messageId: number;
    userId: number;
};