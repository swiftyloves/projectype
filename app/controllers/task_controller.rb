class TaskController < ApplicationController
  before_filter :common_sel
  def taskmode
    session[:current_proj] = params[:id]    
    render :layout => false
  end
  def loading
    @project = Project.find(session[:current_proj])
    @proj_users = @project.users
    @proj_tasks = @project.tasks
    #puts @proj_users[0].id
    #puts @proj_tasks.length
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
    @subtasks = sub
    tmp[:p] = @project
    tmp[:u] = @proj_users
    tmp[:t] = @proj_tasks.order("pos_y")   
    tmp[:s] = sub  #@subtasks.order("dday") 
    render json: tmp   
  end
  def test
     render :layout => 'home'
  end

  def savetask # name and position
      @project = Project.find(session[:current_proj])
      task = @project.tasks.create(:name=> params[:taskname] , :pos_x => params[:posx] , :pos_y => params[:posy])	         
      render json: task 
  end
  def deletetask
      @project = Project.find(session[:current_proj])
      @task = @project.tasks.where(:pos_x => params[:posx] , :pos_y => params[:posy])[0]
      @task.destroy
      
	  @project.tasks.where(:pos_x => params[:posx]).each do |task|
		   if (task.pos_y > params[:posy].to_i) 
		      task.pos_y = task.pos_y - 1	
              task.save	  
		   end
	  end
      render json: @project  
  end
  def renametask
      @project = Project.find(session[:current_proj])
      @task = @project.tasks.where(:pos_x => params[:posx] , :pos_y => params[:posy])[0]
      @task.name = params[:taskname]
      @task.save
      render json: @project  
  end
  def ordertask
      @project = Project.find(session[:current_proj])
      @task = @project.tasks.where(:pos_x => params[:oldposx] , :pos_y => params[:oldposy])[0]
      
      @project.tasks.where(:pos_x => params[:oldposx]).each do |task|          
          if (task.pos_y > params[:oldposy].to_i)
             puts task.name
             task.pos_y = task.pos_y-1
             task.save
             puts task.pos_y 
          end
      end  
      @project.tasks.where(:pos_x => params[:newposx]).each do |task|          
          if (task.pos_y >= params[:newposy].to_i)
             puts task.name
             task.pos_y = task.pos_y + 1
             task.save
             puts task.pos_y 
          end
      end 
      @task.pos_x = params[:newposx]
      @task.pos_y = params[:newposy]       
      @task.save 
      render json: @project  
  end 
  def savesubtask # name. task_id ?
      @project = Project.find(session[:current_proj])
      @task = @project.tasks.where(:pos_x => params[:posx] , :pos_y => params[:posy])[0]      
      @subtask = @task.subtasks.create(:name=> params[:subtaskname])    
      puts @subtask.id  
      render json: @subtask   
  end
  def renamesubtask
      @project = Project.find(session[:current_proj])
      @task = @project.tasks.where(:pos_x => params[:posx] , :pos_y => params[:posy])[0]
      @subtask = @task.subtasks.where(:id => params[:subtaskid])[0]
      @subtask.name = params[:subtaskname]      
      @subtask.save
      render json: @task  
  end
  def deletesubtask
      @project = Project.find(session[:current_proj])
      @task = @project.tasks.where(:pos_x => params[:posx] , :pos_y => params[:posy])[0]
      @subtask = @task.subtasks.where(:id => params[:subtaskname])[0]
      @task.subtasks.delete(@subtask) 
      @task.save
      render json: @task  
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

