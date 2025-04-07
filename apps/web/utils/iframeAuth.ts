export const authenticateInIframe = async (username: string, password: string) => {
  try {
    const response = await fetch('/api/auth/iframe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Authentication failed');
    }

    // Store the token in localStorage
    if (data.token) {
      localStorage.setItem('ctims-accessToken', data.token);
    }

    return data;
  } catch (error) {
    console.error('Iframe authentication error:', error);
    throw error;
  }
}; 