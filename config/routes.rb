Rails.application.routes.draw do
  root 'pages#home'

  resources :projects

  # intercepts route requests other than backend api (/projects) and 
  # rereoutes to the homepage so that react can handle frontend routing
  get '*path', to: 'pages#home'
end
