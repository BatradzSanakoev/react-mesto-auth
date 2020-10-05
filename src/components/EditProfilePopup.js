import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const context = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(context.name);
        setDescription(context.about);
    }, [context]);

    function handleNameChange(e) {
        const target = e.target;
        setName(target.value);
    }

    function handleDescriptionChange(e) {
        const target = e.target;
        setDescription(target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser(name, description);
    }

    return (
        <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} buttonName="Сохранить" onSubmit={handleSubmit} >
            <input type="text" name="name" value={name || ''} className="pop-up__input pop-up__input_edit-name" id="edit-name-input" placeholder="Введите имя" required minLength={2} maxLength={40} pattern="[A-Za-zА-Яа-яЁё\s\-]{1,}" onChange={handleNameChange} />
            <span className="pop-up__form-error" id="edit-name-input-error" />
            <input type="text" name="description" value={description || ''} className="pop-up__input pop-up__input_edit-desc" id="edit-desc-input" placeholder="Введите описание" required minLength={2} maxLength={200} onChange={handleDescriptionChange} />
            <span className="pop-up__form-error" id="edit-desc-input-error" />
        </PopupWithForm>
    )
}

export default EditProfilePopup;