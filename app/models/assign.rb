class Assign < ActiveRecord::Base
  attr_accessible :subtask_id, :user_id
  belongs_to :user
  belongs_to :subtask
end
