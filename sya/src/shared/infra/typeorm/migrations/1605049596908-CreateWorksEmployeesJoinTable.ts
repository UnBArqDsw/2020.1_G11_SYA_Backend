import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateWorksEmployeesJoinTable1605049596908
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'works_employees',
        columns: [
          {
            name: 'employee_id',
            type: 'uuid',
          },
          {
            name: 'work_id',
            type: 'uuid',
          },
        ],
        foreignKeys: [
          {
            name: 'Employee',
            referencedTableName: 'employees',
            referencedColumnNames: ['id'],
            columnNames: ['employee_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'Work',
            referencedTableName: 'works',
            referencedColumnNames: ['id'],
            columnNames: ['work_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('works_employees');
  }
}
