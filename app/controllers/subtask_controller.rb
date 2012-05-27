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
      tmp.insert(0, obj);
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
    task.subtasks.each { |s|
      tmp = {}
      tmp[:subtask] = s
      tmp2 = []
      s.afters.each { |a|
        tmp2.insert(0, a.id)
      }
      tmp[:after] = tmp2
      arr.insert(0, tmp)
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
    @id = params[:id]
    render :layout => false
  end

  def cardTest
    render :layout => 'home'
  end

end
