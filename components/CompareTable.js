import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons"

import { loadProducts, toggleDisplayProduct } from '../reducers/products'
import ProductList from './ProductList'

const RenderRow = (props) => {

    return props.data.map((val, idx) => {
        /* set this for future extend the options of 'type' and use different processing */
        switch (props.type) {
            case 'img':
                val = val.split('|').map((pic) => <img key={`${pic}${idx}`} className="cell-img" src={pic}></img>)
                break;
        }
        return <td key={idx}>{val}</td>
    })
}

class CompareTable extends React.PureComponent {

    async componentDidMount() {
        await this.props.loadProducts()
    }

    renderTableData(dataTable) {
        /* render dataTable by the flatten array for each row */
        return dataTable.map(({ title, cols, diff }, idx) => {
            let type
            switch (title) {
                case 'badges':
                    type = 'img'
                    break
                default:
                    type = 'text'
            }
            return (<tr key={idx} style={{ backgroundColor: diff ? 'lightgray' : '' }}>
                <td>{title}</td>
                <RenderRow type={type} data={cols} />
            </tr>)
        })
    }

    renderTableHeader(filteredProducts) {
        return filteredProducts.map((product, idx) => {
            return <th key={idx}>
                <FontAwesomeIcon className="trash-icon" icon={faTrash}
                 onClick={()=>this.props.toggleDisplayProduct(product.name)}/>
                <img className="img" src={product.productImage} />
                <div className="name">{product.name}</div>
                <div className="price">{product.listPrice}</div>
                <hr />
            </th>
        })
    }

    /* Filter products by display property */
    filterProducts = () => {
        return this.props.products.filter((p) => p.display)
    }

    /*
        This callback dispach to stor and generate the display with filtered data

        Fired by 2 options:
            1. ProductList component once a checkbox clicked.
            2. By the trash icon on each header product
     */
    onCheckBoxChanged = (event) => this.props.toggleDisplayProduct(event.target.name)

    render() {
        const { dataTable, products } = this.props
        let filteredProducts = []
        if (products) {
            filteredProducts = this.filterProducts()
        }
        return (
            filteredProducts && (
                <div>
                    <h1>{`${filteredProducts.length} Producten vergelijken`}</h1>
                    <div>
                        <table className="products">
                            <tbody>
                                <tr className="header">
                                    <th>
                                        {products &&
                                            <ProductList products={products}
                                                onCheckBoxChanged={this.onCheckBoxChanged} />}
                                    </th>
                                    {this.renderTableHeader(filteredProducts)}
                                </tr>
                                {this.renderTableData(dataTable)}
                            </tbody>
                        </table>
                    </div>
                </div>)
        )
    }
}

/* Redux - attached to update to/from store */
const stateToProps = state => ({
    products: state.products.collection,
    dataTable: state.products.dataTable
})

const dispatchToProps = dispatch => ({
    loadProducts: () => dispatch(loadProducts()),
    toggleDisplayProduct: (name) => dispatch(toggleDisplayProduct(name)),
})

/* Connect to redux store */
export default connect(stateToProps, dispatchToProps)(CompareTable)
