export const TYPES = {
	// JWT
	JwtAuth: Symbol.for("JwtAuth"),
	// Auth
	AuthService: Symbol.for("AuthService"),
	AuthController: Symbol.for("AuthController"),
	AuthRoutes: Symbol.for("AuthRoutes"),
	// User
	UserRepository: Symbol.for("UserRepository"),
	UserService: Symbol.for("UserService"),
	UserController: Symbol.for("UserController"),
	UserRoutes: Symbol.for("UserRoutes"),
	// Image
	ImageRepository: Symbol.for("ImageRepository"),
	ImageService: Symbol.for("ImageService"),
	ImageController: Symbol.for("ImageController"),
	ImageRoutes: Symbol.for("ImageRoutes"),
	// 404
	NotFoundController: Symbol.for("NotFoundController"),
	NotFoundRoutes: Symbol.for("NotFoundRoutes"),
	// Others
	Routes: Symbol.for("Routes"),
	Middlewares: Symbol.for("Middlewares"),
	App: Symbol.for("App"),
};
