// PACKETS
import Swal from "sweetalert2";
import axios from "axios";

// HELPER
import {adminSwal} from "./adminSwal";

/**
 * @functionName HANDLE REMOVE
 * @functionDescription Hər hansı bir item-i silmək üçün istifadə edilir.
 */
export function handleRemove(credentials, url, _data, _setData) {
	adminSwal.fire({
		title: 'Silinsin?',
		text: "Bu dil həmişəlik silinəcək!",
		icon: 'question',
		showCancelButton: true,
		confirmButtonText: 'Yes, delete it!',
		cancelButtonText: 'No, cancel!',
		showLoaderOnConfirm: true,
		preConfirm: () => {
			return axios.delete(url, {
				data: {
					credentials
				}
			}).then(data => {
				if (!data.ok) {
					throw new Error(data.statusText)
				}
				_setData(data)
				return data
			}).catch(error => {
				console.log(error)
			})
		},
		allowOutsideClick: () => !Swal.isLoading()
	}).then((result) => {
		if (result.isConfirmed) {
			adminSwal.fire({
				title: `${result.value.message}`,
				icon: 'success',
				showConfirmButton: false,
				timer: 3000,
				timerProgressBar: true,
			})
		}
	})
}
