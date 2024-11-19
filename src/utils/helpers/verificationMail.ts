import { IMailOptions } from "../../ts/interfaces/IMailOptions";
import { templateLoader } from "../templateLoader";

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
	const htmlContent = templateLoader("verificationMail", {
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
