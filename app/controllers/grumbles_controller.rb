class GrumblesController < ApplicationController
  def index
  	@grumbles = Grumble.all
  end
end
