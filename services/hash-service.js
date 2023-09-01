const crypto = require('crypto');

class HashService {
    hashOtp(data) {
        return crypto
            .createHmac('sha256',"shazo")
            .update(data)
            .digest('hex');
    }
}

module.exports = new HashService();