import {
  Entity,
  PrimaryKey,
  Property,
  ManyToOne,
  Unique,
} from '@mikro-orm/core';
import { Organizations } from './organizations.entity';

@Entity()
@Unique({ properties: ['source', 'target'] }) // One trust record per org→org pair
export class TrustLevel {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Organizations)
  source!: Organizations;

  @ManyToOne(() => Organizations)
  target!: Organizations;

  @Property()
  level!: number; // e.g. from 1 to 5

  @Property({ nullable: true })
  comment?: string;

  @Property()
  createdAt = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
