class Subtask < ActiveRecord::Base
  attr_accessible :dday, :description, :name, :sday, :task_id
  belongs_to :task
  has_many :assigns
  has_many :users, :through => :assigns
  has_many :comments, :dependent => :destroy

  has_many :subtaskdependencys, :dependent => :destroy
  has_many :afters, :through => :subtaskdependencys
  has_many :inv_subtaskdependencys, :class_name => "Subtaskdependency", foreign_key => "after_id", :dependent => :destroy
  has_many :befores, :through => :inv_subtaskdependencys, :source => :subtask
end
