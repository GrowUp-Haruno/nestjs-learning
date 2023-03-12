# Postgres へのマイグレーション手順

1. ./ormconfig.js に下記のオブジェクトを用意する

```js:ormconfig.js
module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  username: 'postgres',
  password: 'postgres',
  autoLoadEntities: true,
  entities: ['dist/entities/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    entitiesDir: 'src/entries',
    migrationsDir: 'src/migrations',
  },
};
```

2. entity ファイルを作成する

```ts:item.entity.ts
import { ItemStatus } from 'src/items/item-status.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  status: ItemStatus;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;
}
```

3. typeorm cli を実行してマイグレーションファイルを作成する

`yarn typeorm migration:generate -n CreateItem `を実行
src/migrations にマイグレーションファイルが作成される

4. マイグレーションファイルをコンパイル

`start:dev`を実行すると自動的にコンパイルが行われる

5. マイグレーションを実行して Postgres 側にテーブルを作成する

`yarn typeorm migration:run`を実行
