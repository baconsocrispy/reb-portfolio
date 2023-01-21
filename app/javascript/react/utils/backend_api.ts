// internal imports
import { ContactFormData } from "../components/contact-form/contact-form.component";
import { AdminFormData } from "../components/admin-form/admin-form.component";

// ------------ PROJECTS API ------------
// create a Project type from the json-serialized model
export type ProjectType = {
  id: string;
  type: string;
  attributes: {
    id: string;
    role: string;
    title: string;
    date: Date;
    client?: string;
    production_company?: string;
    agency?: string;
    project_url?: string;
    thumbnail_url?: string;
  }
}

// create a projectMap type representing the json response from the backend
export type ProjectMap = {
  data: ProjectType[] 
}

// api call to backend to retrieve all projects in the db
export const getProjectMap = async () => {
  const projectMapResponse = await fetch('projects.json');
  const projectMap: ProjectMap = await projectMapResponse.json();
  return projectMap 
}

// ------------ CONTACT API ------------

// api call to send a message from the contact page 
export const sendContactMessage = async (data: ContactFormData) => {
  const csrfToken = getCSRFToken()
  
  try {
    if (csrfToken) {
      // send a fetch request to the rails contact controller create action
      const response = await fetch('/contact_mailer', {
        method: 'POST',
        headers: { 
          'X-CSRF-Token': csrfToken,
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data)
      });
      // convert to json
      const json = await response.json();

      return json
    } else {
      // handle case where csrfToken is null or undefined
      return { success: false, message: 'Invalid csrf token' }
    }
  } catch (error) {
    console.log('Error sending email', error)
  }
}

// ------------ ADMIN API ------------

// get the current_admin object from rails backend
export const getCurrentAdmin = async () => {
  try {
    const response = await fetch('admin/get_admin')
    const json = await response.json()
    return json
  } catch (error) {
    console.log(error)
  }
}

export const logoutCurrentAdmin = async () => {
  const csrfToken = getCSRFToken()
  try {
    if (csrfToken) {
      const response = await fetch('admin/sign_out', {
        method: 'DELETE',
        headers: {
          'X-CSRF-Token': csrfToken,
          'Content-Type': 'application/json'
        }
        })
      const json = await response.json()
      return json
    }
  } catch (error) {
    console.log(error)
  }
}

export const createAdmin = async (data: AdminFormData) => {
  try {
    const createResponse = await adminPostRequest('admin', data)
    return createResponse
  } catch (error) {
    console.log(error)
  }
}

export const loginAdmin = async (data: AdminFormData) => {
  try {
    const response = await adminPostRequest('/admin/sign_in', data)
    console.log(response)
    return response
  } catch (error) {
    console.log('Error logging in admin', error)
  }
}

// ------------ API HELPERS ---------------
// get the rails csrf token from meta element to send in the request header
const getCSRFToken = () => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  return csrfToken;
}

// pass csrf token and adminFormData to backend Post urls and fetch/return data as json
const adminPostRequest = async (url: string, data: AdminFormData) => {
  console.log(data)
  const csrfToken = getCSRFToken()
  if (csrfToken) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-CSRF-Token': csrfToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        admin: data
      })
    })
    return response.json()
  }
}