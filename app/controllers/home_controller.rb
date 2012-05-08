class HomeController < ApplicationController
  include RestGraph::RailsUtil
  before_filter :login_facebook, :only => [:fblogin]
  before_filter :load_facebook, :only => [:fblogout, :index, :ask]

  def index
    @appid = RestGraph.default_app_id
  end
  def ajax
  end
  def ajaxTest
    render :layout => false
  end
  def ajaxTest2
    render :layout => false
  end

  def fblogin
    render json: {:token => rest_graph.access_token}
  end

  def ask
    response = {}
    if params[:req] == 'appid'
      response[:addid] = RestGraph.default_app_id
    elsif params[:req] == 'testuser'
      # remeber to delete this
      response[:user] = User.find(1)
      response[:projects] = User.find(1).projects
      response[:tasks] = User.find(1).projects[0]
    end
    render json: response
  end

  def login
  end

  def fblogout
    reset_session
    render json: {}
  end

  private
  def load_facebook
    rest_graph_setup(:write_session => true)
  end

  def login_facebook
    rest_graph_setup(:auto_authorize         => true,
                     :auto_authorize_scope   => 'user_photos',
                     :ensure_authorized      => true,
                     :write_session          => true)
  end

end
