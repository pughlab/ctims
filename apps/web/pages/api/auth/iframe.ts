import { NextApiRequest, NextApiResponse } from 'next';
import { encode } from 'next-auth/jwt';

const parentAppUrl = process.env.NEXT_PARENT_URL || 'http://localhost:3000';
console.log('parentAppUrl', parentAppUrl);
// Allowed origins for iframe requests
const allowedOrigins = [
  'https://pmatch.uhn.ca',
  'https://ctims.uhn.ca',
  parentAppUrl, // For development
].filter(Boolean) as string[];



export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Get the origin from the request
  const origin = req.headers.origin;

  // Check if origin is allowed
  const isAllowedOrigin = origin && allowedOrigins.includes(origin);

  // Set CORS headers
  if (isAllowedOrigin) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  } else {
    // In development, allow all origins
    if (process.env.NODE_ENV === 'development') {
      res.setHeader('Access-Control-Allow-Origin', origin || '*');
      res.setHeader('Access-Control-Allow-Credentials', 'true');
    } else {
      // In production, reject if origin not allowed
      return res.status(403).json({ message: 'Origin not allowed' });
    }
  }

  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.setHeader('Access-Control-Max-Age', '86400'); // 24 hours

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
