class PageController < ApplicationController
	def index
	end
	def selectable
		render 'selectable', :layout => false
	end
end
