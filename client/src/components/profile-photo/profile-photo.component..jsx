import React, { useState } from 'react';

import './profile-photo.styles.scss';

const ProfilePhoto = ({ photoURL, setFile }) => {
    const [imageURI, setImageURI] = useState(photoURL);

    const handleChange = event => {
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = event => {
                setImageURI(event.target.result);
            };
            reader.readAsDataURL(event.target.files[0]);

            setFile(event.target.files[0]);
        }
    };

    return (
        <div className="profile-photo">
            <label className="profile-photo__label">Profile Photo</label>
            <div className="profile-photo__content">
                <div className="profile-photo__image-container">
                    <img
                        src={
                            imageURI.startsWith('https')
                                ? imageURI
                                : imageURI.startsWith('user')
                                ? `/img/users/${imageURI}`
                                : imageURI
                        }
                        alt="user"
                        className="profile-photo__image"
                    />
                </div>
                <input
                    type="file"
                    accept="image/*"
                    className="profile-photo__input"
                    id="photo"
                    onChange={handleChange}
                />
                <label htmlFor="photo" className="profile-photo__input-label">
                    Choose New Photo
                </label>
            </div>
        </div>
    );
};

export default ProfilePhoto;
