// external imports
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

// internal imports
import { AdminContext } from "../../contexts/admin.context"
import { PageContent } from "../../components/page-content/page-content.styles"
import AdminPortal from "../../components/admin-portal/admin-portal.component"

// component
const Admin = () => {
  // state
  const { admin } = useContext(AdminContext);
  // navigation
  const navigate = useNavigate();
  // if already logged in, reroute to home
  admin && navigate('/');

  return (
    <PageContent>
      <AdminPortal />
    </PageContent>
  )
}

export default Admin