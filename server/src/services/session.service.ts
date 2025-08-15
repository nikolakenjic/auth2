import mongoose from 'mongoose';
import SessionModel from '../models/session.model';

type SessionParams = {
  userId: mongoose.Types.ObjectId;
  sessionId?: mongoose.Types.ObjectId;
};

export const getUserSessions = async (
  userId: SessionParams['userId'],
  sessionId?: SessionParams['sessionId']
) => {
  const sessions = await SessionModel.find(
    {
      userId,
      expiresAt: { $gt: new Date() },
    },
    {
      _id: 1,
      createdAt: 1,
    },
    {
      sort: { createdAt: -1 },
    }
  );

  // mark the current session
  return sessions.map((session) => ({
    ...session.toObject(),
    ...(session._id === sessionId && { current: true }),
  }));
};
