declare namespace NodeJS {
	interface ProcessEnv {
		DB_HOST: string;
		DB_USERNAME: string;
		DB_PASSWORD: string;
		DB: string;
		DB_PORT: string;
		ACCESS_TOKEN_SECRET: string;
		ACCESS_TOKEN_EXPIRES_IN: string;
		REFRESH_TOKEN_SECRET: string;
		REFRESH_TOKEN_EXPIRES_IN: string;
		RESET_PASSWORD_TOKEN_SECRET: string;
		RESET_PASSWORD_TOKEN_EXPIRES_IN: string;
		VERIFICATION_TOKEN_SECRET: string;
		VERIFICATION_TOKEN_EXPIRES_IN: string;
		SMTP_FROM: string;
		SMTP_HOST: string;
		SMTP_PORT: string;
		SMTP_AUTH_USER: string;
		SMTP_AUTH_PASS: string;
		PORT: string;
	}
}
