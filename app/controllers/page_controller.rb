class PageController < ApplicationController
	def index
	end
	def selectable		
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
    def taskmode
		render 'taskmode', :layout => false
	end
end
