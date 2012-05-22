class HomeController < ApplicationController  
  include GP
  include RestGraph::RailsUtil
  before_filter :login_facebook, :only => [:fblogin]
  before_filter :load_facebook, :only => [:ask, :fblogout, :index, :ask]
  before_filter :load_gp, :only => [:gpcallback, :ask, :index]
  before_filter :login_gp, :only => [:gplogin]

  # gp img + ?sz=100 (100 is size)
  # fb img + ?type=large

  def index
    @appid = RestGraph.default_app_id
    if session[:current_user]
      @img = User.find_by_account(session[:current_user])['img']
      if session[:current_user][0] == 'g'
        @img += "?sz=50"
      end   
    end
  end

  def gplogin
  end

  def gpcallback
    self.google_plus_callback
    re = @gp_client.execute(
      @gp_plus.people.get,
      'userId' => 'me'
    )
    profile = JSON.parse(re.body)
    acc = 'g@' + profile['id']  
    session[:current_user] = acc
    session[:current_name] = profile['displayName']
    if User.where(:account => acc).size == 0
      img = profile['image']['url'].match("(.*)(\\?)")[1];
      a = User.new(:account => acc, :img => img)
      a.save
    end
    # profile['image']['url']
    redirect_to '/home/'
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
    me = rest_graph.get('/me')
    id = me['id']
    acc = 'f@' + id
    session[:current_user] = acc
    session[:current_name] = me['name']
    if User.where(:account => acc).size == 0
      puts "lalala"
      a = User.new(:account => acc, :img => "https://graph.facebook.com/#{id}/picture")
      puts "lalala2"
      if a.save
        puts "save successful"
      else
        puts "save failed"
      end
    end
    # https://graph.facebook.com/id/picture
    # render json: {:token => rest_graph.access_token}
    redirect_to '/home/'
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
      response[:current_user] = session[:current_user]
      response[:current_name] = session[:current_name]
    elsif params[:req] == 'user'
      response[:user] = User.where(:account => params[:acc])
    end
    render json: response
  end

  def logout
    reset_session
    render json: {}
  end
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
    }
    @gp_setup[:redirect_uri] = 'http://' + request.host_with_port + '/home/gpcallback'
    self.google_plus_load
  end
  def login_gp
    @gp_setup = {
      :client_id => '887815355764.apps.googleusercontent.com',
      :client_secret => 'O_fNeR10ee68mKCLtA9Q_i1z',
      :scope => 'https://www.googleapis.com/auth/plus.me',
    }
    @gp_setup[:redirect_uri] = 'http://' + request.host_with_port + '/home/gpcallback'
    self.google_plus_login
  end
end
