// external imports
import { useState } from "react"
// internal imports
import AdminForm from "../admin-form/admin-form.component"
import { FORM_TYPES } from "../admin-form/admin-form.component"
import { FormSwitch, PortalContainer } from "./admin-portal.styles"

// component
const AdminPortal = () => {
  // state
  const [ activeForm, setActiveForm ] = useState(FORM_TYPES.SIGNIN);
  const [ inactiveForm, setInactiveForm ] = useState(FORM_TYPES.SIGNUP);

  // onClick handler
  const switchForms = () => {
    activeForm === FORM_TYPES.SIGNIN ?
      setActiveForm(FORM_TYPES.SIGNUP) : setActiveForm(FORM_TYPES.SIGNIN)

    inactiveForm === FORM_TYPES.SIGNUP ? 
      setInactiveForm(FORM_TYPES.SIGNIN) : setInactiveForm(FORM_TYPES.SIGNUP)
  }

  return (
    <PortalContainer>
      <AdminForm formType={ activeForm }/>
      <FormSwitch onClick={ switchForms }>{ inactiveForm }?</FormSwitch>
    </PortalContainer>
  )
}

export default AdminPortal