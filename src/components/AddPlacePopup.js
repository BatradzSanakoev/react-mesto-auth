import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace(name, link);
        setName('');
        setLink('');
    }

    function handleChange(e) {
        e.target.name === 'name' ? setName(e.target.value) : setLink(e.target.value);
    }

    return (
        <PopupWithForm name="avatar" title="Новое место" isOpen={isOpen} onClose={onClose} buttonName="Добавить" onSubmit={handleSubmit}>
            <input type="text" name="name" value={name || ''} className="pop-up__input pop-up__input_add-name" id="add-name-input" placeholder="Название" required minLength={1} maxLength={30} onChange={handleChange} />
            <span className="pop-up__form-error" id="add-name-input-error" />
            <input type="url" name="link" value={link || ''} className="pop-up__input pop-up__input_add-url" id="add-url-input" placeholder="Ссылка на картинку" onChange={handleChange} required />
            <span className="pop-up__form-error" id="add-url-input-error" />
        </PopupWithForm>
    )
}

export default AddPlacePopup;