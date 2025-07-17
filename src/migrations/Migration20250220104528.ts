import { Migration } from '@mikro-orm/migrations';

export class Migration20250220104528 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "metadata" alter column "asset_id" type varchar(255) using ("asset_id"::varchar(255));`);
    this.addSql(`alter table "metadata" alter column "asset_id" drop not null;`);
    this.addSql(`alter table "metadata" alter column "title" type varchar(255) using ("title"::varchar(255));`);
    this.addSql(`alter table "metadata" alter column "title" drop not null;`);
    this.addSql(`alter table "metadata" alter column "keywords" type text[] using ("keywords"::text[]);`);
    this.addSql(`alter table "metadata" alter column "keywords" drop not null;`);
    this.addSql(`alter table "metadata" alter column "language" type varchar(255) using ("language"::varchar(255));`);
    this.addSql(`alter table "metadata" alter column "language" drop not null;`);
    this.addSql(`alter table "metadata" alter column "publisher" type varchar(255) using ("publisher"::varchar(255));`);
    this.addSql(`alter table "metadata" alter column "publisher" drop not null;`);
    this.addSql(`alter table "metadata" alter column "filesize" type int using ("filesize"::int);`);
    this.addSql(`alter table "metadata" alter column "filesize" drop not null;`);
    this.addSql(`alter table "metadata" alter column "manufacturing_domain" type varchar(255) using ("manufacturing_domain"::varchar(255));`);
    this.addSql(`alter table "metadata" alter column "manufacturing_domain" drop not null;`);
    this.addSql(`alter table "metadata" alter column "download_url" type jsonb using ("download_url"::jsonb);`);
    this.addSql(`alter table "metadata" alter column "download_url" drop not null;`);
    this.addSql(`alter table "metadata" alter column "contract_terms" type varchar(255) using ("contract_terms"::varchar(255));`);
    this.addSql(`alter table "metadata" alter column "contract_terms" drop not null;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "metadata" alter column "asset_id" type varchar(255) using ("asset_id"::varchar(255));`);
    this.addSql(`alter table "metadata" alter column "asset_id" set not null;`);
    this.addSql(`alter table "metadata" alter column "title" type varchar(255) using ("title"::varchar(255));`);
    this.addSql(`alter table "metadata" alter column "title" set not null;`);
    this.addSql(`alter table "metadata" alter column "keywords" type text[] using ("keywords"::text[]);`);
    this.addSql(`alter table "metadata" alter column "keywords" set not null;`);
    this.addSql(`alter table "metadata" alter column "language" type varchar(255) using ("language"::varchar(255));`);
    this.addSql(`alter table "metadata" alter column "language" set not null;`);
    this.addSql(`alter table "metadata" alter column "publisher" type varchar(255) using ("publisher"::varchar(255));`);
    this.addSql(`alter table "metadata" alter column "publisher" set not null;`);
    this.addSql(`alter table "metadata" alter column "filesize" type int4 using ("filesize"::int4);`);
    this.addSql(`alter table "metadata" alter column "filesize" set not null;`);
    this.addSql(`alter table "metadata" alter column "manufacturing_domain" type varchar(255) using ("manufacturing_domain"::varchar(255));`);
    this.addSql(`alter table "metadata" alter column "manufacturing_domain" set not null;`);
    this.addSql(`alter table "metadata" alter column "download_url" type varchar(255) using ("download_url"::varchar(255));`);
    this.addSql(`alter table "metadata" alter column "download_url" set not null;`);
    this.addSql(`alter table "metadata" alter column "contract_terms" type varchar(255) using ("contract_terms"::varchar(255));`);
    this.addSql(`alter table "metadata" alter column "contract_terms" set not null;`);
  }

}
