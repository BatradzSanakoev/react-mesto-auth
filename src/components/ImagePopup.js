import React from 'react';
import Close from '../images/close.png';

function ImagePopup({cardName, cardLink, isOpen, onClose}) {
    return (
        <section className={`pop-up image-popup ${isOpen ? 'pops-visible' : ''}`}>
            <div className="image-popup__container">
                <button className="pop-up__close-button image-popup__close-button" onClick={onClose}>
                    <img src={isOpen ? Close : ''} alt={isOpen ? 'Закрыть' : ''} className="image-popup__close-icon pop-up__close-icon" />
                </button>
                <img className="image-popup__image" src={isOpen ? cardLink : ''} alt={isOpen ? cardName : ''} />
                <p className="image-popup__name">{isOpen ? cardName : ''}</p>
            </div>
        </section>
    )
}

export default ImagePopup;