Rails.application.routes.draw do
  root 'pages#home'

  # authentication routes
  devise_for :admins, path: 'admin',
    controllers: {
      sessions: 'admins/sessions',
      registrations: 'admins/registrations'
    }

  devise_scope :admin do 
    get '/admin/get_admin', to: 'admins/sessions#get_admin'
  end

  # api routes for managing project CRUD
  resources :projects

  # routes for updating project sort order & active status
  patch '/projects', to: 'projects#update_projects'
  patch '/projects/:id/update_active_status', to: 'projects#update_active_status'
  
  # fetch call from react backend_api sendContactMessage method
  post '/contact_mailer', to: 'contact#create'

  # intercepts route requests other than backend api (/projects) and 
  # rereoutes to the homepage so that react can handle frontend routing
  get '*path', to: 'pages#home'
end
