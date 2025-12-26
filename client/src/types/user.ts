export interface User {
  id: number,
  username: string,
  role: string
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse extends ResponseData {
  success: boolean
  user: User
}

export interface ResponseData {
  message?: string
}