export class ImageEntity {
	constructor(
		public img_id: number,
		public img_data: Buffer,
		public usr_id: number
	) {}
}
