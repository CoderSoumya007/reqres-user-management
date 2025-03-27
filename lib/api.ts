const BASE_URL = "https://reqres.in/api"

// Get token from localStorage
const getToken = () => localStorage.getItem("token")

// Handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || "An error occurred")
  }
  return response.json()
}

// Authentication
export const login = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
  return handleResponse(response)
}

// Users
export const fetchUsers = async (page = 1) => {
  const response = await fetch(`${BASE_URL}/users?page=${page}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return handleResponse(response)
}

export const fetchUser = async (id: string) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })
  return handleResponse(response)
}

export const updateUser = async (id: string, userData: { first_name: string; last_name: string; email: string }) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(userData),
  })
  return handleResponse(response)
}

export const deleteUser = async (id: number) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  })

  // DELETE requests to reqres.in return 204 No Content
  if (response.status === 204) {
    return true
  }

  return handleResponse(response)
}

