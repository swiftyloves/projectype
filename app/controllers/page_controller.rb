class PageController < ApplicationController
	def index
	end
	def selectable		
		render 'selectable', :layout => false		
	end
	def getEvent
		puts 'get lalala'
		# if params[:req] == 'getEvent'
		response = {}
		response[:taskname] = Task.all
		# only task of 'this' user ??
		# end
		# puts response
		render json: response
	end
end
