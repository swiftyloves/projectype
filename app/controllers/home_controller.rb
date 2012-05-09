class HomeController < ApplicationController
  include RestGraph::RailsUtil
  include GP
  before_filter :login_facebook, :only => [:fblogin]
  before_filter :load_facebook, :only => [:ask, :fblogout, :index, :ask]
  before_filter :load_gp, :only => [:gpcallback, :ask, :index]
  before_filter :login_gp, :only => [:gplogin]

  @gp_setup = {
    :client_id => '887815355764.apps.googleusercontent.com',
    :client_secret => 'O_fNeR10ee68mKCLtA9Q_i1z',
    :scope => 'https://www.googleapis.com/auth/plus.me',
#   :redirect_uri => 'http://localhost:3000/gpback',
    :afterlogin => '/home'
  }

  def index
    @appid = RestGraph.default_app_id
    if @gp_client.authorization.access_token
      re = @gp_client.execute(
      @gp_plus.people.get,
      'userId' => 'me'
    )
    @img = JSON.parse(re.body)['image']['url']
    end
  end

  def gplogin
  end

  def gpcallback
    self.google_plus_callback
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
    elsif params[:req] == 'state'
      if @gp_client.authorization.access_token
        response[:gp] = {:state => true, :token => @gp_client.authorization.access_token}
      end
      if rest_graph.access_token
        response[:fb] = {:state => true, :token => rest_graph.access_token}
      end
    end
    render json: response
  end

  def logout
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

  def load_gp
    @gp_setup = {
      :client_id => '887815355764.apps.googleusercontent.com',
      :client_secret => 'O_fNeR10ee68mKCLtA9Q_i1z',
      :scope => 'https://www.googleapis.com/auth/plus.me',
#     :redirect_uri => 'http://localhost:3000/gpback',
      :afterlogin => '/home'
    }
    @gp_setup[:redirect_uri] = 'http://' + request.host_with_port + '/home/gpcallback'
    self.google_plus_load
  end
  def login_gp
    @gp_setup = {
      :client_id => '887815355764.apps.googleusercontent.com',
      :client_secret => 'O_fNeR10ee68mKCLtA9Q_i1z',
      :scope => 'https://www.googleapis.com/auth/plus.me',
#     :redirect_uri => 'http://localhost:3000/gpback',
      :afterlogin => '/home'
    }
    @gp_setup[:redirect_uri] = 'http://' + request.host_with_port + '/home/gpcallback'
    self.google_plus_login
  end

end
