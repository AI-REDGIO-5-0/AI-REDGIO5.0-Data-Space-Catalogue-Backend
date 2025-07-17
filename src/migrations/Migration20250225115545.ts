import { Migration } from '@mikro-orm/migrations';

export class Migration20250225115545 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "metadata" add column "price" int null, add column "license" varchar(255) null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "metadata" drop column "price", drop column "license";`);
  }

}
