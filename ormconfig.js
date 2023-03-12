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
