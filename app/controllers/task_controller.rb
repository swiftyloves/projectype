class TaskController < ApplicationController
  before_filter :common_sel
  def taskmode
    render :layout => false
  end
  def test
    render :layout => "home", :action => :taskmode
  end

private
        def common_sel
            if session[:current_user]	
		        @pic = "#{User.find_by_account(session[:current_user])['img']}"
                if session[:current_user][0] == 'g'
                    @pic += "?sz=50"
                end
            end
        end
end

