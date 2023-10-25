import React from 'react'
import './CheckoutItemMolecule.style.scss'

const CheckoutItemMolecule = ({imageUrl,product_name,Item_price,quantity}) => {
  return (
    <div className="cart-item-checkout">
      <div className="cart-item-image">
        <img src={imageUrl} alt="product" />
      </div>
      <div className="cart-item-details">
        <div>
          <p>{product_name}</p>
          <div className="cart-item-quantity-price">
            <p>Quantity : {quantity}</p>
          </div>
        </div>
        <div>
        <h4>${Item_price}</h4>
        </div>
      </div>
    </div>
  )
}

export default CheckoutItemMolecule