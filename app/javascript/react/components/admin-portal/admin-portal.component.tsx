import AdminForm from "../admin-form/admin-form.component"
import { FORM_TYPES } from "../admin-form/admin-form.component"

const AdminPortal = () => {
  // admin portal holds form + form options (signup/signin)
  // has state to determine which option is selected
  return (
    <AdminForm formType={ FORM_TYPES.SIGNIN }/>
  )
}

export default AdminPortal