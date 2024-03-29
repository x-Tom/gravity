export function loadImage(url){
	return new Promise((resolve, reject) => {
		let image = new Image();
		image.addEventListener('load', () => {
			resolve(image);
		})
		image.src = url;
		image.addEventListener('error', () => {
			reject(image);
		})
	})
}
