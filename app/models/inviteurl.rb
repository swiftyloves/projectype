class Inviteurl < ActiveRecord::Base
  attr_accessible :hashcode, :project_id
  belongs_to :project
end
