class AddPosToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :pos_x, :integer
    add_column :tasks, :pos_y, :integer
  end
end
