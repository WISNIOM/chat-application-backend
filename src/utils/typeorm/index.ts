import { User } from './entities/user';
import { Session } from './entities/session';
import { Conversation } from './entities/conversation';
import { MessageAttachment } from './entities/message-attachment';
import { Message } from './entities/message';

const entities = [
    User,
    Session,
    Conversation,
    Message,
    MessageAttachment
];

export { User, Session, Conversation, Message, MessageAttachment };

export default entities;