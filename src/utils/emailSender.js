

module.exports = function emailSender(email, fname, lname, confirmToken) {
    return mailoption = {
        from: '"Confirmation mail ☑️ " <mabuzartest@gmail.com>',
        to: email,
        subject: "Please confirm your account",
        html: `
            <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
                    </div>
                    <p style="font-size:1.1em">Hi,  ${fname} ${lname}</p>
                    <p>Thank you for choosing Your Brand. Use the following OTP to complete your Sign Up procedures. OTP is valid for 10 minutes</p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">Confirm Mail</h2>
                    <a href="${process.env.BASE_URL}/forgetconfirm/${confirmToken}">Click Here</a>
                    <p style="font-size:0.9em;">Regards,<br />Your Brand</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>Your Brand Inc</p>
                    <p>1600 Amphitheatre Parkway</p>
                    <p>California</p>
                    </div>
                </div>
            </div>`
    }
}