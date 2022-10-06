/**
 * @functionName GETBASE64
 * @functionDescription Faylı oxuyur və base64-ə çevirib callback funksiyası ilə geri göndərir
 */
export const getBase64 = (file, cb) => {
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = function onload(e) {
		const regex = new RegExp("([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.png|.gif)$");
		if (regex.test(file.name.toLowerCase())) {
			if (typeof (file) != "undefined") {
				let width = 1, height = 1;
				let img = new Image()
				img.src = e.target.result
				img.onload = function () {
					width = this.width
					height = this.height
					cb({result:reader.result, height, width})
				}
			}
		}
		else {
			cb({result:reader.result})
		}
	};
	reader.onerror = function onerror(error) {
		console.log('Error - helpers/Func.js getBase64: ', error);
	};
}
