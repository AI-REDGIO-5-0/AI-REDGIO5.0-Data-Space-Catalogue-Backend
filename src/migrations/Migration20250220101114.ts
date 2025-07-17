import { Migration } from '@mikro-orm/migrations';

export class Migration20250220101114 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "metadata" ("id" varchar(255) not null, "asset_id" varchar(255) not null, "version" varchar(255) null, "title" varchar(255) not null, "description" varchar(255) null, "keywords" text[] not null, "language" varchar(255) not null, "publisher" varchar(255) not null, "filesize" int not null, "manufacturing_domain" varchar(255) not null, "download_url" varchar(255) not null, "contract_terms" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "metadata_pkey" primary key ("id"));`);
    this.addSql(`alter table "metadata" add constraint "metadata_asset_id_unique" unique ("asset_id");`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "metadata" cascade;`);
  }

}
