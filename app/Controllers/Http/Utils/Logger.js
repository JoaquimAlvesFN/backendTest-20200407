'use strict'

const Logger = use('Logger')

module.exports = {
    async logInfo(auth, request) {
        Logger
        .transport('file')
        .info('request details', {
            url: request.originalUrl(),
            method: request.method(),
            ipAddress: request.ip(),
            user: auth.user == null ? 'unknown user' : auth.user.username
        })
    },

    async logError(error) {
        Logger
        .transport('file')
        .error('logging errors', error)
    }
}
