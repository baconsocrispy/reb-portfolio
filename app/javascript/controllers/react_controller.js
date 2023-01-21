import { Controller } from "@hotwired/stimulus";

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"; // adds routing to child components

import { ProjectsProvider } from "../react/contexts/projects.context";
import { AdminProvider } from "../react/contexts/admin.context";

import App from "../react/App";



// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    const app = document.getElementById('app');

    createRoot(app).render(
      // strict mode adds checks/warnings in development mode
      <React.StrictMode>
        <BrowserRouter>
          <AdminProvider>
            <ProjectsProvider>
              <App />
            </ProjectsProvider>
          </AdminProvider>
        </BrowserRouter> 
      </React.StrictMode>
    );
  }
}
