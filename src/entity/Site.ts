import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import {IsNotEmpty} from "class-validator";

@Entity()
export class Site {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @IsNotEmpty()
    name!: string;

    @Column()
    @IsNotEmpty()
    location!: string;
}