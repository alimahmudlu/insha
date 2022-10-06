/**
 * @functionName GET FILE NAME
 * @functionDescription URL-dən faylın adını götürür və return edir.
 */
export const getFileName = (_url) => {
	let url = _url;
	if (url) {
		url = decodeURI(url.split('~')[1]);
		if (url.indexOf('-') > 0)
			url = `${url.substring(0, url.lastIndexOf('-'))}.${url.split('.')[1]}`;
	}
	return url;
}
