import type { LoginRequest, LoginResponse } from '../types/user'
import api from './axios'
import axios from 'axios';

export async function loginApi(data: LoginRequest): Promise<LoginResponse> {
  try {
    const res = await api.post('/login', data);
    console.log(res)
    return {
      success: true,
      message: 'Login successful',
      user: res.data.data.user
    };

  } catch (err: Error | unknown) {

    const message = axios.isAxiosError(err)
      ? err.response?.data?.message ?? err.message
      : (err instanceof Error ? err.message : 'Login failed');

    return {
      success: false,
      message: message,
      user: { username: '', id: 0, role: '' }
    };
  }
}