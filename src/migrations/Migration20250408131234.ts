import { Migration } from '@mikro-orm/migrations';

export class Migration20250408131234 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "transactions" add column "buyer" varchar(255) not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "transactions" drop column "buyer";`);
  }

}
