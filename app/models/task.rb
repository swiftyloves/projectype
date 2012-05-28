class Task < ActiveRecord::Base
  attr_accessible :name, :project_id, :pos_x, :pos_y, :done
  belongs_to :project
  has_many :subtasks, :dependent => :destroy

  after_create :init

private
  def init
    self.done ||= false
    self.save
  end

end
