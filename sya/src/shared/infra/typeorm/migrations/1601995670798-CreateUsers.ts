import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1601995670798 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'cpf',
            type: 'varchar',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'cnpj',
            type: 'varchar',
            isNullable: true,
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'business_area',
            type: 'varchar',
          },
          {
            name: 'business_name',
            type: 'varchar',
          },
          {
            name: 'operating_day',
            type: 'varchar',
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'initial_hour',
            type: 'timestamp',
          },
          {
            name: 'finish_hour',
            type: 'timestamp',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
