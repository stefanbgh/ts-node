import { IMailOptions } from "../../ts/interfaces/IMailOptions";

interface IProps {
	to: string;
	subject: string;
	token: string;
}

export const verificationMail = ({
	to,
	subject,
	token,
}: IProps): IMailOptions => {
	return {
		from: process.env.SMTP_FROM as string,
		to,
		subject,
		html: `
            <p>Please verify your email by clicking the link below::</p>
            <p><a href="http://localhost:${process.env.PORT}/api/v1/auth/verification-email/${token}">Verify Email</a></p>
        `,
	};
};
