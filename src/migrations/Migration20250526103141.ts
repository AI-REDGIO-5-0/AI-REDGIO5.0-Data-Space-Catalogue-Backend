import { Migration } from '@mikro-orm/migrations';

export class Migration20250526103141 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "organizations" ("id" varchar(255) not null, "country" varchar(255) not null, "size" varchar(255) not null, "sector" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "organizations_pkey" primary key ("id"));`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "organizations" cascade;`);
  }

}
