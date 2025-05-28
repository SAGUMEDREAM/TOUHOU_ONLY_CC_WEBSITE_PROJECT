import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import md5 from "blueimp-md5";
import {randomString} from "../util/random_string";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) {
    }

    async register(name: string, password_md5: string) {
        const user = new User();
        user.name = name;
        user.password = password_md5;
        user.token = md5(randomString(32));
        try {
            await this.userRepo.insert(user)
            return user;
        } catch (err) {
            console.error(err)
            return null;
        }
    }

    async getLogin(name: string, password_md5: string) {
        return await this.userRepo.findOneBy({name, password: password_md5})
    }

    async getUserById(id: string) {
        return await this.userRepo.findOneById(id);
    }
    async getUserByName(name: string) {
        return await this.userRepo.findOneBy({name});
    }

    async verify(token: string) {
        return await this.userRepo.findOneBy({token});
    }
}
