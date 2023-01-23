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
  try {
    const contactResponse = backendRequest('POST', '/contact_mailer', data)
    return contactResponse
  } catch (error) {
    console.log('Error sending message', error)
  }
}

// ------------ ADMIN API ------------
// get the current_admin object from rails backend
export const getCurrentAdmin = async () => {
  try {
    const getAdminResponse = await fetch('admin/get_admin')
    return getAdminResponse.json()
  } catch (error) {
    console.log('Error getting admin', error)
  }
}
// create a new admin
export const createAdmin = async (data: AdminFormData) => {
  try {
    const createResponse = await backendRequest('POST', 'admin', data)
    return createResponse
  } catch (error) {
    console.log('Error creating new admin', error)
  }
}
// login an admin
export const loginAdmin = async (data: AdminFormData) => {
  try {
    const loginResponse = await backendRequest('POST', '/admin/sign_in', data)
    return loginResponse
  } catch (error) {
    console.log('Error logging in admin', error);
  }
}
// logout admin
export const logoutCurrentAdmin = async () => {
  try {
    const logoutResponse = await backendRequest('DELETE', 'admin/sign_out', null);
    location.reload();
    return logoutResponse;
  } catch (error) {
    console.log('Error logging out', error);
  }
}

// ------------ API HELPERS ---------------
// get the rails csrf token from meta element to send in the request header
const getCSRFToken = () => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
  return csrfToken;
}

// configures and sends backend POST/DELETE requests
const backendRequest = async (
  method: string, 
  url: string, 
  data: AdminFormData | ContactFormData | null
) => {
  const csrfToken = getCSRFToken()
  if (csrfToken) {
    const response = await fetch(url, {
      method: method,
      headers: {
        'X-CSRF-Token': csrfToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }
}