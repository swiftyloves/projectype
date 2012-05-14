module GP
  require 'google/api_client'
  class TokenPair
    @refresh_token
    @access_token
    @expires_in
    @issued_at

    def update_token!(object)
      @refresh_token = object.refresh_token
      @access_token = object.access_token
      @expires_in = object.expires_in
      @issued_at = object.issued_at
    end

    def to_hash
      return {
        :refresh_token => @refresh_token,
        :access_token => @access_token,
        :expires_in => @expires_in,
        :issued_at => Time.at(@issued_at)
      }
    end
  end
  @gp_setup = {}
  @gp_client
  @gp_plus
  def google_plus_login
    self.google_plus_init
    redirect_to @gp_client.authorization.authorization_uri(:approval_prompt => :auto, :access_type => :online).to_s
  end
  def google_plus_callback
    self.google_plus_init
    @gp_client.authorization.fetch_access_token!
    token_pair = TokenPair.new
    token_pair.update_token!(@gp_client.authorization)
    # Persist the token here
    session[:token] = token_pair
  end
  def google_plus_load
    self.google_plus_init
    @gp_plus = @gp_client.discovered_api('plus', 'v1')
    if session[:token]  
      # Load the access token here if it's available
      @gp_client.authorization.update_token!(session[:token].to_hash)
    end
  end

  def google_plus_init
   @gp_client = Google::APIClient.new(
      :authorization => :oauth_2,
      :host => 'www.googleapis.com', 
    )   
    @gp_client.authorization.client_id = @gp_setup[:client_id]
    @gp_client.authorization.client_secret = @gp_setup[:client_secret]
    @gp_client.authorization.scope = @gp_setup[:scope]
    @gp_client.authorization.redirect_uri = @gp_setup[:redirect_uri]
    @gp_client.authorization.code = params[:code] if params[:code]
  end
end
