import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {IsIn, Min, IsNotEmpty} from "class-validator";
import {Site} from "./Site";

@Entity()
export class Configuration {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Site)
    @JoinColumn({name: "site_id"})
    @IsNotEmpty()
    site!: Site;

    @Column()
    @IsIn(['Tesla', 'KATL'])
    battery_vendor!: string;

    @Column()
    @Min(0)
    battery_capacity_kwh!: number;

    @Column()
    @Min(0)
    battery_max_power_kw!: number;

    @Column()
    @Min(0)
    production_pv_units!: number;

    @Column()
    production_pv_kwp!: number;

    @Column()
    @Min(0)
    production_bio_units!: number;

    @Column()
    @Min(0)
    production_cro_units!: number;

    @Column()
    production_cro_kwp!: number;
}