import catchAsync from '../utils/catchAsync';
import {OK} from '../constants/http';

import AppError from '../utils/AppError';
import {improveBulletService} from '../services/groq.service';

export const improveBullet = catchAsync(async (req, res, next) => {
    const {bullet} = req.body;

    if (!bullet || typeof bullet !== 'string' || !bullet.trim()) {
        return next(new AppError(400, 'Bullet text is required'));
    }

    const improved = await improveBulletService(bullet.trim());

    return res.status(OK).json({
        status: 'success',
        improved,
    });
});
