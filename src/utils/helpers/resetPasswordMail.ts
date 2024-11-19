import { IMailOptions } from "../../ts/interfaces/IMailOptions";
import { templateLoader } from "../../utils/templateLoader";

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
	const htmlContent = templateLoader("resetPassword", {
		port: process.env.PORT,
		token,
	});

	return {
		from: process.env.SMTP_FROM as string,
		to,
		subject,
		html: htmlContent
	};
};
