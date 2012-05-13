class ProjectController < ApplicationController
  def index
    render :layout => false
  end
  def test
    render :layout => "home", :action => :index
  end
end
