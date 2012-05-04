class Subtask < ActiveRecord::Base
  attr_accessible :dday, :description, :name, :sday, :task_id
  belongs_to :task
  has_many :assigns, :dependent => :destroy
  has_many :users, :through => :assigns
  has_many :comments, :dependent => :destroy

  has_many :subtaskorders, :dependent => :destroy
  has_many :afters, :through => :subtaskorders
  has_many :inv_subtaskorders, :class_name => "Subtaskorder", :foreign_key => "after_id", :dependent => :destroy
  has_many :befores, :through => :inv_subtaskorders, :source => :subtask
end
