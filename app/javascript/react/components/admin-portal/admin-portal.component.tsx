// external imports
import { useContext, useState } from "react"
// internal imports
import { AdminContext } from "../../contexts/admin.context"
import AdminForm from "../admin-form/admin-form.component"
import { FORM_TYPES } from "../admin-form/admin-form.component"
import { FormSwitch, PortalContainer } from "./admin-portal.styles"

// component
const AdminPortal = () => {
  // state
  const { admin } = useContext(AdminContext)
  const [ activeForm, setActiveForm ] = useState(FORM_TYPES.SIGNIN);
  const [ inactiveForm, setInactiveForm ] = useState(FORM_TYPES.SIGNUP);

  // onClick handler
  const switchForms = () => {
    if (activeForm === FORM_TYPES.SIGNIN) {
      setActiveForm(FORM_TYPES.SIGNUP)
      setInactiveForm(FORM_TYPES.SIGNIN)
    } else {
      setActiveForm(FORM_TYPES.SIGNIN)
      setInactiveForm(FORM_TYPES.SIGNUP)
    }
  }

  return (
    <PortalContainer>
      <AdminForm formType={ activeForm }/>
      { admin && <FormSwitch onClick={ switchForms }>{ inactiveForm }?</FormSwitch> }
    </PortalContainer>
  )
}

export default AdminPortal