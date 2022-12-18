

import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Chapter } from "../chapter/chapter.entity";
import { Library } from "../library/library.entity";
import { Source } from "../source/source.entity";

@Entity()
export class Novel{

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'varchar', length: 200 })
    public name : string;

    @Column({ type: 'varchar', length: 300 })
    public nameAlt : string;

    @Column({ type: 'varchar', length: 200 })
    public link : string;

    @Column({ type: 'varchar', length: 50 })
    public status : string;

    @Column({ type: 'varchar', length: 10})
    public lang : string;

    @Column({ type: 'varchar', length: 500 })
    public genres : string;

    @Column({ type: 'varchar', length: 200 })
    public infos : string;

    @Column({ type: 'varchar', length: 200 })
    public lastChapter : string;

    @Column({ type: 'varchar', length: 500 })
    public description : string;

    @Column({ type: 'varchar', length: 500 })
    public img : string;

    @OneToMany(()=> Chapter, (chap)=>chap.novel)
    public chapters : Chapter[]
    
    @ManyToOne(()=>Source,(source)=>source.novels)
    public source: Source;

    @ManyToOne(()=>Library,(library)=>library.novels)
    public library: Library;
    


}