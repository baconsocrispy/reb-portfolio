// external imports
import { ReactNode, createContext, useState, useEffect } from "react";
// internal imports
import { getCurrentAdmin } from "../utils/backend_api";

// types
export type Admin = {
  id: number;
  username: string;
  email: string;
  created_at: Date;
}

type AdminContextProps = {
  admin: Admin | null;
  setAdmin: Function;
}

type AdminProviderProps = {
  children: ReactNode
}

// context
export const AdminContext = createContext<AdminContextProps>({
  admin: null,
  setAdmin: () => null
})

// provider
export const AdminProvider = ({ children }: AdminProviderProps) => {
  const [ admin, setAdmin ] = useState<Admin | null>(null)

  // fetch current_admin from backend (sessions controller). 
  // if response has no data attribute, set admin to null
  useEffect(() => {
    const setCurrentAdmin = async () => {
      const { data: adminData } = await getCurrentAdmin()
      adminData ? setAdmin(adminData) : setAdmin(null)
    }
    setCurrentAdmin()
  }, [])
  
  const value = { admin, setAdmin };

  return <AdminContext.Provider value={ value }>{children}</AdminContext.Provider>
}