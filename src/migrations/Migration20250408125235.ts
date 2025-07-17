import { Migration } from '@mikro-orm/migrations';

export class Migration20250408125235 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "transactions" drop column "type";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "transactions" add column "type" varchar(255) not null;`);
  }

}
