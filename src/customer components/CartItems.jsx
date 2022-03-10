import React, { useState, useEffect } from "react";

const CartItems = ({ cartItemsAddition, length }) => {
  const [cost, setCost] = useState(0);
  useEffect(() => {
    let var1 = 0;
    for (let index = 0; index < length; index++) {
      var1 = var1 + cartItemsAddition[index].price;
    }
    setCost(var1);
  }, [cartItemsAddition]);
  if (length > 0) {
    return (
      <>
        <div className="cart-items">
          {cartItemsAddition.map((val) => {
            return (
              <div className="cart-card">
                <div className="cart-card-details">
                  <h2>{val.menuitem}</h2>
                  <p>{val.price}</p>
                </div>
                <div className="counter">
                  <i className="fa fa-trash"></i>
                  <p>11</p>
                  <i className="fa fa-plus-square"></i>
                </div>
              </div>
            );
          })}
        </div>
        <div className="cart-total">
          <div className="cart-total-card">
            <h2>Subtotal</h2>
            <p>{cost}</p>
          </div>
        </div>
      </>
    );
  } else {
    return <div>Nothing here</div>;
  }
};

export default CartItems;
