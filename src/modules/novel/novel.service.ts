import { Repository } from "typeorm";
import { AppDataSource } from "../../database/AppDataSource";
import CreateNovelDto from "./novel.dto";
import InternalErrorException from "../../exceptions/InternalErrorException";
import NotFoundException from "../../exceptions/NotFoundException";
import { Novel } from "./novel.entity";
import { LibraryService } from "../library/library.service";
import { SourceService } from "../source/source.service";
import { UserService } from "../user/user.service";


export class NovelService{

    private novelRepository:Repository<Novel> ;
    private sourceService : SourceService;
    private libraryService:LibraryService;
    private userService: UserService;

    constructor(){
        this.novelRepository = AppDataSource.getRepository(Novel);
        this.userService = new UserService();
        this.sourceService = new SourceService();
        this.libraryService = new LibraryService();

    }

    public async addNovelToLibrary(id_library:number, id_source:number,novel:CreateNovelDto){

        const library = await this.libraryService.getLibraryById(id_library);
        const source = await this.sourceService.getSourceById(id_source);

        let newNovel =  this.novelRepository.create(novel);
        newNovel.source = source;
        newNovel.library = library;
        const result = await this.novelRepository.save(newNovel);

        if(result)
            return result;
        else
            throw new InternalErrorException();
    }

    public async getNovelsOfUser(userId:number){

        const user = await this.userService.getUserById(userId);
        const library = await this.libraryService.getLibraryOfUser(user.id);
        const novels = await this.getNovelsOfLirbrary(library.id);

        return novels;

    }

    public async getNovelsOfLirbrary(id_library:number){

        const novels = await this.novelRepository
                        .createQueryBuilder("novel")
                        .leftJoinAndSelect("novel.source","source")
                        .leftJoinAndSelect("novel.library","library")
                        .where("library.id = :id_library",{id_library})
                        .getMany();

        if(novels)
            return novels;
        
    }

    public async getNovelbyId(id_novel:number){

        const novel = await this.novelRepository
                        .createQueryBuilder("novel")
                        .leftJoinAndSelect("novel.source","source")
                        .leftJoinAndSelect("novel.library","library")
                        .where("novel.id = :id_novel",{id_novel})
                        .getOne();
                        
        if(novel)
            return novel;
        else
            throw new NotFoundException('Novel not found.');   
            
    }

    public async updateNovel(id_novel:number,novel:CreateNovelDto){

        const ifExist = await this.novelRepository
                            .createQueryBuilder("novel")
                            .leftJoinAndSelect("novel.source","source")
                            .leftJoinAndSelect("novel.library","library")
                            .where("novel.id = :id_novel",{id_novel})
                            .getOne();
        
        if(ifExist){
            const updatedNovel = this.novelRepository.update(id_novel,novel);

            if (updatedNovel) 
                return updatedNovel;
            else
                throw new InternalErrorException();
        }
        else    
            throw new NotFoundException('Novel not found.');
        
    } 


    public async deleteNovel(id_novel:number){

        const novelToDelete = await this.novelRepository
                            .createQueryBuilder("novel")
                            .leftJoinAndSelect("novel.source","source")
                            .leftJoinAndSelect("novel.library","library")
                            .where("novel.id = :id_novel",{id_novel})
                            .getOne();
        
        if(novelToDelete){
            const result = await this.novelRepository.remove(novelToDelete);
    
            if(result)
                return id_novel;
            else
                throw new InternalErrorException();
        }
        else    
            throw new NotFoundException('Novel not found.');
    }

}