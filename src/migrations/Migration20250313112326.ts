import { Migration } from '@mikro-orm/migrations';

export class Migration20250313112326 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "metadata" add column "policy" varchar(255) null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "metadata" drop column "policy";`);
  }

}
