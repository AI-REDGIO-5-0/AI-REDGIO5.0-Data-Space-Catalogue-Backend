import { Migration } from '@mikro-orm/migrations';

export class Migration20250225115232 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "metadata" alter column "filesize" type real using ("filesize"::real);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "metadata" alter column "filesize" type int using ("filesize"::int);`);
  }

}
