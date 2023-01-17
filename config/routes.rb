Rails.application.routes.draw do
  # constraints(format: :json) do
  #   resources :projects
  # end
  root 'pages#home'

  resources :projects
  
  post '/contact_mailer', to: 'contact#create'

  # intercepts route requests other than backend api (/projects) and 
  # rereoutes to the homepage so that react can handle frontend routing
  get '*path', to: 'pages#home'
end
