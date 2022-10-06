// PACKETS
import React from 'react';
import { Redirect, Route } from 'react-router-dom';


/**
 * @module AppRoutes
 * @description Route Component
 * @return {Route}
 */

const AppRoutes = ({ component: Component, path, isPrivate, isLogin, api, currentUser, setLoading, ...rest }) => {
	return (
		<Route
			exact={true}
			path={path}
			render={(props) =>
				(isPrivate && !isLogin)
					?
						<Redirect to={{ pathname: '/login' }} />
					:
					((!isPrivate && isLogin)
						?
							<Redirect to={{ pathname: '/' }} />
						:
							<Component {...props} api={api} currentUser={currentUser} setLoading={setLoading} />
					)
			}
			{...rest}
		/>
	);
};

export default AppRoutes;
