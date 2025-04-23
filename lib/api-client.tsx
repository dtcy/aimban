// This file handles communication with the backend API

// Base URL for API requests
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

// Helper function to handle API responses
async function handleResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => null)
    throw new Error(error?.detail || `API error: ${response.status}`)
  }
  return response.json()
}

// Function to encrypt data before sending to the API
async function encryptData(data: string, userId: string): Promise<{ encryptedData: string; key: string }> {
  // In a real implementation, this would use a proper encryption library
  // For now, we'll just simulate encryption with base64 encoding
  const key = btoa(Math.random().toString(36).substring(2, 18)) // Generate a random key
  const encryptedData = btoa(data) // Simulate encryption with base64

  return {
    encryptedData,
    key,
  }
}

// API client functions
export const apiClient = {
  // Save data to the backend
  async saveData(userId: string, data: string) {
    const { encryptedData, key } = await encryptData(data, userId)

    const response = await fetch(`${API_BASE_URL}/data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        data: encryptedData,
        key: key,
      }),
    })

    return handleResponse(response)
  },

  // Get data from the backend
  async getData(docId: string, key: string) {
    const response = await fetch(`${API_BASE_URL}/data/${docId}?key=${encodeURIComponent(key)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    return handleResponse(response)
  },

  // Update data in the backend
  async updateData(docId: string, userId: string, data: string) {
    const { encryptedData, key } = await encryptData(data, userId)

    const response = await fetch(`${API_BASE_URL}/data/${docId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: userId,
        data: encryptedData,
        key: key,
      }),
    })

    return handleResponse(response)
  },

  // Delete data from the backend
  async deleteData(docId: string) {
    const response = await fetch(`${API_BASE_URL}/data/${docId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })

    return handleResponse(response)
  },
}
