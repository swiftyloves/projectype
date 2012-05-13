class TaskController < ApplicationController
  def taskmode
    render :layout => false
  end
  def test
    render :layout => "home", :action => :taskmode
  end
end
