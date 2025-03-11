import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
          throw new Error('User not logged in');
        }

        const response = await axios.get(`http://localhost:5001/api/users/profile/${userEmail}`);
        setUserProfile(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Error fetching profile');
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (!userProfile) {
    return <div className="text-center p-4">No profile data found</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex flex-col items-center">
            {userProfile.profileImage ? (
              <img 
                src={userProfile.profileImage} 
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover mb-4"
              />
            ) : (
              <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center mb-4">
                <span className="text-4xl text-gray-600">
                  {userProfile.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <h2 className="text-2xl font-bold text-gray-800">{userProfile.name}</h2>
            <p className="text-gray-600 mb-4">{userProfile.email}</p>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold">Addresses</h3>
              <button
                onClick={() => navigate('/add-address')}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Add New Address
              </button>
            </div>
            {userProfile.addresses && userProfile.addresses.length > 0 ? (
              <div className="space-y-4">
                {userProfile.addresses.map((address, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold mr-2 px-2.5 py-0.5 rounded">
                          {address.addressType}
                        </span>
                        <p className="mt-2">{address.address1}</p>
                        {address.address2 && <p>{address.address2}</p>}
                        <p>{address.city}</p>
                        <p>{address.zipCode}</p>
                        <p>{address.country}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No addresses added yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;