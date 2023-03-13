import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from 'src/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(ctx: ExecutionContext): boolean {
    const requiredStatuses = this.reflector.get<string[]>(
      'statuses',
      ctx.getHandler(),
    );

    if (!requiredStatuses) {
      return true;
    }

    const { user } = ctx.switchToHttp().getRequest<{ user: User }>();
    return requiredStatuses.some((status) => user.userStatus.includes(status));
  }
}
