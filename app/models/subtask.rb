class Subtask < ActiveRecord::Base
  attr_accessible :dday, :description, :name, :sday, :task_id, :done
  belongs_to :task
  has_many :assigns, :dependent => :destroy
  has_many :users, :through => :assigns
  has_many :comments, :dependent => :destroy

  has_many :subtaskorders, :dependent => :destroy
  has_many :afters, :class_name => "Subtask", :through => :subtaskorders, :foreign_key => "after_id"
  has_many :inv_subtaskorders, :class_name => "Subtaskorder", :foreign_key => "after_id", :dependent => :destroy
  has_many :befores, :through => :inv_subtaskorders, :source => :subtask

  after_create :init 
  after_save :save_check

private
  def init
    self.done ||= false
    self.sday ||= Time.now.strftime("%Y-%m-%d")
    self.dday ||= Time.now.strftime("%Y-%m-%d")
    self.save
  end

  def save_check 
    if self.sday > self.dday
      self.sday = self.dday
      self.save
    end
    self.befores.each do |b|
      if (b.dday > self.sday)
        self.befores.delete(b)
      end
    end
    self.afters.each do |a|
      if (a.sday < self.dday)
        self.afters.delete(a)
      end
    end
  end
end
