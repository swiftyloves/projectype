class Project < ActiveRecord::Base
  attr_accessible :name
  has_many :participates, :dependent => :destroy
  has_many :users, :through => :participates, :after_remove => :check_has_users

  has_many :tasks, :dependent => :destroy

  def check_has_users (user)
    if self.users.empty?
      self.destroy
    end
  end
end
