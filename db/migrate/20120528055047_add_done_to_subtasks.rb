class AddDoneToSubtasks < ActiveRecord::Migration
  def change
    add_column :subtasks, :done, :boolean
  end
end
