class ProjectController < ApplicationController
  def index
    render :layout => false
  end
  def test
    render :layout => "home", :action => :index
  end
  def add
    ret = {}
    if session[:current_user]
      user = User.find_by_account(session[:current_user])
      proj = user.projects.create(:name => params[:name])
      ret[:id] = proj.id
    elsif
      ret[:id] = -1
    end
    render json: ret
  end
  def delete
    ret = {}
    if session[:current_user]
      user = User.find_by_account(session[:current_user])
      proj = user.projects.find(params[:id])
      if proj
        user.projects.delete(proj)
        ret[:state] = "succ"
      end
    elsif
      ret[:state] = "succ"
    end
    render json: ret
  end
  def edit
    ret = {}
    if session[:current_user]
      user = User.find_by_account(session[:current_user])
      proj = user.projects.find(params[:id])
      if proj
        proj.name = params[:name]
        proj.save
        ret[:state] = "succ"
      end
    elsif
      ret[:state] = "succ"
    end
    render json: ret
  end
  def participate
    unless session[:current_user]
      render :fail, :layout => false
      return
    end
    url = Inviteurl.find_by_hashcode(params[:hash])
    unless url
      render :nofound, :layout => false
      return
    end
    # TODO: clear garbage
    user = User.find_by_account(session[:current_user])
    unless user.projects.exists?(url.project)
      user.projects << url.project
    end
    url.destroy
    redirect_to '/home'
  end
end
