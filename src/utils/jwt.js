import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const ACCESS_SECRET = process.env.ACCESS_SECRET || 'yourAccessSecret';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'yourRefreshSecret';

export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, ACCESS_SECRET, { expiresIn: '15m' });
};

export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, REFRESH_SECRET, { expiresIn: '30d' });
};
