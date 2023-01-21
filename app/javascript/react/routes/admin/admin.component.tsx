import { PageContent } from "../../components/page-content/page-content.styles"

import { FORM_TYPES } from "../../components/admin-form/admin-form.component"
import AdminForm from "../../components/admin-form/admin-form.component"

const Admin = () => {
  return (
    <PageContent>
      <AdminForm formType={ FORM_TYPES.SIGNUP }/>
      <AdminForm formType={FORM_TYPES.SIGNIN} />
    </PageContent>
  )
}

export default Admin