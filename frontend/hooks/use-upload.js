"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function useUpload() {
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState(null)
  const { toast } = useToast()

  const uploadFile = async (file) => {
    if (!file) return null

    setUploading(true)
    setProgress(0)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Upload failed")
      }

      const data = await response.json()
      return data.fileUrl
    } catch (err) {
      setError(err.message)
      toast({
        title: "Upload Error",
        description: err.message,
        variant: "destructive",
      })
      return null
    } finally {
      setUploading(false)
      setProgress(100)
    }
  }

  const uploadMultipleFiles = async (files) => {
    if (!files || files.length === 0) return []

    const uploadPromises = Array.from(files).map((file) => uploadFile(file))
    const results = await Promise.all(uploadPromises)
    return results.filter((url) => url !== null)
  }

  return {
    uploadFile,
    uploadMultipleFiles,
    uploading,
    progress,
    error,
  }
}

