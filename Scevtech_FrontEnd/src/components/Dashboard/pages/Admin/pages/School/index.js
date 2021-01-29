import React from 'react';
import { Switch , Route } from 'react-router-dom';

import SchoolContextProvider from './context.js';

import Add from './pages/Add/';
import List from './pages/List/';
import Statistic from './pages/Statistic/';
import Detail from './pages/Detail/';


const School = (props) => {
	return(
		<React.Fragment>
			<SchoolContextProvider>
				<Switch>
					<Route path="/admin/school/add">
						<Add props={props} />
					</Route>
					<Route path="/admin/school/list" component={List} />
					<Route path="/admin/school/detail" component={Detail} />
					<Route path="/admin/school/statistic" component={Statistic} />
				</Switch>
			</SchoolContextProvider>
		</React.Fragment>
	);
}

export default School;
		