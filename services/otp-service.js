const crypto = require('crypto');
const hashService = require('./hash-service');

const smsSid = 'AC0a65a3edf171d4165e611991c37eb968';
const smsAuthToken = '5fbcf03a1ff4a9d1932e9685843065af';
const twilio = require('twilio')(smsSid, smsAuthToken, {
    lazyLoading: true,
});

class OtpService {
    async generateOtp() {
        const otp = crypto.randomInt(1000, 9999);
        return otp;
   
    }

    async sendBySms(phone, otp) {
        return await twilio.messages.create({
            to: phone,
            from: +16614755876,
            body: `Your Anony OTP is ${otp}`,
        });
    }

    verifyOtp(hashedOtp, data) {
        let computedHash = hashService.hashOtp(data);
        return computedHash === hashedOtp;
    }
}

module.exports = new OtpService();