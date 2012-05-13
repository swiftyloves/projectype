class ApplicationController < ActionController::Base
  include RestGraph::RailsUtil
  protect_from_forgery

protected
  def current_user
  	User.where(:account => session[:acc])
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
