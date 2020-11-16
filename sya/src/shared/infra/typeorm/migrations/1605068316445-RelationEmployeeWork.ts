import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationEmployeeWork1605068316445
  implements MigrationInterface {
  name = 'RelationEmployeeWork1605068316445';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "works" DROP CONSTRAINT "WorkUser"`);
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "EmployeeUser"`
    );
    await queryRunner.query(
      `CREATE TABLE "employees_works_works" ("employeesId" uuid NOT NULL, "worksId" uuid NOT NULL, CONSTRAINT "PK_c9dc37f51a6f423929c7d831ab8" PRIMARY KEY ("employeesId", "worksId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_980b42090aaf733132ee774561" ON "employees_works_works" ("employeesId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_681108b70484a4236767fb3d6f" ON "employees_works_works" ("worksId") `
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "name" character varying(100)`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "email" character varying(100)`
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_230b925048540454c8b4c481e1c"`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cpf"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "cpf" character varying(100)`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "operating_day"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "operating_day" character varying(100)`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" character varying(100)`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "business_area"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "business_area" character varying(100)`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "business_name"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "business_name" character varying(100)`
    );
    await queryRunner.query(`ALTER TABLE "works" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "works" ADD "name" character varying(100)`
    );
    await queryRunner.query(`ALTER TABLE "works" DROP COLUMN "price"`);
    await queryRunner.query(`ALTER TABLE "works" ADD "price" integer`);
    await queryRunner.query(`ALTER TABLE "works" DROP COLUMN "duration"`);
    await queryRunner.query(
      `ALTER TABLE "works" ADD "duration" character varying(100)`
    );
    await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "employees" ADD "name" character varying(100)`
    );
    await queryRunner.query(
      `ALTER TABLE "works" ADD CONSTRAINT "FK_8fb7128aeef9dc826489805eb18" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "FK_2d83c53c3e553a48dadb9722e38" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "employees_works_works" ADD CONSTRAINT "FK_980b42090aaf733132ee7745613" FOREIGN KEY ("employeesId") REFERENCES "employees"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "employees_works_works" ADD CONSTRAINT "FK_681108b70484a4236767fb3d6f3" FOREIGN KEY ("worksId") REFERENCES "works"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "employees_works_works" DROP CONSTRAINT "FK_681108b70484a4236767fb3d6f3"`
    );
    await queryRunner.query(
      `ALTER TABLE "employees_works_works" DROP CONSTRAINT "FK_980b42090aaf733132ee7745613"`
    );
    await queryRunner.query(
      `ALTER TABLE "employees" DROP CONSTRAINT "FK_2d83c53c3e553a48dadb9722e38"`
    );
    await queryRunner.query(
      `ALTER TABLE "works" DROP CONSTRAINT "FK_8fb7128aeef9dc826489805eb18"`
    );
    await queryRunner.query(`ALTER TABLE "employees" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "employees" ADD "name" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "works" ALTER COLUMN "user_id" DROP NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "works" DROP COLUMN "duration"`);
    await queryRunner.query(
      `ALTER TABLE "works" ADD "duration" character varying NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "works" DROP COLUMN "price"`);
    await queryRunner.query(
      `ALTER TABLE "works" ADD "price" character varying NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "works" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "works" ADD "name" character varying NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "business_name"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "business_name" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "avatar" DROP NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "business_area"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "business_area" character varying NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "password" character varying NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "operating_day"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "operating_day" character varying NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cpf"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "cpf" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf")`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "email"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "email" character varying NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")`
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "name" character varying NOT NULL`
    );
    await queryRunner.query(`DROP INDEX "IDX_681108b70484a4236767fb3d6f"`);
    await queryRunner.query(`DROP INDEX "IDX_980b42090aaf733132ee774561"`);
    await queryRunner.query(`DROP TABLE "employees_works_works"`);
    await queryRunner.query(
      `ALTER TABLE "employees" ADD CONSTRAINT "EmployeeUser" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "works" ADD CONSTRAINT "WorkUser" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE`
    );
  }
}
