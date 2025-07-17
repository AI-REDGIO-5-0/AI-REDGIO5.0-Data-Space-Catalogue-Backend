import { Migration } from '@mikro-orm/migrations';

export class Migration20250529112606 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "trust_level" drop column "confidentiality";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "trust_level" add column "confidentiality" int not null;`);
  }

}
