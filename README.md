## PROJECT OVERVIEW
This is a portfolio website for a Los Angeles based producer, designed to showcase her past work. 
It leverages Rails 7 to handle the backend and React 18 with TypeScript for the frontend. 
The production environment is deployed on Heroku. 
I elected to use React within Rails (rather than separate api) for ease of deployment.

## REQUIREMENTS
* Clean and simple responsive design for showcasing past video projects
* Admin section 
* Allows client to peform CRUD on projects
* Handles youtube video embed/thumbnail formatting from generic youtube link
* Drag-and-drop reorder projects 
* Activate/deactive projects that are displayed to public
* Contact section with messaging functionality and link out to social media
* About Me section 


## DEPENDENCIES
Rails 7 with ESBuild and Postgres
* Gems: Devise, jsonapi-serializer

React 18 Libraries: 
* react 
* react-dom 
* react-router-dom
* react-hook-form
* styled-components
* react-beautiful-dnd@npm:aligned-rbd (mod allows grid dnd)
* styled-react-modal

TypeScript
* @types/react
* @types/react-dom
* @types/react-router-dom
* @types/styled-components
* @types/react-beautiful-dnd
* @types/styled-react-modal

Fonts
* @fortawesome/fontawesome-svg-core
* @fortawesome/react-fontawesome
* @fortawesome/free-solid-svg-icons
* @fortawesome/free-regular-svg-icons

Heroku
* plugins:install heroku-builds (needed to clear Heroku build cache)

## RAILS SETUP

Install rails with a Postgres db and use esbuild for javascript:

`rails new reb_portfolio -d postgresql -j esbuild`

cd into created folder and open project

open in vscode from command line with : `code . -r`

run `bundle install`

create the database: `rails db:create`

test everything works: `bin/dev`

## CREATE A STIMULUS CONTROLLER

Create a stimulus controller that will manage the React javascript.
This operates as the index.js file would in a create-react-app.

`rails g stimulus react`

## CREATE A HOMEPAGE

Create a homepage controller:

`rails g controller pages home`

Set root route in config/routes.rb: 

Change `get 'pages/home'` to `root 'pages#home'`

To prevent rails from rerouting away from the homepage add the following as the last route:

`get '*path', to: 'pages#home'`

This sends all routes back to the homepage to allow react to handle routing.
Put any api json request routes before it. 

Add an anchor div to the homepage view with Rails content_tag and make sure to connect to the stimulus controller:

`<%= content_tag(:div, '', id: 'app', data: {controller: 'react'}) %>`

## ADD REACT LIBRARIES

`yarn add react react-dom react-router-dom`

also add `react-hook-form` if planning to create simple forms (i.e. contact form)

tell package.json to load js as jsx by adding the following flag to the end of the build script:

`--loader:.js=jsx`

if adding static images to the app, you need to add a loader for .png files as well

`loader:.png=dataurl`

You might need to restart server

## REACT FILE STRUCTURE
Create a `react` folder in `app/javascript`

Create the `App.tsx` component within this folder and import it into the react stimulus controller

Create `components`, `contexts`, `routes` and `utils` folders in the react directory as well.

* Components: stores all custom components and related styled components
* Contexts: stores contexts 
* Routes: stores route components and styles
* Utils: stores rails backend request logic and helpers (like youtube url formatting)

TIPS:
* use `rafce` snippet to auto-generate the app component code as a const functional component

## INITIALIZE REACT IN THE REACT CONTROLLER
The React stimulus controller's connect function is where the react root initialization lives in a rails 7 app. 

It basically serves as the index.js file in create-react-app.

Import React (imr) and createRoot: 
`import React from 'react'`
`import { createRoot } from 'react-dom/client'`

Import the App component from wherever it is housed (react folder)

In the connect() function in the react controller get the root div from the home page.

`const app = document.getElementById('app');`

Then initialize the react root element with this div and render the app component:

`createRoot(app).render(<App />);`

The app component should now appear in the homepage (rails root).

## CONFIGURE TYPESCRIPT
Add a tsconfig.json file to project root directory. Set include to point to the app/javascript folder.

You can auto-generate this file with:

`npx typescript -p tsc --init`

Add the react types:
`yarn add --dev @types/react @types/react-dom @types/react-router-dom`

To handle png types, create a `global.d.ts` file in the root directory
add the declaration below to the file:
`declare module '*.png';`

add the path to that file to the include object in the tsconfig file  

## ADD STYLED COMPONENTS
Using styled components within rails allows you to keep your styles in the same directory as the component.
`yarn add styled-components`

Add styled component types:

`yarn add --dev @types/styled-components`

## ADD JSON SERIALIZER FOR FORMATTING API RESPONSES 
I used the jsonapi-serializer gem, originally built by Netflix, which is supposed to have superior speed.

I had to manually add the gem to the gemfile and bundle install 
`gem 'jsonapi-serializer'`

The serializer itself gets saved in the app/serializers folder as project_serializer.rb
Documentation is clear.

Resources: 
* Documentation here: https://github.com/jsonapi-serializer/jsonapi-serializer
## SET AND LOAD ENVIRONMENT VARIABLES
I opted to create a custom `local_env.yml` file in the config folder and added env variables as key/value pairs
Then I added the code below to the `application.rb` file to load the variables on initialization

```
config.before_configuration do
  env_file = File.join(Rails.root, 'config', 'local_env.yml')
  YAML.load(File.open(env_file)).each do |key, value|
    ENV[key.to_s] = value
  end if File.exists?(env_file)
end
```

In Heroku production these need to be added as config vars under settings.

## HOSTING SETUP
To configure rails to send smtp emails via action_mailer I needed to configure `config.action_mailer.smtp_settings` as follows:
`address:              'smtpout.secureserver.net',`
`port:                 25,`
`domain:               'rebeccaeddybacon.com',`
`user_name:            ENV['ADMIN_EMAIL'],`
`password:             ENV['ADMIN_PASSWORD'],`
`authentication:       :login,`
`enable_starttls_auto: true,`
`open_timeout:         5,`
`read_timeout:         5 `

## ADDING DEVISE FOR AUTHENTICATION
Add the gem
`bundle add devise`

Install devise
`rails g devise:install`

In `config/initializers/devise.rb` uncomment and set navigation_formats to an empty array:
`config.navigational_formats = []`

Create User/Admin model: `rails g devise admin`

I added a column for username: 
`rails g migration AddUsernameToAdmins username:string`

Run migration `rails db:migrate`

Create sessions and registrations controllers
`rails g devise:controllers admins -c sessions registrations`

Tell the controllers to only repond with json format. 
At the head of each controller add:
`respond_to :json`

Serialize the admin model with jsonapi-serializer gem
`rails g serializer admin id email username created_at`

Setup controllers to handle json request/responses properly:
Registrations controller: 

```
class Admins::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private
  # need to explicitly tell the controllers to respond with json 
  # formatted per the below
  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: {
        status: {
          code: 200,
          message: 'Signup Success'
        },
        data: AdminSerializer.new(resource).serializable_hash[:data][:attributes]
      }
    else
      render json: {
        status: {
          message: "#{ 
            resource.errors.full_messages.to_sentence
          }",
          errors: resource.errors
        }
      }, status: :unprocessable_entity
    end
  end

  # needed to create custom params to allow username to be permitted
  # 'sign_up_params' is how Devise sends params to create method
  def sign_up_params
    params.require(:admin).permit(:email, :username, :password, :password_confirmation)
  end
end
```
I needed to override the default sessions create method.
I was getting a 401 Unauthorized error until implementing my own method. 
Sessions Controller:

```
class Admins::SessionsController < Devise::SessionsController
  respond_to :json
  # returns a serialized Admin object with current_admin attributes
  def get_admin
    if current_admin
      render json: {
        status: {
          code: 200
        },
        data: AdminSerializer.new(current_admin).serializable_hash[:data][:attributes] 
      }, status: :ok
    else
      render json: { 
        message: 'No current admin',
      }
    end
  end

  # overriding default devise create method
  def create
    # find admin by email
    @admin = Admin.find_by(email: sign_in_params[:email])
    return invalid_email_response unless @admin
    # verify password and login admin or return error response
    if @admin.valid_password?(sign_in_params[:password])
      sign_in :admin, @admin
      return sign_in_success_response(@admin)
    else
      return invalid_password_response
    end
  end

  private
  # PARAMS
  def sign_in_params
    params.require(:admin).permit :email, :password
  end

  # FORMATTED RESPONSE MESSAGES
  def invalid_email_response
    render json: {
      status: {
        code: 401,
        message: 'Invalid email or password',
        errors: 'Invalid email address'
      }
    }, status: :unauthorized
  end
  def invalid_password_response
    render json: {
      status: {
        code: 401,
        message: 'Invalid email or password',
        errors: 'Invalid password'
      }
    }, status: :unauthorized
  end
  def sign_in_success_response(admin)
    render json: {
      status: {
        code: 200,
        message: 'Admin logged in successfully'
      },
      data: AdminSerializer.new(admin).serializable_hash[:data][:attributes]
    }, status: :ok
  end

  def respond_to_on_destroy
    if current_admin.nil?
      render json: {
        status: 200,
        message: 'Admin logged out successfully'
      }, status: :ok
    else
      render json: {
        status: 422,
        message: 'Something went wrong, session still active'
      }, status: :unprocessable_entity
    end
  end
end
```

Resources:
* https://medium.com/@alessandrahagarty/using-devise-for-authentication-in-a-react-rails-app-f6a0eb87fbd5

## DRAG AND DROP / SORTING FUNCTIONALITY
I used the react-beautiful-dnd library to implement admin reordering of projects.

`yarn add react-beautiful-dnd`

It turns out react-beautiful-dnd does not play nicely with flexbox wrapped containers. 
I found this fork that provides a workaround when you add the `direction='grid'` prop to the droppable component:

`yarn add react-beautiful-dnd@npm:aligned-rbd`

There's still some wonky movement from components during drag though.

Conditionally disable functionality by passing `isDragDisabled` prop to draggable components.

Add types

`yarn add @types/react-beautiful-dnd`

resources: 
* https://github.com/atlassian/react-beautiful-dnd/issues/2396
* modded fork: https://github.com/NadavCohen/react-beautiful-dnd

## INSTALL FONT AWESOME FONTS

Using font awesome fonts for active status switching, edit and delete linking:

Base and React packages: 
`yarn add @fortawesome/fontawesome-svg-core @fortawesome/react-fontawesome --save`

Solid and Regular free icons:
`@fortawesome/free-solid-svg-icons @fortawesome/free-regular-svg-icons --save`

## STYLED REACT MODAL
Using styled-react-modal for 'are-you-sure' popups on delete.
`yarn add styled-react-modal`
`yarn add @types/styled-react-modal --dev`

Resources:
* https://www.npmjs.com/package/styled-react-modal

## TROUBLESHOOTING HEROKU

### Clearing Build Cache & Application.js Not Found Error
After creating and pushing a new admin portal to Heroku, the new `/admin` path could not be found.
Everything was working fine in localhost. For a long time I thought it was an issue
with the BrowserRouter and routing problems. 

Over time I got the sense that my changes were not getting pushed to Heroku for some reason.
I used `heroku run bash` to cd into the file structure to ensure my files were showing up.
All the new admin files were there, so I explored whether Heroku has issues with caching and serving old builds. 
It seems it does.

I put some obvious test spans on the homepage and they didn't appear on deployment which suggested this was the cause.
I followed these steps to clear Heroku's build cache:

Install plugin:
`heroku plugins:install heroku-builds`
Clear the builds cache:
`heroku builds:cache:purge -a reb-portfolio`
Push main branch back to Heroku. (I had to force push).
`git push -f heroku main`

Then I got an ActionView Template Error from rails on rebuild that `application.js` was not present in the pipeline.

To resolve this issue, in `environments/production.rb` I set:

`config.assets.compile = true`

After recommitting, repushing and `heroku restart` ing I finally had the site working properly. 

Resources
* https://help.heroku.com/18PI5RSY/how-do-i-clear-the-build-cache

## NEEDS FIXING
Non-critical
* Refactor all buttons to just take a button type
* Default settings for components with style variables
* Hover effect for project previews
* Create types for submitResponse and any apis that are returning 'any' types
* Refactor SubmitStatus type to be BackendResponse type
* Make all forms more generic
* refactor contact message to pass params to send_email instead of breaking out params in controller
* make sure forms are sending null instead of empty strings
* Find a way to have styled components class names show up in devtools (Requires Babel configuration with ESBuild)
* Log user errors
* Tests
* Navigation/AdminBar to components not routes
* Display thumbnail in projectform after url is entered
* Restyle mobile about page bio
* NotFound shows briefly on project page after new project creation as the id only goes in db after page refresh
* Also shows briefly when reloading new and edit forms

## MORE HELP FROM
* React w/Rails 7 Setup: https://www.youtube.com/watch?v=yoLJXjEV2nM
* TypeScript: https://www.strictmode.io/articles/setting-up-rails-7-for-typescript-and-react
