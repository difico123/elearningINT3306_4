import React, { useState,useEffect } from "react";
import "./popup.css";

export default function Popup(props) {
  const [modal, setModal] = useState(false);
  const {toggle, setToggle, header, body, footer} = props;


  const toggleModal = () => {
    // setModal(!modal);
    setToggle(!toggle)
  };

  if(toggle) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }


  return (
    <>
      {toggle && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <div className="modal-header">
                {header}
            </div>
            <div className="modal-body">
              {body}
            </div>
            <div className="modal-footer">
              {footer}
            </div>
            <button className="close-modal" onClick={toggleModal}>
              Đóng
            </button>
          </div>
        </div>
      )}
    </>
  );
}


