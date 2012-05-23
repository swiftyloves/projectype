class TaskController < ApplicationController
  before_filter :common_sel
  def taskmode
    session[:current_pid] = params[:id]
    render :layout => false
  end
  def test
     render :layout => 'home'
  end

  def query
      @project = Project.find(params[:id]) 
      puts @project
      @proj_users = @project.users
      @proj_tasks = @project.tasks
      puts @proj_users[0].id
      puts @proj_tasks.length
      tmp = {}      
      sub = []
      @proj_tasks.each do |t|                                 
         #task.append(t)  
         if(t.subtasks.length>0)   
            t.subtasks.each do |s|  
              sub.append(s)
            end  
         end           
      end 
      tmp[:p] = @project
      tmp[:u] = @proj_users
      tmp[:t] = @proj_tasks   
      tmp[:s] = sub    
      render json: tmp
      #render json: project #proj_users proj_tasks    
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

