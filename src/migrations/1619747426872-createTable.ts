import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTable1619747426872 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: `apontamento`,
        columns: [
          {
            name: `id`,
            type: `integer`,
            isPrimary: true,
            isGenerated: true,
            isUnique: true,
          },
          {
            name: `date`,
            type: `date`,
          },
          {
            name: `startTime`,
            type: `varchar(15)`,
          },
          {
            name: `endTime`,
            type: `varchar(15)`,
          },
          {
            name: `user`,
            type: `varchar(50)`,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(`apontamento`);
  }
}
