import catchAsync from "../utils/catchAsync";

export const registerHandler = catchAsync(async (req, res, next) => {
    res.send('hellpo')
})