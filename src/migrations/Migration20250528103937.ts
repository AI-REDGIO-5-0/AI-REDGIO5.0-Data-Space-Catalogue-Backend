import { Migration } from '@mikro-orm/migrations';

export class Migration20250528103937 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "trust_level" ("id" serial primary key, "source_id" varchar(255) not null, "target_id" varchar(255) not null, "level" int not null, "confidentiality" int not null, "comment" varchar(255) null, "created_at" timestamptz not null, "updated_at" timestamptz not null);`);
    this.addSql(`alter table "trust_level" add constraint "trust_level_source_id_target_id_unique" unique ("source_id", "target_id");`);

    this.addSql(`alter table "trust_level" add constraint "trust_level_source_id_foreign" foreign key ("source_id") references "organizations" ("id") on update cascade;`);
    this.addSql(`alter table "trust_level" add constraint "trust_level_target_id_foreign" foreign key ("target_id") references "organizations" ("id") on update cascade;`);

    this.addSql(`alter table "organizations" add column "active" boolean not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "trust_level" cascade;`);

    this.addSql(`alter table "organizations" drop column "active";`);
  }

}
