class PageController < ApplicationController
	# before_filter :load_facebook, :only => [:selectable]
    before_filter :common_sel, :only => [:selectable, :user]

	
    def sendmail
    	mail = params[:mail]
    	user = session[:current_name]
    	unless user
    		user = ""
    	end
    	#puts mail
    	require 'gmail_sender'
    	g = GmailSender.new("ProjecType@gmail.com","project123?")
		g.send(:to => mail,
		       :subject => "#{user} Invite you to use ProjecType!!",
		       :content => '''<p>Welcome to use Projectype to manage your project!!</p>
                                      <a href="http://projectype.heroku.com/home">http://projectype.heroku.com/home</a>''',
		       :content_type => 'text/html')
		render json: "succ"
    end

    def mail
    	    	
    end

	def unlogin
		render :layout => 'selectable'
	end
	def selectable
		render :layout => 'selectable'
	end
	def invite
		# @members = "#{Project.find_by_id(session[:]).users}"
		# @pic = "#{User.find_by_account(session[:current_user])['img']}"
		render :layout => 'home'
	end
	def getEvent
		puts 'get lalala'
		response = {}
		# only task of 'this' user ??
		response[:taskname] = Task.all
		
		# puts response
		render json: response
	end

    # call for ajax
    def user
  		render :layout => false, :action => :selectable
    end
    def welcome
    	render :layout => false, :action => :unlogin
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
