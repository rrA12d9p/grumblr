Rails.application.routes.draw do

  root "grumbles#index"

  # Serving our single page app and resources
  resources :grumbles, :only => [:index]

  # Serving JSON regarding grumbles
  namespace :api do
    resources :grumbles, :except => [:new, :edit]
  end

end
