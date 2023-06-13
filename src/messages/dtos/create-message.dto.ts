import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMEssageDto {

    @IsNotEmpty()
    @IsString()
    content: string;

    @IsNotEmpty()
    @IsNumber()
    conversationId: number;
}