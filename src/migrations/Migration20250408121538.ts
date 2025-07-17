import { Migration } from '@mikro-orm/migrations';

export class Migration20250408121538 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "transactions" ("id" varchar(255) not null, "version" varchar(255) null, "seller" varchar(255) not null, "asset_title" varchar(255) not null, "asset_id" varchar(255) not null, "price" int null, "sector" varchar(255) not null, "type" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "transactions_pkey" primary key ("id"));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "transactions" cascade;`);
  }

}
