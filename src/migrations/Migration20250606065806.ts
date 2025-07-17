import { Migration } from '@mikro-orm/migrations';

export class Migration20250606065806 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "transactions" add column "organization" varchar(255) not null, add column "type" varchar(255) not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "transactions" drop column "organization", drop column "type";`);
  }

}
