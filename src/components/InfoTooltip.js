import React from 'react';
import Close from '../images/close.png';

function InfoToolTip({ name, isOpen, onClose, text, icon }) {
    return (
        <section className={`pop-up ${name}-pop ${isOpen && 'pops-visible'}`}>
            <div className='pop-up__container'>
                <button className='pop-up__close-button' onClick={onClose}>
                    <img src={Close} alt='закрыть' className='pop-up__close-icon' />
                </button>
                <div className='auth-check'>
                    <img className='auth-check__img' alt='иконка' src={icon} />
                    <p className='auth-check__text'>{text}</p>
                </div>
            </div>
        </section>
    )
}

export default InfoToolTip;