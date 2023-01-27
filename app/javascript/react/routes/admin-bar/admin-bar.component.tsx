// external imports
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

// internal imports
import { AdminContext } from "../../contexts/admin.context"

// api
import { logoutCurrentAdmin } from "../../utils/backend-api"

// styles
import { 
  AdminBarContainer,
  AdminLink,
  AdminButton
} from "./admin-bar.styles"

// component
const AdminBar = () => {
  // state
  const { admin, setAdmin } = useContext(AdminContext)

  // navigation
  const navigate = useNavigate()

  // logout handler
  const handleLogOut = async () => {
    const response = await logoutCurrentAdmin()
    setAdmin(null)
    navigate('/')
    location.reload()
  }

  // component elements
  return (
    admin &&
      <AdminBarContainer>
        <AdminLink to='new-project'>
          <AdminButton>
            New Project
          </AdminButton>
        </AdminLink>
        <AdminButton onClick={handleLogOut}>
          Log Out
        </AdminButton>
      </AdminBarContainer>
  )
}

export default AdminBar