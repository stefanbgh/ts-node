import { IMailOptions } from "../../ts/interfaces/IMailOptions";

interface IProps {
	to: string;
	subject: string;
	token: string;
}

export const resetPasswordMail = ({
	to,
	subject,
	token,
}: IProps): IMailOptions => {
	return {
		from: process.env.SMTP_FROM as string,
		to,
		subject,
		html: `
            <p>Click the following link to reset your password:</p>
            <p><a href="http://localhost:${process.env.PORT}/api/v1/auth/reset-password/${token}">Reset Password</a></p>
            <p>If you did not request this, please ignore this email.</p>
        `,
	};
};
