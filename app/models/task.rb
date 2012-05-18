class Task < ActiveRecord::Base
  attr_accessible :name, :project_id, :pos_x, :pos_y
  belongs_to :project
  has_many :subtasks, :dependent => :destroy
end
