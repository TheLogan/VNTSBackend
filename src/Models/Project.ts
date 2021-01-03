import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Project {
  
  @PrimaryGeneratedColumn()
  id!: number;
  
  @Column()
  name!: string;
  
  @Column()
  description!: string;
  
  @Column()
  views!: number;
  
  @Column()
  isPublished!: boolean;
}