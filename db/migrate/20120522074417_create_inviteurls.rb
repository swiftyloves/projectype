class CreateInviteurls < ActiveRecord::Migration
  def change
    create_table :inviteurls do |t|
      t.integer :project_id
      t.string :hashcode

      t.timestamps
    end
  end
end
