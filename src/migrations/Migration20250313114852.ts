import { Migration } from '@mikro-orm/migrations';

export class Migration20250313114852 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "metadata" drop constraint "metadata_asset_id_unique";`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "metadata" add constraint "metadata_asset_id_unique" unique ("asset_id");`);
  }

}
