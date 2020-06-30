'use strict'

const User = use('App/Models/User')
const {logInfo, logError} = require('./Utils/Logger')

class UserController {
    async register({request, response}) {
        try {
            const {username, email, password} = request.body
            const storeData = await User.create({
                username,
                email,
                password
            })

            logInfo(username, request)

            return response.json(storeData)
        } catch (error) {
            logError(error)
        }
    }

    async authenticate({auth, request, response}) {
        try {
            const {email, password} = request.body
            const {token} = await auth.withRefreshToken().attempt(email, password)

            logInfo(auth, request)

            return response.json({token})
        } catch (error) {
            logError(error)
        }

    }

    async deAuthenticate({auth, request, response}) {
        try {
            const check = await auth.check();
      
            logInfo(auth, request)

            if (check) {
              const token = await auth.getAuthHeader();
              await auth.authenticator("jwt").revokeTokens([token], true);
              return response.status(200).json({ message: "Logout successfully!" });
            }

            
        } catch (error) {
            logError(error)
            return response.json({ message: "Invalid jwt token" });
        }
    }
}

module.exports = UserController
