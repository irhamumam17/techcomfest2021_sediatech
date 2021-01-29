import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import PaymentContextProvider from './context.js'

import Add from './pages/Add/';
import List from './pages/List/';
import Detail from './pages/Detail/';
import Statistic from './pages/Statistic/';

class Payment extends Component {
	render() {
		return(
			<React.Fragment>
				<PaymentContextProvider>
					<Switch>
						<Route path="/teacher/payment/add" component={Add} />
						<Route path="/teacher/payment/list" component={List} />
						<Route path="/teacher/payment/detail/:id" component={Detail} />
						<Route path="/teacher/payment/statistic" component={Statistic} />
					</Switch>
				</PaymentContextProvider>
			</React.Fragment>
		);
	}
}

export default Payment;
	