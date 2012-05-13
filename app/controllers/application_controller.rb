class ApplicationController < ActionController::Base
  include RestGraph::RailsUtil
  protect_from_forgery

protected
  def current_user
  	User.where(:account => session[:acc])
  end

end
