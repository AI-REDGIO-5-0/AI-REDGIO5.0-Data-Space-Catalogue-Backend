import { Migration } from '@mikro-orm/migrations';

export class Migration20250225114722 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "metadata" alter column "contract_terms" type jsonb using ("contract_terms"::jsonb);`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "metadata" alter column "contract_terms" type varchar(255) using ("contract_terms"::varchar(255));`);
  }

}
