import React from 'react';
import Close from '../images/close.png';

function PopupWithForm({ name, title, mod, isOpen, onClose, children, buttonName, onSubmit }) {
    return (
        <section className={`pop-up ${name}-pop ${isOpen && 'pops-visible'}`}>
            <div className='pop-up__container'>
                <button className='pop-up__close-button' onClick={onClose}>
                    <img src={Close} alt='закрыть' className='pop-up__close-icon' />
                </button>
                <form className={`pop-up__form pop-up__form_${name}`} onSubmit={onSubmit} noValidate>
                    <h2 className='pop-up__form-title'>{title}</h2>
                    <fieldset className={`pop-up__form-input pop-up__form-input_${mod}`}>
                        {children}
                        <button type='submit' className='pop-up__button'>{buttonName}</button>
                    </fieldset>
                </form>
            </div>
        </section>
    )
}

export default PopupWithForm;