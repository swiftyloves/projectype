class Subtaskorder < ActiveRecord::Base
  attr_accessible :after_id, :subtask_id
  belongs_to :subtask
end
