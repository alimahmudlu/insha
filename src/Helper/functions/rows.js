/**
 * @functionName ADD ROW
 * @functionDescription State-ə yeni sətir əlavə edir.
 */
export const addRowFn = (error, setError, data, setData, key, index) => {
	if (error[key]) {
		error[key].splice(index, 0, {});
	}
	setError({ ...error });

	(data[key] || (data[key] = [{}])).splice(index, 0, {});
	setData({ ...data });
}
/**
 * @functionName REMOVE ROW
 * @functionDescription State-dən bu sətiri silir.
 */
export const removeRowFn = (error, setError, data, setData, key, index) => {
	if (error[key] && error[key].length - 1 >= index) {
		error[key].splice(index, 1);
	}
	setError({ ...error });

	data[key].splice(index, 1);
	setData({ ...data });
}
