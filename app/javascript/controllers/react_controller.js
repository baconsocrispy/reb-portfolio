import { Controller } from "@hotwired/stimulus";

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom"; // adds routing to child components

import App from "../react/App";

// Connects to data-controller="react"
export default class extends Controller {
  connect() {
    const app = document.getElementById('app');

    createRoot(app).render(
      // strict mode adds checks/warnings in development mode
      <React.StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter> 
      </React.StrictMode>
    );
  }
}
