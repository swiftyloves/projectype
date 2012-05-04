class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :account
      t.integer :sameuser

      t.timestamps
    end
  end
end
