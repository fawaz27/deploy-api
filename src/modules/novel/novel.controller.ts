import express, { Request,Response, Router ,NextFunction} from 'express';
import adminMiddleware from '../../middlewares/adminMiddleware';
import authMiddleware from '../../middlewares/authMiddleware';
import validationMiddleware from '../../middlewares/validationMiddleware';
import CreateNovelDto from './novel.dto';
import { NovelService } from './novel.service';

export class NovelController{

    public path:string = '/novels';
    public router:Router = express.Router();
    private novelService: NovelService

    constructor(){      
        this.novelService= new NovelService();
        this.initializeRoutes();
    }

    private initializeRoutes(){

        this.router
            .get(
                `${this.path}User`,
                authMiddleware ,
                this.getNovelsOfUser)
            .get(
                `${this.path}Library`,
                authMiddleware ,
                adminMiddleware ,
                this.getNovelsOfLirbrary
                )
            .post(this.path,validationMiddleware(CreateNovelDto),this.addNovelToLibrary)
        
        this.router
            .all(`${this.path}/*`,authMiddleware )
            .get(`${this.path}/:id`,this.getNovelbyId)
            .put(`${this.path}/:id`,validationMiddleware(CreateNovelDto),this.updateNovel)
            .delete(`${this.path}/:id`,this.deleteNovel)
    }

    public  addNovelToLibrary = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const id_library = Number(request.query.id_library);
        const id_source = Number(request.query.id_source);
        const novelData:CreateNovelDto = request.body;

        try {
            const result = await this.novelService.addNovelToLibrary(id_library,id_source,novelData);
            response.status(201).send(result);
        } catch (error) {
            next(error);
        }
    }

    public  getNovelsOfUser = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const userId = Number(request.query.userId);
        
        try {
            const result = await this.novelService.getNovelsOfUser(userId);
            response.status(201).send(result);
        } catch (error) {
            next(error);
        }
    }

    public  getNovelsOfLirbrary = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const id_library = Number(request.query.id_library);

        try {
            const result = await this.novelService.getNovelsOfLirbrary(id_library);
            response.status(201).send(result);
        } catch (error) {
            next(error);
        }
    }

    public  getNovelbyId = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
        const id = Number(request.params.id);
        try {
            const result = await this.novelService.getNovelbyId(id);
            response.status(201).send(result);
        } catch (error) {
            next(error);
        }
    }

    public  updateNovel = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
        const id = Number(request.params.id);
        const novelData:CreateNovelDto = request.body;
        try {
            const result = await this.novelService.updateNovel(id,novelData);
            response.status(201).send(result);
        } catch (error) {
            next(error);
        }
    }

    public  deleteNovel = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const id = Number(request.params.id);
        try {
            const result = await this.novelService.deleteNovel(id);
            response.status(201).send(`Novel with ${result} has been deleted`);
        } catch (error) {
            next(error);
        }
    }


}