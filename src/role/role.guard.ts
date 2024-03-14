// // roles.guard.ts

// import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';

// @Injectable()
// export class RolesGuard implements CanActivate {
//   constructor(private reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const roles = this.reflector.get<string[]>('roles', context.getHandler());
//     if (!roles) {
//       return true;
//     }

//     const request = context.switchToHttp().getRequest();
//     const user = request.user; // Assuming that user information is stored in request.user

//     if (!(user && user.roles && user.roles.some((role) => roles.includes(role)))) {
//       throw new ForbiddenException('User không phải quyền admin');
//     }

//     return true;
//   }
// }

// role.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user || !user.role) {
      return false;
    }

    return roles.includes(user.role);
  }
}
