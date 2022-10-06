// PACKETS
import React, {useState} from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

// CONFIGS
import routes from '../Config/routes';

// CONTEXT
import { useAuthState, useApiDatasDispatch, useApiDatas } from '../Context';

// ACTIONS
import { getCachedApi, postCachedApi, deleteCachedApi, putCachedApi } from '../Actions';

// COMPONENTS
import AppRoute from './AppRoute';
import {FullScreenLoading} from './Loading';
import HeaderBar from "../Bars/headerBar";


function Router() {
    const [loading, setLoading] = useState(false)

    const userDetails = useAuthState();
    const dispatch = useApiDatasDispatch();
    const apiDatas = useApiDatas();

    const api = (url, method, credentials = null, config = null, cached = false) => new Promise((resolve) => {
        if (method === 'post') {
            postCachedApi(url, apiDatas, dispatch, credentials, cached, resolve);
        }
        else if (method === 'put') {
            putCachedApi(url, apiDatas, dispatch, credentials, cached, resolve);
        }
        else if (method === 'delete') {
            deleteCachedApi(url, apiDatas, dispatch, config, cached, resolve);
        }
        else if (method === 'get') {
            getCachedApi(url, apiDatas, dispatch, config, cached, resolve);
        }
    });


    return (
        <BrowserRouter>
            {userDetails.loading ? <FullScreenLoading/>
                :
                <Switch>
                    <>
                        <HeaderBar/>
                        <section id="page" className="page">
                            <div className="container-lg">
                                <div className="page_body">
                                    {routes.map((route) => (
                                        <AppRoute
                                            api={api}
                                            setLoading={setLoading}
                                            currentUser={userDetails.user}
                                            key={route.path}
                                            path={route.path}
                                            component={route.component}
                                            isLogin={!!userDetails.token}
                                            isPrivate={route.isPrivate}
                                        />
                                    ))}
                                </div>
                            </div>
                        </section>
                    </>
                </Switch>
            }
        </BrowserRouter>
    );
}

export default Router;
