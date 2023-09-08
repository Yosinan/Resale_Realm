import React from 'react';

function ProductList({ products, onBookmarkClick, onViewDetailsClick }) {
    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map((product, index) => (
                    <li key={index}>
                        <div>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <button onClick={() => onViewDetailsClick(product)}>View Details</button>
                            <button onClick={() => onBookmarkClick(product)}>Bookmark</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;
