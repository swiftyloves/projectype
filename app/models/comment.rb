class Comment < ActiveRecord::Base
  attr_accessible :ctime, :msg, :subtask_id, :user_id
end
