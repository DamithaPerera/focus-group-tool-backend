import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1678311234567 implements MigrationInterface {
    name = 'InitialMigration1678311234567';

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create the User table
        await queryRunner.query(`
      CREATE TABLE "user" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "email" character varying NOT NULL,
        "role" character varying NOT NULL,
        "roomId" integer,
        CONSTRAINT "UQ_email" UNIQUE ("email"),
        CONSTRAINT "PK_user_id" PRIMARY KEY ("id")
      )
    `);

        // Create the Room table
        await queryRunner.query(`
      CREATE TABLE "room" (
        "id" SERIAL NOT NULL,
        "name" character varying NOT NULL,
        "uniqueIdentifier" character varying NOT NULL,
        "participants" jsonb DEFAULT '[]',
        CONSTRAINT "PK_room_id" PRIMARY KEY ("id")
      )
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "room"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
