import { Migration } from '@mikro-orm/migrations';

export class Migration20250528114815 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "organizations" add column "name" varchar(255) not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "organizations" drop column "name";`);
  }

}
