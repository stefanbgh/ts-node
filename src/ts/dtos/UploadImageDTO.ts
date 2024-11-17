export interface UploadImageDTO {
    usr_id: string;
    file: Express.Multer.File | undefined;
}