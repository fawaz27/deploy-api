import express from 'express';
import { AuthentificationService } from './authentification.service';
import validationMiddleware from '../../middlewares/validationMiddleware';
import logInDto from './login.dto';
import CreateUserDto from '../user/user.dto';
import EmailConfirmationService from '../email/emailConfirmation.service';
import ForgotPasswordDto from '../password/forgotPassword.dto';
import ResetPasswordService from '../password/resetPassword.service';




export class AuthentificationController{

    public path = '/auth';
    public router = express.Router();
    private authService:AuthentificationService;
    private emailConfirmationService:EmailConfirmationService;
    private resetPasswordService:ResetPasswordService;

    constructor(){      
      this.authService = new AuthentificationService();
      this.emailConfirmationService = new EmailConfirmationService();
      this.resetPasswordService = new ResetPasswordService();
      this.initializeRoutes();
    }

    
    
    private initializeRoutes()
    {
        this.router.post(`${this.path}/register`,validationMiddleware(CreateUserDto), this.registration);
        this.router.post(`${this.path}/login`,validationMiddleware(logInDto), this.logIn);
        this.router.post(`${this.path}/forgotPassword`,validationMiddleware(ForgotPasswordDto), this.forgotPassword);
        this.router.post(`${this.path}/logout`, this.logOut)
        
    }

    public  registration = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{

        const UserData:CreateUserDto = request.body;
        //console.log(UserData);
        try {
            const created = await this.authService.register(UserData);
            const result = await  this.emailConfirmationService.sendVerificationLink(created.email);
            response.status(201).send(created);
   
        } catch (error) {
           
            next(error);
        }
    }

    

    public  logIn = async(request: express.Request, response: express.Response, next: express.NextFunction)=>{
        
        const login:logInDto=request.body;
        
        try {
            const {cookie,user} = await this.authService.logIn(login);
            response.setHeader('Set-Cookie', [cookie]);//?
            response.status(200).send(user);


        } catch (error) {
            next(error);
        }
        
    }

    public  logOut = async(request: express.Request, response: express.Response)=>{
        
        try {
            const result = await this.authService.logOut()
            response.setHeader('Set-Cookie', [result]);
            response.status(200).send();
        } catch (error) {
            console.log(error);     
        }
        
        
    }

    public forgotPassword =  async(request: express.Request, response: express.Response,next: express.NextFunction)=>{

        const forgotData:ForgotPasswordDto = request.body;
        try {
        
            const email = await this.resetPasswordService.checkEmail(forgotData.email); 
            const result = await this.resetPasswordService.sendResetLink(email);
            console.log(result);
            response.status(200).send(result);
        } catch (error) {
            next(error);
        }
    }
}

