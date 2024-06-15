import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {Min, Max, IsBoolean} from "class-validator";
import {Site} from "./Site";

@Entity()
export class LiveData {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Site)
    @JoinColumn({name: "site_id"})
    site!: Site;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    dt_stamp!: Date;

    @Column()
    @Min(0)
    @Max(100)
    soc!: number;

    @Column()
    @Min(0)
    load_kwh!: number;

    @Column()
    @Min(0)
    net_load_kwh!: number;

    @Column()
    @IsBoolean()
    pv_notification!: boolean;

    @Column()
    @IsBoolean()
    bio_notification!: boolean;

    @Column()
    @IsBoolean()
    cro_notification!: boolean;
}