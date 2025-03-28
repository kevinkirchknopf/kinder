import '../Styles/Profile.css';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const Profile = () => {
    const [userData, setUserData] = useState({
        username: 'john_doe123',
        email: 'john.doe@example.com',
        age: 28,
        bio: 'Software developer who loves hiking and photography.',
        sex: 'male',
        searchedSex: 'female',
        ageRange: [22, 35],
        images: []
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSliderChange = (event, newValue) => {
        setUserData(prev => {
            let [min, max] = newValue;
            // Ensure minimum 1 year difference between values
            if (max - min < 1) {
                const activeThumb = event?.activeThumb || 0;
                if (activeThumb === 0) {
                    min = Math.max(18, max - 1);
                } else {
                    max = Math.min(100, min + 1);
                }
            }
            return { ...prev, ageRange: [min, max] };
        });
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setUserData((prev) => ({ ...prev, images: [...prev.images, ...files] }));
    };

    return (
        <div className="profile-container">
            <h2 className="profile-title">Profil szerkesztése</h2>

            <form className="profile-edit-form" onSubmit={(e) => { e.preventDefault(); alert('Profile updated successfully!'); }}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" name="username" value={userData.username} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" value={userData.email} onChange={handleChange} />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Age</label>
                        <input type="number" name="age" value={userData.age} onChange={handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Sex</label>
                        <select name="sex" value={userData.sex} onChange={handleChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Interested in</label>
                        <select name="searchedSex" value={userData.searchedSex} onChange={handleChange}>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="both">Both</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group full-width">
                        <label>Preferred Age Range: {userData.ageRange[0]} - {userData.ageRange[1]}</label>
                        <div className="age-range-slider-container">
                            <Box sx={{ width: '100%', padding: '0 16px', marginTop: '20px' }}>
                                <Slider
                                    value={userData.ageRange}
                                    onChange={handleSliderChange}
                                    valueLabelDisplay="auto"
                                    min={18}
                                    max={100}
                                    disableSwap
                                    getAriaLabel={() => 'Age range'}
                                    getAriaValueText={(value) => `${value} years`}
                                />
                            </Box>
                        </div>
                    </div>
                </div>

                <div className="form-group full-width">
                    <label>Bio</label>
                    <textarea name="bio" value={userData.bio} onChange={handleChange} />
                </div>

                <div className="form-group full-width">
                    <label>Upload Images</label>
                    <div className="image-upload-box" onClick={() => document.getElementById("hiddenFileInput").click()} >
                        Click here or drag & drop images
                    </div>
                    <input 
                        type="file" 
                        id="hiddenFileInput"
                        multiple 
                        accept="image/*" 
                        onChange={handleImageUpload} 
                        style={{ display: "none" }} 
                    />
                    <div className="image-preview">
                        {userData.images.map((image, index) => (
                            <img key={index} src={URL.createObjectURL(image)} alt="Uploaded Preview" className="preview-img" />
                        ))}
                    </div>
                </div>

                <button type="submit" className="save-button">Save Changes</button>
            </form>
        </div>
    );
};

export default Profile;