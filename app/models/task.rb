class Task < ActiveRecord::Base
  attr_accessible :name, :project_id, :pos_x, :pos_y, :done
  belongs_to :project
  has_many :subtasks, :dependent => :destroy

  before_create :init  
  def init
    self.done ||= false
  end

end
