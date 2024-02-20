const nodemailer = require("nodemailer");

module.exports = class Email {
	constructor(user) {
		this.to = user.email;
		this.message = user.message;
		this.from = `anikroy173@gmail.com`;
	}

	newTransport() {
		return nodemailer.createTransport({
			host: "smtp-relay.sendinblue.com",
			port: 587,
			auth: {
				user: "yos8760@gmail.com", //fill email
				pass: "jOx4wQD3bMGp72aA", //fill password
			},
		});
	}

	async sendMailHTML() {
		const mailOptions = {
			from: this.from,
			to: this.to,
			subject: "Hello!",
			text: `This message is sent using Custom App.`,
			html: `<!DOCTYPE html>
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Notification</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #ffffff;
            color: #333333;
            margin: 0;
            padding: 0;
            -webkit-font-smoothing: antialiased;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
            background-color: #f8f8f8;
            border: 1px solid #dddddd;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            background-color: #007bff;
            color: #ffffff;
            padding: 10px;
            text-align: center;
            font-size: 24px;
          }
          .content {
            padding: 20px;
            font-size: 16px;
            line-height: 1.6;
          }
          .footer {
            text-align: center;
            padding: 10px;
            font-size: 14px;
            color: #999999;
            border-top: 1px solid #dddddd;
          }
          .footer p {
            margin: 5px 0;
          }
          .bold {
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            Hello!
          </div>
          <div class="content">
            <p class="bold">${this.message}</p>
          </div>
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>


      `,
		};

		await this.newTransport().sendMail(mailOptions);
	}

	async sendMailToPerson() {
		await this.sendMailHTML();
	}
};
