// stimulus controller import
import { Controller } from "@hotwired/stimulus";

// external react imports
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"; // adds routing to child components
import { createBrowserHistory } from 'history';

// internal react imports
import { ProjectsProvider } from "../react/contexts/projects.context";
import { AdminProvider } from "../react/contexts/admin.context";
import App from "../react/App";

// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    // history object allows for client-side routing in deployment
    const history = createBrowserHistory();
    // get the 
    const app = document.getElementById('app');

    createRoot(app).render(
      // strict mode adds checks/warnings in development mode
      // disabled for react-beautiful-dnd functionality

      // <React.StrictMode>
        <BrowserRouter history={ history }>
          <AdminProvider>
            <ProjectsProvider>
              <App />
            </ProjectsProvider>
          </AdminProvider>
        </BrowserRouter> 
      // </React.StrictMode>
    );
  }
}
