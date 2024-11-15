declare namespace NodeJS {
	interface ProcessEnv {
		// Database
		DB_HOST: string;
		DB_USERNAME: string;
		DB_PASSWORD: string;
		DB: string;
		DB_PORT: string;
		// JWT
		ACCESS_TOKEN_SECRET: string;
		ACCESS_TOKEN_EXPIRES_IN: string;
		REFRESH_TOKEN_SECRET: string;
		REFRESH_TOKEN_EXPIRES_IN: string;
		RESET_PASSWORD_TOKEN_SECRET: string;
		RESET_PASSWORD_TOKEN_EXPIRES_IN: string;
		VERIFICATION_TOKEN_SECRET: string;
		VERIFICATION_TOKEN_EXPIRES_IN: string;
		// Cookie
		COOKIE_HTTP_ONLY: string;
		COOKIE_SAME_SITE: string;
		COOKIE_SECURE: string;
		COOKIE_MAX_AGE: string;
		// SMTP
		SMTP_FROM: string;
		SMTP_HOST: string;
		SMTP_PORT: string;
		SMTP_AUTH_USER: string;
		SMTP_AUTH_PASS: string;
		// Others
		PORT: string;
	}
}
