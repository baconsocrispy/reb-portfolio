import AdminForm from "../admin-form/admin-form.component"
import { FORM_TYPES } from "../admin-form/admin-form.component"

const AdminPortal = () => {
  return (
    <AdminForm formType={ FORM_TYPES.SIGNIN }/>
  )
}

export default AdminPortal