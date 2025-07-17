import { Migration } from '@mikro-orm/migrations';

export class Migration20250530134536 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "organizations" add column "category" int null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "organizations" drop column "category";`);
  }

}
