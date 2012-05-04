class CreateSubtaskdependencies < ActiveRecord::Migration
  def change
    create_table :subtaskdependencies do |t|
      t.integer :subtask_id
      t.integer :after_id

      t.timestamps
    end
  end
end
