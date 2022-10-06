// PACKETS
import Swal from "sweetalert2";

/**
 * @functionName ADMINSWAL
 * @functionDescription Swal modal komponentinin custom button dizaynını verir
 */
export const adminSwal = Swal.mixin({
	customClass: {
		confirmButton: 'customBtn applyBtn',
		cancelButton: 'customBtn applyBtn applyBtn-light'
	},
	buttonsStyling: false
})
