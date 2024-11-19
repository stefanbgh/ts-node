import fs from "fs";
import path from "path";
import handlebars from "handlebars";

export const templateLoader = (templateName: string, data: Record<string, unknown>): string => {
	const filePath = path.resolve(__dirname, `../templates/${templateName}.hbs`);
	const templateContent = fs.readFileSync(filePath, "utf8");
	const template = handlebars.compile(templateContent);
    
	return template(data);
};