import {All, Controller, RequestMapping} from '@nestjs/common';
import {UserService} from "./user.service";
import {Result} from "../util/result";
import {User} from "./user.entity";
import md5 from "blueimp-md5";
import {register} from "tsconfig-paths";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {
    }

    @All("register")
    async register(name: string, password: string, password_again: string) {
        if(password != password_again) {
            return Result.error(null,"两次密码不一致");
        }
        const userByName = await this.userService.getUserByName(name);
        if (userByName != null) {
            return Result.error(null,"该用户名已被占用");
        }
        const s = md5(password);
        const result = await this.userService.register(name, s);
        if(result == null) {
            return Result.error(null,"注册失败");
        } else {
            return Result.success(result,"账号注册成功");
        }
    }

    @All("login")
    async login(name: string, password: string) {
        const userVar = await this.userService.getLogin(name, md5(password));
        if (userVar != null) {
            return Result.success({token: userVar.token}, "登录成功");
        } else {
            return Result.error(null,"登录失败")
        }
    }

    @All("verify")
    async verify(token: string) {
        return Result.success({s: await this.userService.verify(token) != null});
    }

    @All("get")
    async get(id: string) {
        const userVar = await this.userService.getUserById(id);
        if (userVar != null) {
            userVar.password = "*";
            userVar.token = "*";
        }
        return Result.success(userVar);
    }
}
