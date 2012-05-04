class Subtaskdependency < ActiveRecord::Base
  attr_accessible :subtask_id, :after_id
  belongs_to :subtask
end
