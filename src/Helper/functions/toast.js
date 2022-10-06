// PACKETS
import cogoToast from 'cogo-toast';

/**
 * @functionName SHOW TOAST
 * @functionDescription Toast-ı göstərmək üçün funksiya.
 */
export function showToast(text, type = "error", routeFn=()=>{}, options = { hideAfter: 5, position: 'bottom-right' }) {
	const { hide } = cogoToast[type](text, { ...options, onClick: () => {hide(); routeFn()} });
}
