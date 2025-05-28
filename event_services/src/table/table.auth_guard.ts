import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserService } from '../user/user.service'
@Injectable()
export class TableAuthGuard implements CanActivate {
    constructor(private userService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest()
        const token = request.headers['authorization']

        if (!token) throw new UnauthorizedException('Missing token')

        const user = await this.userService.verify(token)
        if (!user) throw new UnauthorizedException('Invalid token')

        request.user = user
        return true
    }
}