import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateTodo1647090572310 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "todos",
          columns: [
            {
              name: "id",
              type: "integer",
              length: "11",
              isPrimary: true,
              isGenerated: true,
              generationStrategy: "increment",
            },
            {
              name: "title",
              type: "varchar"
            },
            {
              name: "description",
              type: "varchar"
            },
            {
              name: "status",
              type: "integer"
            },
            {
              name: "created_at",
              type: "timestamp",
              default: "now()",
            },
            {
              name: "updated_at",
              type: "timestamp",
              default: "now()",
            },
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('todos')
    }

}
