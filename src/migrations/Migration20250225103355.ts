import { Migration } from '@mikro-orm/migrations';

export class Migration20250225103355 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "metadata" add column "access_policy" jsonb null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "metadata" drop column "access_policy";`);
  }

}
