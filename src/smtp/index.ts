export const smtp = {
	host: process.env.SMTP_HOST,
	port: Number(process.env.SMTP_PORT),
	secure: false,
	auth: {
		user: process.env.SMTP_AUTH_USER,
		pass: process.env.SMTP_AUTH_PASS,
	},
};
