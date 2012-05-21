class SubtaskController < ApplicationController
  def query
    #ret = {}
    subtask = Subtask.find(params[:id])
    #ret[:id] = subtask.id
    #ret[:sday] = subtask.sday
    #ret[:dday] = subtask.dday
    #ret[:description] = subtask.description
    #task = subtask.task
    #ret[:parent] = task.id
    #render json: ret
    render json: subtask
  end

  def order
    ret = {}
    task = Task.find(params[:id])
    arr = []
    task.subtasks.each { |s|
      tmp = {}
      tmp[:subtask] = s
      tmp2 = []
      s.afters.each { |a|
        tmp2.insert(0, a.id)
      }
      tmp[:after] = tmp2
      arr.insert(0, tmp)
    }
    ret[:order] = arr
    render json: ret
  end

  def test
    render :layout => 'home'
  end
end
