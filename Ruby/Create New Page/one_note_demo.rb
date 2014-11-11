require 'sinatra'
require 'sinatra/reloader'
require 'sinatra/flash'
require 'oauth2'
require 'time'

require './client_details'

enable(:sessions)

ONE_NOTE_API       = "https://www.onenote.com/api/v1.0/pages"
LIVE_SDK_OPTIONS   = { site: 'https://login.live.com', authorize_url: '/oauth20_authorize.srf', token_url: '/oauth20_token.srf'}
SCOPES             = 'wl.offline_access wl.signin office.onenote_create'

OAUTH_CLIENT       = OAuth2::Client.new(CLIENT_ID, CLIENT_SECRET, LIVE_SDK_OPTIONS)

OAUTH_REDIRECT_URI = 'http://www.onenotedemosite.com/redirect'
LIVE_LOGIN_URL     = OAUTH_CLIENT.auth_code.authorize_url(redirect_uri: OAUTH_REDIRECT_URI, scope: SCOPES)

get '/' do
  erb(:index) 
end

post '/create_note' do
  begin
    rendered_note = erb(:note, locals: { title: params[:title], body: params[:body] })

    access_token = OAuth2::AccessToken.new(OAUTH_CLIENT, session[ :token ]) 
    access_token.post( ONE_NOTE_API, body: rendered_note, headers: { 'content-type' => 'text/html' })
  rescue => error
    flash[:error] = error.message
  else
    flash[:notice] = "Note '#{title}' successufully posted to OneNote"
  end

  redirect(to('/'))
end

get '/redirect' do
  begin
    token_request = OAUTH_CLIENT.auth_code.get_token(params[:code], redirect_uri: OAUTH_REDIRECT_URI)
    session[:token] = token_request.token
  rescue => error
    flash[:error] = error.message
  end

  redirect(to('/'))
end

helpers do
  def logged_in?
    return false
    session[:token]
  end
end
