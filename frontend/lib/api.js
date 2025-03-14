import axios from "axios"

// Create axios instance
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for cookies
})

// Request interceptor for adding token
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("token")

    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle session expiration
    if (error.response?.status === 401) {
      // Clear user data from localStorage
      localStorage.removeItem("token")
      localStorage.removeItem("user")

      // Redirect to login page if not already there
      if (typeof window !== "undefined" && !window.location.pathname.includes("/auth")) {
        window.location.href = "/auth"
      }
    }

    return Promise.reject(error)
  },
)

// Auth API
export const authAPI = {
  register: (userData) => api.post("/auth/register", userData),
  login: (credentials) => api.post("/auth/login", credentials),
  logout: () => api.get("/auth/logout"),
  getMe: () => api.get("/auth/me"),
  updatePassword: (passwordData) => api.put("/auth/update-password", passwordData),
  forgotPassword: (email) => api.post("/auth/forgot-password", { email }),
  resetPassword: (token, password) => api.put(`/auth/reset-password/${token}`, { password }),
}

// Users API
export const usersAPI = {
  getUser: (id) => api.get(`/users/${id}`),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  getUserListings: (id) => api.get(`/users/${id}/listings`),
  getUserReviews: (id) => api.get(`/users/${id}/reviews`),
  getSavedListings: (id) => api.get(`/users/${id}/saved-listings`),
  saveUnsaveListing: (userId, listingId) => api.post(`/users/${userId}/save-listing/${listingId}`),
}

// Businesses API
export const businessesAPI = {
  getBusinesses: (params) => api.get("/businesses", { params }),
  getBusiness: (id) => api.get(`/businesses/${id}`),
  createBusiness: (businessData) => api.post("/businesses", businessData),
  updateBusiness: (id, businessData) => api.put(`/businesses/${id}`, businessData),
  deleteBusiness: (id) => api.delete(`/businesses/${id}`),
  getBusinessListings: (id) => api.get(`/businesses/${id}/listings`),
  getBusinessReviews: (id) => api.get(`/businesses/${id}/reviews`),
}

// Listings API
export const listingsAPI = {
  getListings: (params) => api.get("/listings", { params }),
  getFeaturedListings: (limit) => api.get("/listings/featured", { params: { limit } }),
  getRecentListings: (limit) => api.get("/listings/recent", { params: { limit } }),
  searchListings: (params) => api.get("/listings/search", { params }),
  getListing: (id) => api.get(`/listings/${id}`),
  createListing: (listingData) => api.post("/listings", listingData),
  updateListing: (id, listingData) => api.put(`/listings/${id}`, listingData),
  deleteListing: (id) => api.delete(`/listings/${id}`),
  getListingReviews: (id) => api.get(`/listings/${id}/reviews`),
  incrementListingViews: (id) => api.post(`/listings/${id}/view`),
}

// Reviews API
export const reviewsAPI = {
  createReview: (reviewData) => api.post("/reviews", reviewData),
  updateReview: (id, reviewData) => api.put(`/reviews/${id}`, reviewData),
  deleteReview: (id) => api.delete(`/reviews/${id}`),
}

// Categories API
export const categoriesAPI = {
  getCategories: () => api.get("/categories"),
  getCategory: (id) => api.get(`/categories/${id}`),
  getCategoryListings: (id) => api.get(`/categories/${id}/listings`),
}

export default api

