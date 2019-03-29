
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('actions').insert([
  {id: 1,
    description: 'action description',
    notes: 'the action notes',
    completed: false,
    project_id: 1
  } // or true, the database will return 1 for true and 0 for false
  ])
};
