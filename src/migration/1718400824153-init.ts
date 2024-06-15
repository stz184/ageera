import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1718400824153 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            CREATE TABLE IF NOT EXISTS site (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                location VARCHAR(255) NOT NULL
            )
        `);

        queryRunner.query(`
            CREATE TABLE IF NOT EXISTS configuration (
                id SERIAL PRIMARY KEY,
                site_id INT REFERENCES sites(id) ON DELETE CASCADE,
                battery_vendor VARCHAR(50) CHECK (battery_vendor IN ('Tesla', 'KATL')) NOT NULL,
                battery_capacity_kwh FLOAT CHECK (battery_capacity_kwh >= 0) NOT NULL,
                battery_max_power_kw FLOAT CHECK (battery_max_power_kw >= 0) NOT NULL,
                production_pv_units INT CHECK (production_pv_units >= 0) NOT NULL,
                production_pv_kwp FLOAT,
                production_bio_units INT CHECK (production_bio_units >= 0) NOT NULL,
                production_cro_units INT CHECK (production_cro_units >= 0) NOT NULL,
                production_cro_kwp FLOAT
            )`);


        queryRunner.query(`
            CREATE TABLE IF NOT EXISTS live_data (
                id SERIAL PRIMARY KEY,
                site_id INT REFERENCES sites(id) ON DELETE CASCADE,
                dt_stamp TIMESTAMP NOT NULL,
                soc INT CHECK (soc >= 0 AND soc <= 100) NOT NULL,
                load_kwh FLOAT CHECK (load_kwh >= 0) NOT NULL,
                net_load_kwh FLOAT CHECK (net_load_kwh >= 0) NOT NULL,
                pv_notification BOOLEAN NOT NULL,
                bio_notification BOOLEAN NOT NULL,
                cro_notification BOOLEAN NOT NULL
            )`);

        queryRunner.query(`CREATE INDEX idx_configurations_site_id ON configuration (site_id)`);
        queryRunner.query(`CREATE INDEX idx_live_data_site_id ON live_data(site_id)`);
        queryRunner.query(`CREATE INDEX idx_live_data_dt_stamp ON live_data(dt_stamp)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DROP TABLE IF EXISTS live_data`);
        queryRunner.query(`DROP TABLE IF EXISTS configurations`);
        queryRunner.query(`DROP TABLE IF EXISTS sites`);
    }
}
