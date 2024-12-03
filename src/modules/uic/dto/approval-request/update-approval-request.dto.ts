import { PartialType } from '@nestjs/swagger';
import { BaseApprovalRequestDto } from '@uic/dto';

export class UpdateApprovalRequestDto extends PartialType(BaseApprovalRequestDto) {}
