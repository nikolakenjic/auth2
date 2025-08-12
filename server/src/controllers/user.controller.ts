import catchAsync from '../utils/catchAsync';

export const getMe = catchAsync(async (req, res, next) => {
  return res.send('me');
});
