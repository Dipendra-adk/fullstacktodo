
import React, { useEffect, useState } from 'react';
import { fetchUserProfile, updateProfile } from '../api';
import { useAuthState } from '../contexts/AuthContext';

const Profile = () => {
  const { user } = useAuthState();
  const [phone, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await fetchUserProfile();
        setPhone(profileData.phone_number || '');
        // setProfilePicture(profileData.profile_picture); // handle profile picture separately
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const profileData = { phone_number: phone };
      await updateProfile(profileData);
      setSuccessMessage('Profile updated successfully.');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <p>Welcome, {user.username}</p>
      <form onSubmit={handleUpdateProfile}>
        <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
        {/* Add profile picture upload field */}
        <button type="submit">Update Profile</button>
      </form>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
};

export default Profile;
