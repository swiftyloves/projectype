class Comment < ActiveRecord::Base
  attr_accessible :ctime, :msg, :subtask_id, :user_id
  belongs_to :subtask
  belongs_to :user
end
