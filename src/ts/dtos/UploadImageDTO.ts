export interface UploadImageDTO {
    usr_id: number;
    file: Express.Multer.File | undefined;
}