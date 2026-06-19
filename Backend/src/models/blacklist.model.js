const mongoose = require('mongoose')


const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [ true, "token is required to be added in blacklist" ]
    }
}, {
    timestamps: true
})// the token needs to be added in the blacklist when the user logs out. This schema defines a single field called "token" which is of type String and is required. The timestamps option is set to true, which means that Mongoose will automatically add createdAt and updatedAt fields to the schema, allowing us to track when each token was added to the blacklist.

const tokenBlacklistModel = mongoose.model("blacklistTokens", blacklistTokenSchema)


module.exports = tokenBlacklistModel