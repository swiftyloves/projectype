class PageController < ApplicationController
	def index
	end
	def selectable
		render 'selectable', :layout => false
	end
    def taskmode
		render 'taskmode', :layout => false
	end
end
