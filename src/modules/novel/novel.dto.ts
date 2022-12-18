import { IsString,IsNotEmpty, MaxLength } from 'class-validator';

class CreateNovelDto
{
    @IsNotEmpty({message: ' please the name is required'})
    @IsString()
    @MaxLength(200)
    public name : string;

    @IsString()
    @MaxLength(300)
    public nameAlt : string;

    @IsNotEmpty({message: ' please the link is required'})
    @IsString()
    @MaxLength(200)
    public link : string;

    @IsNotEmpty({message: ' please the status is required'})
    @IsString()
    @MaxLength(50)
    public status : string;

    @IsNotEmpty({message: ' please the lang is required'})
    @IsString()
    @MaxLength(10)
    public lang : string;

    @IsString()
    @IsNotEmpty()
    public genres : string;

    @IsString()
    @MaxLength(200)
    public infos : string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    public lastChapter : string;

    @IsString()
    @MaxLength(500)
    public description : string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(500)
    public img : string;

}


export default CreateNovelDto;