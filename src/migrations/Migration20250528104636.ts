import { Migration } from '@mikro-orm/migrations';

export class Migration20250528104636 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "organizations" alter column "country" type int using ("country"::int);`);
    this.addSql(`alter table "organizations" alter column "size" type int using ("size"::int);`);
    this.addSql(`alter table "organizations" alter column "sector" type int using ("sector"::int);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "organizations" alter column "country" type varchar(255) using ("country"::varchar(255));`);
    this.addSql(`alter table "organizations" alter column "size" type varchar(255) using ("size"::varchar(255));`);
    this.addSql(`alter table "organizations" alter column "sector" type varchar(255) using ("sector"::varchar(255));`);
  }

}
