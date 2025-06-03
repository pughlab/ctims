import { NextApiRequest, NextApiResponse } from 'next';
import { encode } from 'next-auth/jwt';

const parentAppUrl = process.env.NEXT_PARENT_URL || 'http://localhost:3000';
console.log('parentAppUrl', parentAppUrl);

// Add CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': parentAppUrl, // Your parent app's domain
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Credentials': 'true', // Important for cookies
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set CORS headers for all responses
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Missing credentials' });
    }

    const api_url = process.env.NEXTAUTH_API_URL || 'http://localhost:3333/api';

    // Make the authentication request to your API
    const response = await fetch(`${api_url}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await response.json();

    if (data.accessToken && data.user) {
      // Create a JWT token that NextAuth can understand
      const token = await encode({
        token: {
          accessToken: data.accessToken,
          roles: data.user.roles || [],
          name: data.user.name,
          email: data.user.email,
          id: data.user.id || data.user.sub || 'default-id'
        },
        secret: process.env.NEXTAUTH_SECRET || 'secret',
        maxAge: 30 * 24 * 60 * 60 // 30 days
      });

      // Set the session cookie
      res.setHeader(
        'Set-Cookie',
        `next-auth.session-token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 24 * 60 * 60}`
      );

      return res.status(200).json({
        success: true,
        token: data.accessToken,
        user: data.user
      });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Iframe auth error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
