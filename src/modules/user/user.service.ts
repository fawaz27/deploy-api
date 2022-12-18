
import { Repository } from 'typeorm';
import { AppDataSource } from '../../database/AppDataSource';
import { User } from './user.entity';
import bcrypt from 'bcrypt';
import NotFoundException from '../../exceptions/NotFoundException';

export class UserService{
   
    private userRepository:Repository<User> ;

    constructor(){
        this.userRepository = AppDataSource.getRepository(User);
    }

    public async getUserByEmail(email:string){
     
        const user = await this.userRepository.findOne(({where:{email:email}}));
        
        if(user)
            return user;
        else
            throw new NotFoundException(`User with email ${email} not found.`);       
    }

    public async getUserById(id:number){    
        const user = await this.userRepository.findOne(({where:{id:id}}));

        if(user)
            return user;
        else
            throw new NotFoundException('User not found.');
    }

    public async getAllUsers(){
        const users = await this.userRepository.find();

        if(users)
            return users;
    
    }

    public async markEmailAsConfirmed(email: string) {
        
        const result = await this.userRepository.update({ email }, {
            isEmailConfirmed: true
        }); 
        
        return result;
    }

    public async updatePassword(email: string,password:string) {

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await this.userRepository.update({ email }, {
            password: hashedPassword
        }); 
        
        return result;

    }
}