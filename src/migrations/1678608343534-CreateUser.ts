import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUser1678608343534 implements MigrationInterface {
    name = 'CreateUser1678608343534'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userName" character varying NOT NULL, "password" character varying NOT NULL, "userStatus" character varying NOT NULL, CONSTRAINT "UQ_da5934070b5f2726ebfd3122c80" UNIQUE ("userName"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
