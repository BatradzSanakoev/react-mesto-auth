import React from 'react';
import Delete from '../images/del.svg';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card({ _id, link, name, likes, owner, onCardClick, onCardLike, onCardDelete }) {
    const card = { _id: _id, link: link, name: name, owner: owner, likes: likes };
    const context = React.useContext(CurrentUserContext);
    const isOwn = owner._id === context._id;
    const isLiked = likes.some(i => i._id === context._id);

    const cardDeleteButtonClassName = (
        `element__del ${isOwn ? '' : 'element__del_hidden'}`
    );
    const cardLikeButtonClassName = (
        `element__like ${isLiked ? 'element__like_liked' : ''}`
    );

    function handleClick() {
        onCardClick(card);
    }

    function handleCardLike() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <div className="element">
            <div className="element__container">
                <img src={Delete} alt="удалить" className={cardDeleteButtonClassName} onClick={handleDeleteClick } />
                <img className="element__photo" src={link} alt={name} onClick={handleClick} />
            </div>
            <div className="element__bottom">
                <p className="element__name">{name}</p>
                <div className="element__likes">
                    <button className={cardLikeButtonClassName} onClick={handleCardLike} />
                    <p className="element__like-count">{likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;