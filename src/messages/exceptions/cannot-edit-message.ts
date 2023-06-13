import { HttpException, HttpStatus } from '@nestjs/common';

export class CannotEditMessageException extends HttpException {
    constructor() {
        super('Could not edit an existing message!', HttpStatus.BAD_REQUEST);
    }
}