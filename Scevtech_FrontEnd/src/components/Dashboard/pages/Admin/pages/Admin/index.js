import React from 'react';
import { Switch , Route } from 'react-router-dom';
import Add from './pages/Add/';
import List from './pages/List/';
import AdminContextProvider from './context.js';

const AdminPage = (props) => {
	return(
		<React.Fragment>
			<AdminContextProvider>
				<Switch>
					<Route path="/admin/admin/add" ><Add props={props} /></Route>
					<Route path="/admin/admin/list" ><List /></Route>
				</Switch>
			</AdminContextProvider>
		</React.Fragment>
	);
}

export default AdminPage;
	