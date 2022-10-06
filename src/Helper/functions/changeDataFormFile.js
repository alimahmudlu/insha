// PACKETS
import axios from "axios";

// HELPERS
import {getBase64} from "./getBase64";
import {removeFile} from "./removeFile";

/**
 * @functionName CALL BACK CHANGE FORM DATA FILE
 * @functionDescription
 */
export const callBackChangeFormDataFile = (e, _dataForm, _setDataForm, _errors, _setErrors, callback, progress = null) => {
	const dataForm = _dataForm;
	const errors = _errors;
	const key = e.target.dataset.key;
	const target = e.target;
	const s = target.id.split('-');
	const index = s[1];
	const id = s[0];

	if (e.target.files.length > 0) {
		let file = e.target.files[0];
		if (progress) {
			progress(1);
		}
		removeFile(id, key, index, _setDataForm, _dataForm)
		if (e.target.files.length > 0) {
			file = e.target.files;
			for (const newFile of file) {
				getBase64(newFile, (result64) => {
					const exts = newFile.name.split('.');
					const ext = exts[exts.length - 1];
					delete exts[exts.length - 1];
					const fname = exts.join('').trim();
					axios.post('/uploads', {
						file_data: {
							ext,
							fname: `${result64.width ? `${fname}__${result64.width}x${result64.height}__` : fname}`,
							filedata: result64.result
						}, path: id.toLowerCase()
					}, {
						onUploadProgress: progressEvent => {
							const { loaded, total } = progressEvent;
							const percent = Math.round(Math.floor((loaded * 100) / total));
							if (progress && percent > 0) {
								progress(percent);
							}
						},
					}).then(result => {
						target.value = "";
						if (key) {
							((dataForm[key] || (dataForm[key] = [{}]))[index] || (dataForm[key][index] = {}))[id] = result.data;
							if (((errors[key] || [])[index] || {})[id]) {
								delete errors[key][index][id];
							}
						} else {
							if (errors[id]) {
								delete errors[id];
							}
							dataForm[id] = result.data;
						}
						callback({
							errors,
							index,
							key,
							id,
							dataForm
						});
					}).catch(() => {
						callback(null);
					});
				});
			}
		}
		else {
			file = e.target.files[0];
			getBase64(file, (result64) => {
				const exts = file.name.split('.');
				const ext = exts[exts.length - 1];
				delete exts[exts.length - 1];
				const fname = exts.join('').trim();
				axios.post('/uploads', {
					file_data: {
						ext,
						fname,
						filedata: result64
					}, path: id.toLowerCase()
				}, {
					onUploadProgress: progressEvent => {
						const { loaded, total } = progressEvent;
						const percent = Math.round(Math.floor((loaded * 100) / total));
						if (progress && percent > 0) {
							progress(percent);
						}
					},
				}).then(result => {
					target.value = "";
					if (key) {
						((dataForm[key] || (dataForm[key] = [{}]))[index] || (dataForm[key][index] = {}))[id] = result.data;
						if (((errors[key] || [])[index] || {})[id]) {
							delete errors[key][index][id];
						}
					} else {
						if (errors[id]) {
							delete errors[id];
						}
						dataForm[id] = result.data;
					}
					callback({
						errors,
						index,
						key,
						id,
						dataForm
					});
				}).catch(() => {
					callback(null);
				});
			});
		}

	}
	else {
		callback(null);
	}
}

/**
 * @functionName CHANGE FORM DATA FILE
 * @functionDescription Fayl yükləmə zamanı işə düşür və callback funksiyasından aldığı məlumata uyğun state-ə value yazır.
 */
export function changeFormDataFile(e, datas, setDatas, errors, setErrors, filesProgress, setFilesProgress) {
	const id = e.target.id;
	callBackChangeFormDataFile(e, datas, setDatas, errors, setErrors, (data) => {
		if (data) {
			const { errors, dataForm } = data;
			setDatas((datas) => ({
				...datas,
				...dataForm
			}))
			setErrors((error) => ({
				...error,
				...errors
			}))
		}
	}, (progress) => {
		const fileProgress = filesProgress || {};
		if (Number(fileProgress[id]) !== Math.round(progress)) {
			fileProgress[id] = progress;
			setFilesProgress((filesProgress) => ({
				...filesProgress,
				...fileProgress
			}));
		}
	});
}
