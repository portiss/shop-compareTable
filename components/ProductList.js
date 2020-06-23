import React from 'react'

/* Left side checkbox component */
class ProductList extends React.PureComponent {

    render() {
        const { products, onCheckBoxChanged } = this.props
        return (
            <div className="list">
                <span className="title">Je Selectie</span>
                {
                    products.map(item => (
                        <label key={item.name} className="checkboxItem">
                            <input type="checkbox"
                                name={item.name}
                                onChange={(e) => onCheckBoxChanged(e, e.target.checked)}
                                checked={item.display}
                            />
                            <span className="checkboxText">{item.name}</span>
                        </label>
                    ))
                }
            </div>
        )
    }
}

export default ProductList
