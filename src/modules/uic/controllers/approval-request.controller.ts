import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseHttpModel } from '@shared/models';
import { CreateApprovalRequestDto } from '../dto/approval-request/create-approval-request.dto';
import { ApprovalRequestsService } from '../services/approval-request.service';

@ApiTags('Approval-requests')
@Controller('approval-requests')
export class ApprovalRequestsController {
  constructor(private approvalRequestsService: ApprovalRequestsService) {}
  @ApiOperation({ summary: 'Create One' })
  //@Uic()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() payload: CreateApprovalRequestDto,
  ): Promise<ResponseHttpModel> {
    const serviceResponse = await this.approvalRequestsService.create(payload);

    return {
      data: serviceResponse.data,
      message: 'ApprovalRequest created',
      title: 'Created',
    };
  }
}
