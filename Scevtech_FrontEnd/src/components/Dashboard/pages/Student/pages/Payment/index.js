import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import List from './pages/List/';
import Detail from './pages/Detail/';
import PaymentContextProvider from './context.js';

class Payment extends Component {
	render() {
		return(
			<React.Fragment>
				<PaymentContextProvider>
					<Switch>
						<Route exact path="/student/payment" component={List} />
						<Route path="/student/payment/:id" component={Detail} />
					</Switch>
				</PaymentContextProvider>
			</React.Fragment>
		);
	}
}

export default Payment;
	