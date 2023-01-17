## SETUP RAILS

Install rails with a Postgres db and use esbuild for javascript:

`rails new reb_portfolio -d postgresql -j esbuild`

cd into created folder and open project

open in vscode from command line with : `code . -r`

run `bundle install`

create the database: `rails db:create`

test everything works: `bin/dev`

## CREATE A STIMULUS CONTROLLER

Create a stimulus controller that will manage the React javascript:

`rails g stimulus react`

## CREATE A HOMEPAGE

Create a homepage controller:

`rails g controller pages home`

Set root route in config/routes.rb: 

Change `get 'pages/home'` to `root 'pages#home'`

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

## CREATE THE APP COMPONENT

Add a 'components' folder to the 'javascript' directory and create an 'app.jsx' file within.

use `rafce` snippet to auto-generate the app component code as a const functional component


## INITIALIZE REACT IN THE REACT CONTROLLER
The React stimulus controller's connect function is where the react root initialization lives in a rails 7 app. 

It basically serves as the index.js file in create-react-app.

Import React (imr) and createRoot: 
`import React from 'react'`
`import { createRoot } from 'react-dom/client'`

Import the App component from wherever it is housed

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
Using styled components within rails allows you to keep your styles in the same directory as the component. [I think].
`yarn add styled-components`

Add styled component types:

`yarn add --dev @types/styled-components`

## ADD JSON SERIALIZER FOR FORMATTING API RESPONSES 
I used the jsonapi-serializer gem, originally built by Netflix, which is supposed to have superior speed.
Documentation here: https://github.com/jsonapi-serializer/jsonapi-serializer

I had to manually add the gem to the gemfile and bundle install 
`gem 'jsonapi-serializer'`

The serializer itself gets saved in the app/serializers folder as project_serializer.rb
Documentation is clear.

## HELP FROM
* React w/Rails 7 Setup: https://www.youtube.com/watch?v=yoLJXjEV2nM
* TypeScript: https://www.strictmode.io/articles/setting-up-rails-7-for-typescript-and-react

## TO DO
* Find a way to have styled components class names show up in devtools
* Loading spinner for each route
* Add category sorting
* console errors reloading project pages
