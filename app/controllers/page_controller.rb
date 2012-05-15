class PageController < ApplicationController
	# before_filter :load_facebook, :only => [:selectable]
        before_filter :common_sel, :only => [:selectable, :user]
	include RestGraph::RailsUtil
	def unlogin

		render 'index_unlogin', :layout => false
	end
	def selectable
		render :layout => 'selectable'
	end
	def getEvent
		puts 'get lalala'
		response = {}
		# only task of 'this' user ??
		response[:taskname] = Task.all
		
		# puts response
		render json: response
	end
        def user
		render :layout => false, :action => :selectable
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
