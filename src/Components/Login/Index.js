import TNLogo from './../../Assets/Images/elm_ve_tehsil.png'
import {useState} from "react";
import {loginUser} from "../../Actions";
import {useAuthDispatch, useAuthState} from "../../Context/AuthProvider/context";

export default function Index(props) {
	const [formData, setFormData] = useState({})


	// CONTEXT STATES
	const dispatch = useAuthDispatch();
	const { loading, errorMessage } = useAuthState();

	const handleLogin = async (e) => {
		e.preventDefault();
		loginUser(dispatch, { formData }).then(e => {
			props.history.push('/dashboard');
		}).catch(error => {

		});
	};
	return (
		<>
			<div className='sections section_login'>
				<div className='section_login_head'>
					<img className='section_login_head--img' src={TNLogo} alt='Azərbaycan Respublikası Elm və Təhsil Nazirliyi-nin logosu' />
				</div>
				<div className='section_login_content'>
					<div className='section_login_content_form'>
						<h2 className='section_login_content_form--header'>
							Sistemə giriş
						</h2>
						{errorMessage ? <p className='section_login_content_form--description'>
							Error message
						</p> : ''}
						<div className='formGroup'>
							<label className='formLabel' htmlFor='fin'>
								FİN:
							</label>
							<input type='text' disabled={loading} className='formInput' value={formData.fin || ''} onChange={(e) => setFormData({...formData, fin: e.target.value})} id='fin' name='fin' minLength='6' maxLength='7' />
						</div>
						<button className='button-primary button-full' disabled={loading} onClick={handleLogin}>
							Daxil ol
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
