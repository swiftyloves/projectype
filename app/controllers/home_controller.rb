class HomeController < ApplicationController  
  include GP
  before_filter :login_facebook, :only => [:fblogin]
  before_filter :load_facebook, :only => [:ask, :fblogout, :index, :ask]
  before_filter :load_gp, :only => [:gpcallback, :ask, :index]
  before_filter :login_gp, :only => [:gplogin]

  def index
    @appid = RestGraph.default_app_id
    if @gp_client.authorization.access_token
      re = @gp_client.execute(
        @gp_plus.people.get,
        'userId' => 'me'
      )
      @img = JSON.parse(re.body)['image']['url']
    elsif rest_graph.access_token
      id = rest_graph.get('/me')['id']
      @img = 'https://graph.facebook.com/' + id + '/picture'
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
    if User.where(:account => acc).size == 0
      a = User.new(:account => acc, :img => profile['image']['url'])
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
    id = rest_graph.get('/me')['id']
    acc = 'f@' + id
    session[:current_user] = acc
  # User.get_by_account
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
      response[:current_user] = session[:current_user]
    elsif params[:req] == 'user'
      response[:user] = User.where(:account => params[:acc])
    end
    render json: response
  end

  def logout
    reset_session
    render json: {}
  end



end
