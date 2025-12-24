const enum AppErrorCode {
    // Auth
    InvalidAccessToken = 'InvalidAccessToken',
    TokenExpired = 'TokenExpired',
    Unauthorized = 'Unauthorized',
    Forbidden = 'Forbidden',

    // Validation
    ValidationError = 'ValidationError',

    // User / Session
    UserNotFound = 'UserNotFound',
    SessionExpired = 'SessionExpired',
    SessionNotFound = 'SessionNotFound',

    // Resume
    ResumeNotFound = 'ResumeNotFound',
    ResumeLimitReached = 'ResumeLimitReached',

    // Cover Letter
    CoverLetterNotFound = 'CoverLetterNotFound',

    // Interview
    InterviewSessionNotFound = 'InterviewSessionNotFound',

    // Generic
    InternalServerError = 'InternalServerError',
}

export default AppErrorCode;