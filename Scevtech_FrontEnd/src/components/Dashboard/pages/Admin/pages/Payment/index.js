import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import PaymentContextProvider from './context.js';
import Package from './pages/Package/';
import Contract from './pages/Contract/';
import DetailContract from './pages/DetailContract/';
import Bank from './pages/Bank/';
import Wallet from './pages/Wallet/';
import WalletDetail from './pages/WalletDetail/';
import Statistic from './pages/Statistic/';

class Payment extends Component {
	render() {
		return(
			<React.Fragment>
				<PaymentContextProvider>
					<Switch>
						<Route path="/admin/payment/package" component={Package} />
						<Route exact path="/admin/payment/contract" component={Contract} />
						<Route path="/admin/payment/contract/:id" component={DetailContract} />
						<Route path="/admin/payment/bank" component={Bank} />
						<Route exact path="/admin/payment/wallet" component={Wallet} />
						<Route path="/admin/payment/wallet/:id" component={WalletDetail} />
						<Route path="/admin/payment/statistic" component={Statistic} />
					</Switch>
				</PaymentContextProvider>
			</React.Fragment>
		);
	}
}

export default Payment;
	