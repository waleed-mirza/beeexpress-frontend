import React, { useState, useEffect } from "react";

const CartItems = ({ cartItemsAddition, length, setCartItemsAddition }) => {
  const [cost, setCost] = useState(0);
  const [flagCheck, setFlagCheck] = useState(false);
  const handleAddition = (index) => {
    let tempData = cartItemsAddition;
    tempData[index].count = tempData[index].count + 1;
    setCartItemsAddition(tempData);
    setFlagCheck(!flagCheck);
  };
  const handleSubtraction = (index) => {
    let tempData = cartItemsAddition;
    let searchId = tempData[index]._id;

    tempData[index].count = tempData[index].count - 1;
    if (tempData[index].count <= 0) {
      for (let i = 0; i < length; i++) {
        if (tempData[i])
          if (tempData[i]._id === searchId) tempData.splice(i, 1);
      }
    }
    setCartItemsAddition(tempData);
    setFlagCheck(!flagCheck);
  };
  useEffect(() => {
    let var1 = 0;
    for (let index = 0; index < length; index++) {
      if (cartItemsAddition[index]) {
        var1 =
          var1 +
          cartItemsAddition[index].price * cartItemsAddition[index].count;
      }
    }
    setCost(var1);
  }, [cartItemsAddition, flagCheck]);
  if (length > 0) {
    return (
      <>
        <div className="cart-items">
          {cartItemsAddition.map((val, index) => {
            return (
              <div className="cart-card">
                <div className="cart-card-details">
                  <h2>{val.menuitem}</h2>
                  <p>{val.price}</p>
                </div>
                <div className="counter">
                  <i
                    className="fa fa-trash"
                    onClick={() => handleSubtraction(index)}
                  ></i>
                  <p>{val.count}</p>
                  <i
                    className="fa fa-plus-square"
                    onClick={() => handleAddition(index)}
                  ></i>
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
