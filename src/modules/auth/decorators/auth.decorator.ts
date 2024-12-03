import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from '@auth/guards';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RoleEntity } from '@auth/entities';
import { RoleEnum } from '@auth/enums';

export function Auth(...roles: RoleEnum[]) {
  return applyDecorators(UseGuards(JwtGuard), ApiBearerAuth());
}
