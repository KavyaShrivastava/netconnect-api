import asyncHandler from "express-async-handler";

// controllers/tokenController.js
import { verifyToken } from '../utils/verifyToken.js';

export const verifyTokenController = (req, res) => {
  const { token } = req?.body;

  try {
    const decoded = verifyToken(token);

    if (!decoded) {
      return res.json({ valid: false });
    } else {
      return res.json({ valid: true });
    }
  } catch (error) {
    return res.json({ valid: false });
  }
};


