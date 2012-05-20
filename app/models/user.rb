class User < ActiveRecord::Base
  attr_accessible :account, :sameuser, :img
  has_many :participates, :dependent => :destroy, :after_remove => :check_has_participate
  has_many :projects, :through => :participates, :after_remove => :check_has_users

  has_many :assigns, :dependent => :destroy
  has_many :subtasks, :through => :assigns

  has_many :comments, :dependent => :destroy

  has_one :suser, :class_name => "User", :foreign_key => "sameuser"

  def check_has_users (proj)
    if proj.users.empty?
      proj.destroy
    end
  end
  def check_has_participate (participate)
    proj = Project.find(participate.project_id)
    if proj.users.empty?
      proj.destroy
    end
  end

end
