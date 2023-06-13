import { HttpException, HttpStatus } from '@nestjs/common';

export class ConversationNotFoundException extends HttpException {
    constructor() {
        super('Conversation doesn\'t exist!', HttpStatus.BAD_REQUEST);
    }
}