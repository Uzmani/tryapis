# Set up gems listed in the Gemfile.
# See: http://gembundler.com/bundler_setup.html
#      http://stackoverflow.com/questions/7243486/why-do-you-need-require-bundler-setup
ENV['BUNDLE_GEMFILE'] ||= File.expand_path('../../Gemfile', __FILE__)

require 'bundler/setup' if File.exists?(ENV['BUNDLE_GEMFILE'])

# Require gems we care about
require 'rubygems'

require 'uri'
require 'pathname'

require 'pg'
require 'active_record'
require 'logger'

require 'sinatra'
require "sinatra/reloader" if development?

require 'erb'
require 'mini_magick'

# Some helper constants for path-centric logic
APP_ROOT = Pathname.new(File.expand_path('../../', __FILE__))

APP_NAME = APP_ROOT.basename.to_s

# Set up the controllers and helpers
Dir[APP_ROOT.join('app', 'controllers', '*.rb')].each { |file| require file }
Dir[APP_ROOT.join('app', 'helpers', '*.rb')].each { |file| require file }

# Set up the database and models
require APP_ROOT.join('config', 'database')

require 'oauth'
require 'yaml'

# var c = map.getCenter();

# window.content += "<% auth = YAML.load(File.open('auth.yaml')) %>
# <% consumer = OAuth::Consumer.new(auth['consumer_key'], auth['consumer_secret'], {:site => 'http://api.yelp.com'}) %>
# <% access_token = OAuth::AccessToken.new(consumer, auth['token'], auth['token_secret']) %>
# <% path = '/v2/search?term="+result.name+"&location=new%20york' %>
# <% access_token.get(path).body %>"