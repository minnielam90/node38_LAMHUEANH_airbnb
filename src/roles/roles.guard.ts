import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { nguoi_dung } from "@prisma/client";
import { Observable } from "rxjs";
import { Role } from "./roles.enum";

@Injectable()
export class RolesGuard implements CanActivate{
    constructor(private reflector:Reflector){}
    canActivate(context: ExecutionContext): boolean {
        
        const requireRoles=this.reflector.getAllAndOverride<Role[]>('role',[
            context.getHandler(),
            context.getClass(),
        ]);
        console.log("requireRoles: ",requireRoles)

        if (!requireRoles){
            return true;
        }
        // console.log(context.switchToHttp().getRequest())
        const {user}=context.switchToHttp().getRequest();
        let isSusscessRole = requireRoles.some(role=>user.data?.role?.includes(role));
        if(!isSusscessRole){
            throw new UnauthorizedException('Không có quyền truy cập'); 
        }

        return true
    }
}