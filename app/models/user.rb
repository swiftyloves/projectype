class User < ActiveRecord::Base
  attr_accessible :account, :sameuser, :img
  has_many :participates, :dependent => :destroy
  has_many :projects, :through => :participates

  has_many :assigns, :dependent => :destroy
  has_many :subtasks, :through => :assigns

  has_one :suser, :class_name => "User", :foreign_key => "sameuser"
end
