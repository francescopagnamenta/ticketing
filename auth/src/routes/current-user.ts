import express from 'express';

import { currentUser } from '@k-tickets/common';

const router = express.Router();

router.get('/api/users/currentuser', 
  currentUser,
   (req, res) => {
  // req.currentUser handled by the middleware
  return res.send({ currentUser: req.currentUser || null });
});

export {router as currentUserRouter};