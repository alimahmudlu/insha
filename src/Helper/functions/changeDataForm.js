/**
 * @functionName CHANGE DATA FORM GLOBAL
 * @functionDescription İnput və selectbox-ların redaktəsi zamanı `setDataForm` useState funksiyasına id-yə uyğun value göndərir
 */
export const changeDataFormGlobal = (e, setDataForm, setErrors, extra = {}) => {
	const { type, id, validity: { patternMismatch }, dataset: { key, extraKey, extraValue, extraitemkey, extraitemvalue } } = e.target;
	const value = type === "checkbox" ? (e.target.value || ((e.target.checked && 1) || 0)) : e.target.value;
	const index = id.split('-')[1];
	const dataKey = type === "radio" ? id.split('-')[0] : id.split('-')[0];

	if (extraKey) {
		extra[extraKey] = extraValue;
	}

	if (!patternMismatch) {
		if (!key) {
			if (value && setErrors) {
				setErrors(errors => {
					delete errors[dataKey];
					return { ...errors }
				});
			}
			setDataForm(state => ({
				...state,
				...extra,
				[dataKey]: value,
			}));
		} else {
			if (value && setErrors) {
				setErrors(errors => {
					if (errors[key] && errors[key][index] && errors[key][index][dataKey])
						delete errors[key][index][dataKey];
					return { ...errors }
				});
			}
			setDataForm(dataForm => {
				((dataForm[key] || (dataForm[key] = []))[index] || (dataForm[key][index] = {}))[dataKey] = value;
				if (extraitemkey) {
					const arrExtraItemKey = extraitemkey.split(',');
					const arrExtraItemValue = extraitemvalue.split(',');
					arrExtraItemKey.forEach((extraIK, i) => {
						((dataForm[key] || (dataForm[key] = []))[index] || (dataForm[key][index] = {}))[extraIK] = arrExtraItemValue[i];
					});
				}
				return { ...dataForm, ...extra };
			});

		}
	}
}
