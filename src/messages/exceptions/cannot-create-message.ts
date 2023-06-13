import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotCreateMessageException extends HttpException {
    constructor() {
        super('Could not create a new message!', HttpStatus.BAD_REQUEST);
    }
}