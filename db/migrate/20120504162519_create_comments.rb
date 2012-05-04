class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.date :time
      t.text :msg
      t.integer :user_id
      t.integer :subtask_id

      t.timestamps
    end
  end
end
