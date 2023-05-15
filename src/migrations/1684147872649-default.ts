import { MigrationInterface, QueryRunner } from "typeorm";

export class default1684147872649 implements MigrationInterface {
    name = 'default1684147872649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "teams" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(30) NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "matches" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), "idHost" integer, "idVisitor" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_matches" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), "idHost" integer, "idVisitor" integer, CONSTRAINT "fk_host_id" FOREIGN KEY ("idHost") REFERENCES "teams" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "fk_visitor_id" FOREIGN KEY ("idVisitor") REFERENCES "teams" ("id") ON DELETE CASCADE ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_matches"("id", "date", "idHost", "idVisitor") SELECT "id", "date", "idHost", "idVisitor" FROM "matches"`);
        await queryRunner.query(`DROP TABLE "matches"`);
        await queryRunner.query(`ALTER TABLE "temporary_matches" RENAME TO "matches"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "matches" RENAME TO "temporary_matches"`);
        await queryRunner.query(`CREATE TABLE "matches" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "date" date NOT NULL DEFAULT (CURRENT_TIMESTAMP), "idHost" integer, "idVisitor" integer)`);
        await queryRunner.query(`INSERT INTO "matches"("id", "date", "idHost", "idVisitor") SELECT "id", "date", "idHost", "idVisitor" FROM "temporary_matches"`);
        await queryRunner.query(`DROP TABLE "temporary_matches"`);
        await queryRunner.query(`DROP TABLE "matches"`);
        await queryRunner.query(`DROP TABLE "teams"`);
    }

}
