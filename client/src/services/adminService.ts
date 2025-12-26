import api from './axios'
import axios from 'axios';
import router from '../router';

export async function getAdminInformation(): Promise<{ message: string }> {
  try {
    const res = await api.get('/admin');
    return res.data.data.message;

  } catch (err: Error | unknown) {
    const message = axios.isAxiosError(err)
      ? err.response?.data?.message ?? err.message
      : (err instanceof Error ? err.message : 'Failed to fetch admin information');

    router.push({ path: '/error', query: { message: message } })
    return message;
  }
}