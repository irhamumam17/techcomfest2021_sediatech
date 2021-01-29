import React , { createContext , Component } from 'react';
import { AuthContext } from '../../../../../contexts/AuthContext.js';
import axios from '../../../../../../../axios.js';

export const ProductContext = createContext();

class ProductContextProvider extends Component
{
	_isMounted = false
	constructor(props) {
		super(props);

		this.state = {
			products: [],
			my_products: [],
			loading: {
				products: true,
				my_products: true,
				del: false,
			}
		}

		this.addProduct    = this.addProduct.bind(this);
		this.uploadImage   = this.uploadImage.bind(this);
		this.detailProduct = this.detailProduct.bind(this);
		this.editProduct   = this.editProduct.bind(this);
		this.editImage     = this.editImage.bind(this);
		this.deleteProduct = this.deleteProduct.bind(this);
		this.buyProduct    = this.buyProduct.bind(this);
		this.getOrder      = this.getOrder.bind(this);
		this.getListOrder  = this.getListOrder.bind(this);
		this.confirmOrder = this.confirmOrder.bind(this);
	}

	componentDidMount() {
		this._isMounted = true;

		// get products
		axios.get(`student/${this.context.id}/product/list ` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		})
			.then(res => {
				if(this._isMounted) {
					this.setState({ 
						products: res.data , 
						loading: {...this.state.loading , products: false}, 
					})
				}
			})

		// get my product
		axios.get(`student/${this.context.id}/product/myproduct` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		})
			.then(res => {
				if(this._isMounted) {
					this.setState({
						my_products: res.data,
						loading: { ...this.state.loading , my_products: false },
					})
				}
			})
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	addProduct = async (newProduct) => {
		let response = await axios.post(`/student/${this.context.id}/product/add ` , newProduct , {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		})
					.then(res => {
						this.setState({
							products: [ ...this.state.products , res.data ],
							my_products: [ ...this.state.my_products , res.data ],
						})
						return res.status;
					}).catch(err => console.log(err));
		return response;
	}

	uploadImage = async (image) => {
		let fd = new FormData();
		fd.append('image' , image);
		let progressContainer = document.getElementById('progress-container');

		let progressBar = document.createElement('div');
		progressBar.classList.add('progressbar');
		let progressStatus = document.createElement('span');
		progressStatus.classList.add('progress-status');
		let valueProgress = document.createElement('div');
		valueProgress.classList.add('progress-value');

		valueProgress.append(progressStatus);
		progressBar.append(valueProgress);
		progressContainer.append(progressBar);

		let response = await axios.post(`/student/${this.context.id}/product/image ` , fd , {
				onUploadProgress: progressEvent => {
					let persentase = Math.round(progressEvent.loaded / progressEvent.total * 100);
					progressBar.lastElementChild.lastElementChild.textContent = `${persentase}%`;
					progressBar.lastElementChild.style.width = parseInt(persentase) + '%';
					if(persentase < 50) { 
						progressBar.classList.add('text-gray-500') 
					} else {
						progressBar.classList.remove('text-gray-500');
						progressBar.classList.add('text-white');
					}

					if(persentase === 100) {
						setTimeout(function() {
							progressBar.style.display = 'none';
						} , 1500);
					}
				},
				headers: {
					Authorization: `Bearer ${this.context.token}`
				}
			})
			.then(res => {
				return res.data;
			}).catch(err => console.error(err));
		return response;
	}

	detailProduct = async (id) => {
		let response = await axios.get(`student/${this.context.id}/product/detail/${id} ` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		})
			.then(res => {
				return res.data;
			});

		return response;
	}

	editProduct = async (data , id) => {
		let response = await axios.put(`student/${this.context.id}/product/update/${id} ` , data , {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		})
			.then(res => {
				return res.data;
			}).catch(err => console.log(err));

		return response;
	}

	editImage = async (image, id) => {
		let progressContainer = document.getElementById('progress-image');

		let progressBar = document.createElement('div');
		progressBar.classList.add('progressbar');
		let progressStatus = document.createElement('span');
		progressStatus.classList.add('progress-status');
		let valueProgress = document.createElement('div');
		valueProgress.classList.add('progress-value');

		valueProgress.append(progressStatus);
		progressBar.append(valueProgress);
		progressContainer.append(progressBar);

		let form = new FormData();
		form.append('image' , image);
		let response = await axios.put(`student/${this.context.id}/product/update/${id}/image` , form , {
				onUploadProgress: progressEvent => {
					let persentase = Math.round(progressEvent.loaded / progressEvent.total * 100);
					progressBar.lastElementChild.lastElementChild.textContent = `${persentase}%`;
					progressBar.lastElementChild.style.width = parseInt(persentase) + '%';
					if(persentase < 50) { 
						progressBar.classList.add('text-gray-500') 
					} else {
						progressBar.classList.remove('text-gray-500');
						progressBar.classList.add('text-white');
					}

					if(persentase === 100) {
						setTimeout(function() {
							progressBar.style.display = 'none';
						} , 1500);
					}
				},
				headers: {
					Authorization: `Bearer ${this.context.token}`
				}
			})
			.then(res => {
				return res.data;
			}).catch(err => console.log(err));

		return response;
	}

	deleteProduct = async (id) => {
		this.setState({ loading: {...this.state.loading , del: true} })
		let response = await axios.delete(`student/${this.context.id}/product/delete/${id} ` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`
			}
		})
			.then(res => {
				this.setState({
					products: this.state.products.filter(product => product.id !== id),
					my_products: this.state.my_products.filter(product => product.id !== id),
				});
				return res.status;
			})
		return response;
	} 

	buyProduct = async (id) => {
		let data = {
			user_id: this.context.id,
			product_id: id,
		}
		let response = await axios.post(`student/${this.context.id}/product/buy/${id}` , data , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			return res.data;
		});

		return response;
	}

	getOrder = async (id) => {
		let response = await axios.get(`student/${this.context.id}/product/order/${id}` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			return res.data;
		})

		return response;
	}

	getListOrder = async () => {
		let response = await axios.get(`student/${this.context.id}/product/order` , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			return res.data;
		})

		return response;
	}

	confirmOrder = async (id) => {
		let response = await axios.put(`student/${this.context.id}/product/order/confirm/${id}` , {id} , {
			headers: {
				Authorization: `Bearer ${this.context.token}`,
			}
		}).then(res => {
			return res.status;
		})

		return response;
 	}

	render() {
		return(
			<ProductContext.Provider value={{
								...this.state,
								addProduct: this.addProduct,
								uploadImage: this.uploadImage,
								detailProduct: this.detailProduct,
								editProduct: this.editProduct,
								editImage: this.editImage,
								deleteProduct: this.deleteProduct,
								buyProduct: this.buyProduct,
								getOrder: this.getOrder,
								getListOrder: this.getListOrder,
								confirmOrder: this.confirmOrder,
			}} >
				{ this.props.children }
			</ProductContext.Provider>
		)
	}
}


ProductContextProvider.contextType = AuthContext;
export default ProductContextProvider;