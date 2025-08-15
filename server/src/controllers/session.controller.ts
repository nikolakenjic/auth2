import catchAsync from '../utils/catchAsync';

export const getSessionsHandler = catchAsync(async (req, res, next) => {
  return res.send('getSessionsHandler');
});
