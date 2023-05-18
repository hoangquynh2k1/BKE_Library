import React, { Component, useState, useEffect } from 'react'

function ItemList() {
    const items = [
        { id: 1, name: 'Apple', price: 1.99 },
        { id: 2, name: 'Banana', price: 0.99 },
        { id: 3, name: 'Cherry', price: 2.99 },
        { id: 4, name: 'Durian', price: 4.99 }
    ];
    // const items = props.items;
    const [selectedItem, setSelectedItem] = useState(null);

    const handleClick = (item) => {
        setSelectedItem(item);
    }

    const listItems = items.map((item) =>
        <li key={item.id} onClick={() => handleClick(item)}>
            {item.name} - ${item.price}
        </li>
    );
    return (
        <div>
            <ul>{listItems}</ul>
            {selectedItem && <ItemModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
        </div>
    );
}

function ItemModal(props) {
    const item = props.item;
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{item.name}</h2>
                <p>Price: ${item.price}</p>
                <button onClick={props.onClose}>Close</button>
            </div>
        </div>
    );
}
export default ItemList

function modal(props) {
    return (
      <div id="myModal" className="modal">
        <div className="modal-content">
          <div className="row">
  
          </div>
          <span className="close" onClick={() => props.closeModal()}>&times;</span>
          <p>This is the content of the modal.</p>
          <div className="button">
            <div className="button-wrap">
              <button className="cancle" onClick={() => props.closeModal()}>Đóng</button>
              <button className="confirn">Xác nhận</button>
            </div>
          </div>
        </div>
      </div>
    )
  }