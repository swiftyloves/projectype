class Project < ActiveRecord::Base
  attr_accessible :name
  has_many :participates, :dependent => :destroy
  has_many :users, :through => :participates

  has_many :tasks, :dependent => :destroy
end
