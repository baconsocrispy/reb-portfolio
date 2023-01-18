import { FormData } from "../components/contact-form/contact-form.component";

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

// primary api call to backend to retrieve all projects in the db
export const getProjectMap = async () => {
  const projectMapResponse = await fetch('projects.json');
  const projectMap: ProjectMap = await projectMapResponse.json();
  return projectMap 
}

export const sendContactMessage = async (data: FormData) => {
  // get the rails csrf token from meta element to send in the request header
  const csrf_token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')
  
  try {
    // send a fetch request to the rails contact controller create action
    const response = await fetch('/contact_mailer', {
      method: 'POST',
      headers: { 
        'X-CSRF-Token': csrf_token,
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(data)
    });
    // convert to json
    const json = await response.json();

    // if (json.success) {
    //   return json
    // } else {
    //   console.log('Error sending email:', json.error)
    // }
    return json
  } catch (error) {
    console.log('Error sending email', error)
  }
}