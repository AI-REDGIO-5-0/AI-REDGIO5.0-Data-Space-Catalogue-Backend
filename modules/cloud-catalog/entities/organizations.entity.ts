import { Entity, OptionalProps, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuidV4 } from 'uuid';
import { Collection, OneToMany } from '@mikro-orm/core';
import { TrustLevel } from './trustLevel.entity';

@Entity({ tableName: 'organizations' })
export class Organizations {
  [OptionalProps]?: 'id' | 'createdAt' | 'updatedAt';

  @PrimaryKey()
  id: string = uuidV4();

  @Property()
  country!: number;

  @Property()
  name!: string;

  @Property()
  size!: number;

  @Property({nullable: true})
  category!: number;

  @Property()
  sector!: number;

  @Property()
  active!: boolean;

  @OneToMany(() => TrustLevel, (trust) => trust.source)
  givenTrustLevels = new Collection<TrustLevel>(this);

  @OneToMany(() => TrustLevel, (trust) => trust.target)
  receivedTrustLevels = new Collection<TrustLevel>(this);

  @Property({ type: 'timestamptz' })
  createdAt: Date = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}
