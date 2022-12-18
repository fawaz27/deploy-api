import { Repository } from "typeorm";
import { AppDataSource } from "../../database/AppDataSource";
import ConflictException from "../../exceptions/ConflictException";
import InternalErrorException from "../../exceptions/InternalErrorException";
import NotFoundException from "../../exceptions/NotFoundException";
import { Library } from "./library.entity";
import { UserService } from "../user/user.service";


export class LibraryService{

    private libraryRepository:Repository<Library> ;
    private userService:UserService;

    constructor(){
        this.libraryRepository = AppDataSource.getRepository(Library);
        this.userService = new UserService();
    }

    public async addLibraryWithId(userId:number){

        const user = await this.userService.getUserById(userId);

        const alreadyExist = await this.libraryRepository
                                .createQueryBuilder("library")
                                .leftJoinAndSelect("library.user","user")
                                .where("user.id = :userId",{userId})
                                .getOne();
        if(alreadyExist)
            throw new ConflictException('User already have a library');

        let newLibrary =  new Library();
        newLibrary.user = user;
        const result = await this.libraryRepository.save(newLibrary);

        if(result)
            return result;
        else
            throw new InternalErrorException();

    }
    
    public async addLibraryWithEmail(email:string){

        const user = await this.userService.getUserByEmail(email);

        let newLibrary =  new Library();
        newLibrary.user = user;
        const result = await this.libraryRepository.save(newLibrary);

        if(result)
            return result;
        else
            throw new InternalErrorException();

    }

    public async getAllLibrary(){

        const libraries  = await this.libraryRepository.find({relations:{user:true}});
        
        if(libraries && libraries.length!=0)
            return libraries;
        else
            throw new NotFoundException('No Libraries exists.');
    }

    public async getLibraryById(id:number){

        const library  = await this.libraryRepository.findOne({where:{id:id},relations:{user:true}});
        
        if(library)
            return library;
        else
            throw new NotFoundException('Library not found.');
    }

    public async getLibraryOfUser(userId:number){

        const library = await this.libraryRepository
                            .createQueryBuilder("library")
                            .leftJoinAndSelect("library.user","user")
                            .where("user.id = :userId",{userId})
                            .getOne();
        
        if(library)
            return library;
        else
            throw new NotFoundException('Library not found.');
    }



    public async deleteLibrary(id:number){

        const libraryToDelete  = await this.libraryRepository.findOne({where:{id:id}});

        if(libraryToDelete){
            const result = await this.libraryRepository.remove(libraryToDelete);
            
            if(result)
                return id;
            else
                throw new InternalErrorException();
        }
        else    
            throw new NotFoundException('Library not found.')
    }

}