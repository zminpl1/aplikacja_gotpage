"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { authAPI, usersAPI } from "@/lib/api"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [initialized, setInitialized] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  // Load user from localStorage on initial load
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Check if token exists in localStorage
        const token = localStorage.getItem("token")

        if (token) {
          // Fetch current user data
          const response = await authAPI.getMe()
          setUser(response.data.data)
        }
      } catch (error) {
        console.error("Failed to load user:", error)
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      } finally {
        setLoading(false)
        setInitialized(true)
      }
    }

    loadUser()
  }, [])

  // Register user
  const register = async (userData) => {
    setLoading(true)
    try {
      const response = await authAPI.register(userData)

      // Save token to localStorage
      localStorage.setItem("token", response.data.token)

      // Fetch user data
      const userResponse = await authAPI.getMe()
      setUser(userResponse.data.data)

      // Show success message
      toast({
        title: "Success",
        description: "Registration successful!",
      })

      // Redirect to home page
      router.push("/")

      return userResponse.data.data
    } catch (error) {
      const message = error.response?.data?.message || "Registration failed"
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Login user
  const login = async (credentials) => {
    setLoading(true)
    try {
      const response = await authAPI.login(credentials)

      // Save token to localStorage
      localStorage.setItem("token", response.data.token)

      // Set user data
      setUser(response.data.user)

      // Show success message
      toast({
        title: "Success",
        description: "Login successful!",
      })

      // Redirect to home page
      router.push("/")

      return response.data.user
    } catch (error) {
      const message = error.response?.data?.message || "Login failed"
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Logout user
  const logout = async () => {
    try {
      await authAPI.logout()

      // Remove token from localStorage
      localStorage.removeItem("token")
      localStorage.removeItem("user")

      // Clear user state
      setUser(null)

      // Show success message
      toast({
        title: "Success",
        description: "Logout successful!",
      })

      // Redirect to home page
      router.push("/")
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  // Update user profile
  const updateProfile = async (id, userData) => {
    setLoading(true)
    try {
      const response = await usersAPI.updateUser(id, userData)

      // Update user state if updating current user
      if (user && user.id === id) {
        setUser({ ...user, ...response.data.data })
      }

      // Show success message
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      })

      return response.data.data
    } catch (error) {
      const message = error.response?.data?.message || "Failed to update profile"
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        initialized,
        register,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

