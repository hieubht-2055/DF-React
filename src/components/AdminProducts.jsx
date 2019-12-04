import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import { Link } from 'react-router-dom';

class AdminProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    }
  }

  componentDidMount() {
    const { fetchProducts } = this.props;
    fetchProducts();
  }

  render() {
    let products = this.props.adminProducts.products;
    let total_pages = this.props.adminProducts.total_pages;
    let arr_pages = [];


    for(let page = 1; page <= total_pages; page++) {
      arr_pages.push(page);
    }

    const RowProduct = () => (products.map( product => (
      <tr key={product.id + product.name}>
        <th scope="row">{product.id}</th>
        <td>{product.category_name}</td>
        <td><img src={product.image} alt={product.name} /></td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.quantity}</td>
        <td><Link to="#">Edit</Link></td>
      </tr>
    )));

    const handleClickPaginate = props => {
      this.setState({currentPage: props.page});
      this.props.fetchProducts(props);
    }

    const TotalPage = () => (
      arr_pages.map( page => (
        <li key={page} className={'page-item' + (this.state.currentPage === page ? ' active' : '') }>
          <Link to="#" className="page-link" onClick={() => handleClickPaginate({page: page})} data_page={page}>
            {page}
          </Link>
        </li>
      )
    ));
     return (
      <div className="container">
         <div className="row">
          <div className="col-12">
            <h1 className="my-4 admin-title">Products</h1>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Category</th>
                  <th scope="col">Image</th>
                  <th scope="col">Product's Name</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Edit</th>
                </tr>
              </thead>
              <tbody>
                <RowProduct />
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <nav aria-label="Page navigation example">
              <ul className="justify-content-center pagination">
                <TotalPage />
              </ul>
            </nav>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { adminProducts } = state;
  return {
    adminProducts
  };
};

 const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: (page) => {
      dispatch(actions.fetchProducts(page));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminProducts);
