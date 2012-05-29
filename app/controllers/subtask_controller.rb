class SubtaskController < ApplicationController
  def query
    ret = {}
    subtask = Subtask.find(params[:id])
    ret[:subtask] = subtask
    tmp = []
    subtask.comments.order("created_at").each do |c|
      obj = {}
      obj[:uid] = c.user.id
      obj[:img] = c.user.img
      obj[:msg] = c.msg
      tmp.insert(-1, obj);
    end
    ret[:comment] = tmp
    ret[:mem] = subtask.users
    ret[:user] = subtask.task.project.users
    render json: ret
  end

  def order
    ret = {}    
    task = Task.find(params[:id])
    ret[:task] = task
    arr = []
    min = nil
    max = nil
    task.subtasks.order("sday").each { |s|
      tmp = {}
      tmp[:subtask] = s
      tmp2 = []
      s.afters.each { |a|
        tmp2.insert(-1, a.id)
      }
      tmp[:after] = tmp2
      arr.insert(-1, tmp)
      if !min
        min = s.sday
        max = s.dday
      else
        if min > s.sday
          min = s.sday
        end
        if max < s.dday
          max = s.dday
        end
      end
    }
    ret[:order] = arr
    ret[:sday] = min
    ret[:dday] = max
    render json: ret
  end

  def test
    render :layout => 'home'
  end

  def card
    @id = params[:id]
    render :layout => false
  end
  
  def bigCard
    if params[:id]
      @id = params[:id]
    else
      proj = Project.find(session[:current_proj])
      task = proj.tasks.where(:pos_x => params[:x], :pos_y => params[:y])[0]
      @id = task.id
    end
    render :layout => false
  end

  def cardTest
    render :layout => 'home'
  end

  def edit
    subtask = Subtask.find(params[:id])
    if subtask
      if params[:uid]
        subtask.users << User.find(params[:uid])
      end
      if params[:sday] # check if break dependency
        subtask.sday = params[:sday]
      end
      if params[:dday]
        subtask.dday = params[:dday]
      end
      if params[:duid]
        subtask.users.delete(User.find(params[:duid]))
      end
      if params[:desc]
        subtask.description = params[:desc]
      end
      if params[:afterid]
        subtask.afters << Subtask.find(params[:afterid])
        Subtaskorder.new(:subtask_id => params[:id], :after_id => params[:after]).save
      end
      if params[:dafterid]
        subtask.afters.delete(Subtask.find(params[:dafterid]))
      end
      subtask.save
    end
    render json: ""
  end

  def comment
    if session[:current_user] && params[:id] && params[:text]
      user = User.find_by_account(session[:current_user])
      user.comments.create(:subtask_id => params[:id], :msg => params[:text])
    end
    render json: ""
  end
end
