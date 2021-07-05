
exports.up = function(knex, Promise) {
    return knex.schema
    .createTable("projects", tbl => {
        //unique id/primary key
        tbl.increments();
        tbl
            .string("name", 128)
            .notNullable()
            .unique();
        tbl
            .string("description", 128)
            .notNullable()
            .unique();
        tbl
            .boolean("completed")
            .notNullable()
    })
    .createTable('actions', tbl => {
        //unique id/primary key
        tbl.increments();
        tbl
            .string("description", 128)
            .notNullable()
            .unique();
        tbl
            .string("notes", 250)
            .notNullable()
            .unique();
        tbl
            .boolean("completed")
             .notNullable()
        tbl
            .integer('project_id')
            .unsigned()
            .references('id')
            .inTable('projects')
            .onDelete('CASCADE') // explain how cascading works
            .onUpdate('CASCADE');
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("projects")
    .dropTableIfExists("actions");
    ;
};
