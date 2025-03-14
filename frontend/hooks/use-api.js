"use client"

import { useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"

export function useApi() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const { toast } = useToast()

  const request = useCallback(
    async (apiFunction, options = {}) => {
      const {
        onSuccess,
        onError,
        showSuccessToast = false,
        showErrorToast = true,
        successMessage = "Operation successful",
        errorMessage = "An error occurred",
      } = options

      setLoading(true)
      setError(null)

      try {
        const response = await apiFunction()

        if (showSuccessToast) {
          toast({
            title: "Success",
            description: successMessage,
          })
        }

        if (onSuccess) {
          onSuccess(response.data)
        }

        return response.data
      } catch (err) {
        const message = err.response?.data?.message || errorMessage
        setError(message)

        if (showErrorToast) {
          toast({
            title: "Error",
            description: message,
            variant: "destructive",
          })
        }

        if (onError) {
          onError(err)
        }

        throw err
      } finally {
        setLoading(false)
      }
    },
    [toast],
  )

  return {
    loading,
    error,
    request,
  }
}

