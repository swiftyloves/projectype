class PageController < ApplicationController
	# before_filter :load_facebook, :only => [:selectable]
    before_filter :common_sel, :only => [:selectable, :user]

	
    def sendmail
    	mail = params[:mail]
    	@name = session[:current_name]
        @proj = Project.find(session[:current_proj]).name
    	unless @name
    	       @name = ""
    	end
    	unless @proj
    	       @proj = ""
    	end

        # gen random sequence
        o =  [('a'..'z'),('A'..'Z')].map{|i| i.to_a}.flatten
        string  = (0..50).map{ o[rand(o.length)]}.join
        # get proj by params[:id] or session[:current_pid]
        proj = Project.find(session[:current_proj])
        proj.inviteurls.create(:hashcode => string)
        
        # clear timeout url
        Inviteurl.where("created_at <= '#{Time.now - 7*86400}'").each do |i|
          i.destroy
        end

        @url = "http://" + request.host_with_port + "/project/invite/" + string

    	mailcontent = render :file => "page/mail", :layout => false
    	mailcontent = mailcontent[0].to_s.sub("\\n", "")
    	puts mailcontent
    	#puts mail
    	require 'gmail_sender'
    	g = GmailSender.new("ProjecType@gmail.com","project123?")
		g.send(:to => mail,
		       :subject => "#{@name} Invite you to use ProjecType!!",
		       :content => mailcontent,
		       :content_type => 'text/html')
		# render json: "succ"
    end

    # use for test
    def mail    	
    end

    # 
    def usrmode_t
        @pacc = params[:projName]
        puts @pacc
        response = {}            
        @proj = Project.find_by_name(@pacc)
        @proj_users = @proj.users

        render json: @proj_users
    end

    def usrsub
        @pacc = params[:projName]
        @uacc = params[:uacc]
        @usr = User.find_by_account(@uacc)
        @proj = Project.find_by_name(@pacc)
        @tasks = @proj.tasks        
        tmp = {}
        sub = []
        @tasks.each do |t|
            t.subtasks.each do |s|
                s.users.each do |u|
                    puts u.account
                    puts @uacc
                    if u.account == @uacc                        
                        sub.append(s)
                    end
                end
            end
        end
        tmp[:u] = @usr
        tmp[:s] = sub 
        puts tmp
        render json: tmp
    end


    def j_hw6
        render :layout => 'home'
    end


	def unlogin
		render :layout => 'selectable'
	end
	def selectable
		render :layout => 'selectable'
	end

    def cal
        puts 'touch page#get !'
        # current proj/user/cowroker ?
        @usr = User.find_by_account(session[:current_user])
        @proj = Project.find_by_name(session[:current_proj])
        @tasks = @proj.tasks        
        tmp = {}
        sub = []
        @tasks.each do |t|
            t.subtasks.each do |s|
                s.users.each do |u|
                    puts u.account
                    puts @uacc
                    if u.account == @uacc                        
                        sub.append(s)
                    end
                end
            end
        end
        tmp[:u] = @usr
        tmp[:s] = sub 
        tmp[:e] = [2,3]
        render json: tmp
    end



	def invite
		# @members = "#{Project.find_by_id(session[:]).users}"
		# @pic = "#{User.find_by_account(session[:current_user])['img']}"
		render :layout => 'home'
	end
	def getEvent
		puts 'get lalala'
        puts params[:w]
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
