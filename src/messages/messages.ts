import { Message } from 'src/utils/typeorm';
import { CreateMessageParams, CreateMessageResponse, DeleteMessageParams, EditMessageParams } from 'src/utils/types';

export interface IMessageService {
    createMessage(params: CreateMessageParams): Promise<CreateMessageResponse>;
    getMessages(conversationId: number): Promise<Message[]>;
    deleteMessage(params: DeleteMessageParams): void;
    editMessage(params: EditMessageParams): Promise<Message>;
}