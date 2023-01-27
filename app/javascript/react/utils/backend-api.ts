import { ContactFormData } from "../components/contact-form/contact-form.component";
import { AdminFormData } from "../components/admin-form/admin-form.component";
import { ProjectFormData } from "../components/project-form/project-form.component";

// ------------ PROJECTS API ------------
// types mapped to project json 
export type ProjectType = {
  id: string;
  type: string;
  attributes: {
    id: string;
    role: string;
    title: string;
    date: string;
    client?: string;
    production_company?: string;
    agency?: string;
    project_url?: string;
    thumbnail_url?: string;
    active_status: boolean;
  }
}

export type ProjectMap = {
  data: ProjectType[] 
}

export type ProjectIds = {
  projectIds: string[]
}

// create a new project
export const createProject = async (data:ProjectFormData) => {
  try { 
    const createProjectResponse = await backendRequest('POST', '/projects', data);
    return createProjectResponse;
  } catch (error) {
    console.log('Error creating new project', error);
  }
}

// get all projects
export const getProjectMap = async () => {
  const projectMapResponse = await fetch('/projects.json');
  const projectMap: ProjectMap = await projectMapResponse.json();
  return projectMap;
}

// update a project
export const updateProject = async (data: ProjectFormData) => {
  const projectId = data.project.id;
  console.log(data)
  const updateProjectResponse = await backendRequest('PATCH', `/projects/${ projectId }`, data);
  return updateProjectResponse;
}

// delete a project
export const deleteProject = async (id: string) => {
  const deleteResponse = await backendRequest('DELETE', `/projects/${ id }`, null)
  return deleteResponse
}

// update project's sort order
export const updateProjectSortOrder = async (projectIds: ProjectIds) => {
  const response = await backendRequest('PATCH', '/projects', projectIds)
}

// update project's active status
export const updateProjectActiveStatus = async (projectId: string) => {
  try {
    const statusResponse: boolean = await backendRequest(
      'PATCH', `projects/${projectId}/update_active_status`, null
    )
    return statusResponse
  } catch (error) {
    console.log('Error updating project\'s active status', error)
  }
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
    const getAdminResponse = await fetch('/admin/get_admin')
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
    const logoutResponse = await backendRequest('DELETE', '/admin/sign_out', null);
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

// configures and sends backend POST/PATCH/DELETE requests
const backendRequest = async (
  method: string, 
  url: string, 
  data: AdminFormData | ContactFormData | ProjectIds | ProjectFormData | null
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

// ------------ PROJECT HELPERS ------------ 
// reorders and returns a new project array according to new sort order
export const reorderProjects = (projects: ProjectType[], newProjectIds: string[]) => {
  const newProjects: ProjectType[] = [];
  newProjectIds.map((id) => {
    projects.find((project) => {
      if (project.id === id) newProjects.push(project);
    })
  })
  return newProjects
}