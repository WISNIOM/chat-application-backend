import { Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseMessage } from './base-message';
import { Conversation } from './conversation';
import { MessageAttachment } from './message-attachment';

@Entity({ name: 'messages' })
export class Message extends BaseMessage {
    @ManyToOne(() => Conversation, (conversation) => conversation.messages)
    conversation: Conversation;

    @OneToMany(() => MessageAttachment, (attachment) => attachment.message)
    @JoinColumn()
    attachments: MessageAttachment[];
}