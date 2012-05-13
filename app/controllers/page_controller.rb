class PageController < ApplicationController
	before_filter :load_facebook, :only => [:selectable]

	def index
	end
	def selectable				
		@s = session[:current_user]
		@pic = "#{User.find_by_account(session[:current_user])['img']}/?access_token=#{rest_graph.access_token}"		
		render 'selectable', :layout => false
	end
	def getEvent
		puts 'get lalala'
		response = {}
		# only task of 'this' user ??
		response[:taskname] = Task.all
		
		# puts response
		render json: response
	end
end
