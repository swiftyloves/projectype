class CreateSubtasks < ActiveRecord::Migration
  def change
    create_table :subtasks do |t|
      t.string :name
      t.date :sday
      t.date :dday
      t.string :description
      t.integer :task_id

      t.timestamps
    end
  end
end
