/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('events', (table) => {
    table.increments('id')
    table.string('name')
    table.string('host')
    table.string('bio')
    table.string('dates')
    table.string('location')
    table.string('price')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('events')
}
