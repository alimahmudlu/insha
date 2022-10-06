import {useState} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";

export default function Index() {
	const [modal, setModal] = useState(false);
	const [formData, setFormData] = useState({});
	const [maxWordLength, setMaxWordLength] = useState(7);
	const [counter, setCounter] = useState(0);

	let history = useHistory()

	function openModal(e) {
		setModal(true)
	}

	function closeModal(e) {
		setModal(false)
	}

	const changeEssay = async (e) => {
		const essay              = formData.essay || "",
			essayLength        = essay.length,
			essayWordLength    = essayLength > 0 ? essay.trim('').split(' ').length : 0,
			newEssay           = e.target.value || "",
			newEssayLength     = newEssay.length,
			newEssayWordLength = newEssayLength > 0 ? newEssay.trim('').split(' ').length : 0;

		setFormData({
			...formData,
			essay: newEssayWordLength <= maxWordLength ? newEssay : (newEssayLength < essayLength ? newEssay : essay)
		})
		setCounter(newEssayWordLength <= maxWordLength ? newEssayWordLength : maxWordLength)
		// (e) => setFormData({...formData, essay: (formData?.essay?.trim('').split(' ').length || 0) <= maxWordLength ? e.target.value : formData.essay})
	}

	function sendEssay(e) {

	}


	return (
		<>
			<div className='sections section_essay'>
				<h1 className='section_essay--header'>
					"Əziz Şuşa, sən azadsan!" Müsabiqəsi
				</h1>
				<p className='section_essay--description'>
					Qaydalar, vaxt limiti, söz sayı məlumatı, təsdiq etmə prosesi. Qaydalar, vaxt limiti, söz sayı məlumatı, təsdiq etmə prosesi. Qaydalar, vaxt limiti, söz sayı məlumatı, təsdiq etmə prosesi. Qaydalar, vaxt limiti, söz sayı məlumatı, təsdiq etmə prosesi.
				</p>
				<br/>
				<p className='section_essay--description'>
					<b>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo  (750 max)</b>
				</p>
				<div className='formGroup'>
					<div className='section_essay_group'>
						<span className='section_essay_group--label'>
							Müsabiqə istiqaməti
						</span>
						<span className='section_essay_group--label'>
							{counter || 0} words
						</span>
					</div>
					<textarea className='formInput section_essay_group--textarea' id='essay' name='essay' value={formData.essay} onChange={changeEssay}></textarea>
				</div>
				<button onClick={openModal} className='button-green button-big'>GÖNDƏR</button>
			</div>

			<div className={['modal', modal ? 'show' : ''].join(' ')}>
				<div className='modal-dialog'>
					<div className='modal-header'>
						<span className='modal-header--times' onClick={closeModal}>
							<svg xmlns="http://www.w3.org/2000/svg" width="18" height="19" viewBox="0 0 18 19"><g><g><path fill="#4b4545" d="M17.853 1.934L16.623.703a.446.446 0 0 0-.626 0L8.991 7.71 1.965.703a.446.446 0 0 0-.625 0L.128 1.933a.446.446 0 0 0 0 .626l7.007 7.007L.128 16.59a.446.446 0 0 0 0 .625l1.23 1.231c.171.17.455.17.626 0l7.007-7.026 7.025 7.026c.17.17.455.17.625 0l1.231-1.23a.446.446 0 0 0 0-.626l-7.026-7.025 7.026-7.026a.441.441 0 0 0-.019-.606z"/></g></g></svg>
						</span>
					</div>
					<div className='modal-content'>
						<h5 className='modal-content--header'>
							“Siz inşanı bitirdiniz. Bitirdiyinizə əminsinizmi?
						</h5>
						<div className='modal-content--description'>
							Təsdiq etdikdən sonra düzəliş edə bilməyəcəksiniz
						</div>
					</div>
					<div className='modal-footer'>
						<div className='buttonGroup buttonGroup--center'>
							<button className='button-blackOutline button-small' onClick={closeModal}>İmtina</button>
							<button className='button-green button-small' onClick={sendEssay}>Təsdiq</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
