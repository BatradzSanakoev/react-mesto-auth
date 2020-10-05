import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatarRef.current.value);
    }

    return (
        <PopupWithForm name="add" title="Обновить аватар" isOpen={isOpen} onClose={onClose} buttonName="Обновить" onSubmit={handleSubmit}>
            <input type="url" name="link" ref={avatarRef} className="pop-up__input pop-up__input_avatar-url" id="avatar-url-input" placeholder="Ссылка на картинку" required />
            <span className="pop-up__form-error" id="avatar-url-input-error" />
        </PopupWithForm>
    )
}

export default EditAvatarPopup;