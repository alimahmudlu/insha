import * as React from "react";

// CSS
import './Assets/Css/main.css';

// COMPONENTS
import Login from './Components/Login/Index';
import Essay from './Components/Essay/Index';
import {Redirect, Route, Switch} from "react-router-dom";
import {useAuthState} from "./Context/AuthProvider/context";


export default function App() {
	const userDetails = useAuthState();

	return (
		<div className="App">
			<Switch>
				<Route path='/' exact >
					{!userDetails.token ?
						<div className='pages page_home'>
							<div className='page_home_head'>
								<div className='container'>
									<h2 className='page_home_head--header'>
										Əziz Şuşa, sən azadsan
									</h2>
									<span className='page_home_head--name'>
								Name Surname
							</span>
								</div>
							</div>
							<div className='page_home_content'>
								<div className='container'>
									<Essay />
								</div>
							</div>
							<div className='page_home_footer'>
								<div className='container'>
									<h4 className='page_home_footer--name'>
										Olimpiada Müsabiqəsi
									</h4>
								</div>
							</div>
						</div>
						: <Redirect to={{ pathname: '/login' }} /> }
				</Route>
				<Route path='/login' exact >
					{!!userDetails.token ?
						<Login/>
						: <Redirect to={{ pathname: '/' }} /> }
				</Route>
			</Switch>
		</div>
	);
};
