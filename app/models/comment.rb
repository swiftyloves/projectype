class Comment < ActiveRecord::Base
  attr_accessible :msg, :subtask_id, :time, :user_id
  belongs_to :subtask
  belongs_to :user
end
