import React , {Component} from 'react';
import { Route , Switch } from 'react-router-dom';

import ContractContextProvider from './context.js';
import Package from './pages/Package/';
import Buy from './pages/Buy/';
import ListContract from './pages/ListContract/';

class Contract extends Component {
	render() {
		return(
			<React.Fragment>
				<ContractContextProvider>
					<Switch>
						<Route path="/school/contract/package" component={Package} />
						<Route path="/school/contract/list" component={ListContract} />
						<Route path="/school/contract/buy/:id" component={Buy} />
					</Switch>
				</ContractContextProvider>
			</React.Fragment>
		);
	}
}

export default Contract;
	