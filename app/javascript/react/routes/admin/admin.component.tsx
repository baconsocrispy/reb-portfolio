// external imports
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

// internal imports
import { AdminContext } from "../../contexts/admin.context"
import { PageContent } from "../../components/page-content/page-content.styles"
import AdminForm, { FORM_TYPES } from "../../components/admin-form/admin-form.component"
import AdminPortal from "../../components/admin-portal/admin-portal.component"

// component
const Admin = () => {
  // state
  const { admin } = useContext(AdminContext);
  // navigation
  const navigate = useNavigate();

  // if already logged in, reroute to home
  admin && navigate('/');

  // admin container holds form + form options (signup/signin)
  // has state to determine which option is selected

  return (
    <PageContent>
      <AdminPortal />
    </PageContent>
  )
}

export default Admin