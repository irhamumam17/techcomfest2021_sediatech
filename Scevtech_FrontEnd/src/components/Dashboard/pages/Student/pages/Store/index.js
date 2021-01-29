import React , {Component} from 'react';
import { Switch , Route } from 'react-router-dom';
import ProductContextProvider from './contexts/ProductContext.js';
import WalletContextProvider from './contexts/WalletContext.js';

import Add from './pages/Add/';
import List from './pages/List/';
import MyStore from './pages/MyStore/';
import EditStore from './pages/EditStore/';
import DetailProduct from './pages/DetailProduct/';
import MyProduct from './pages/MyProduct/';
import Wallet from './pages/Wallet/';
import Order from './pages/Order/';


class Store extends Component {
	render() {
		return(
			<React.Fragment>
				<ProductContextProvider>
					<WalletContextProvider>
						<Switch>
							<Route exact path="/student/store" component={List} />
							<Route path="/student/store/add" component={Add} />
							<Route path="/student/store/detail" component={MyStore} />
							<Route path="/student/store/edit" component={EditStore} />
							<Route path="/student/store/myproduct/:id" component={MyProduct} />
							<Route path="/student/store/product/:id" component={DetailProduct} />
							<Route path="/student/store/wallet" component={Wallet} />
							<Route path="/student/store/order" component={Order} />
						</Switch>
					</WalletContextProvider>
				</ProductContextProvider>
			</React.Fragment>
		);
	}
}

export default Store;
	