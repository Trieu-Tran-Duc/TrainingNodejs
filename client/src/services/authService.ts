import type { LoginRequest, LoginResponse } from '../types/user'

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.username === 'aaaaa' && data.password === '123456') {
        resolve({
          success: true,
          user: {
            id: 1,
            role: 'admin',
            username: data.username
          }
        })
      } else {
        reject(new Error('Invalid credentials'))
      }
    }, 1000)
  })
}
