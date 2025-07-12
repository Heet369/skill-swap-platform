import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleProfile } from '../services/profileService';
import { toast } from 'react-toastify';

const PublicProfilePage = () => {
  const { id } = useParams(); // User ID from route
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        console.log('Fetching profile for ID:', id); // Debugging
        const data = await getSingleProfile(id);
        setProfile(data);
      } catch (err) {
        console.error(err); // Debugging
        toast.error('Failed to load profile');
      }
    };

    if (id) {
      fetchProfile();
    } else {
      toast.error('Invalid profile ID');
    }
  }, [id]);

  const handleRequest = () => {
    toast.success('Skill Swap Request Sent!');
    // TODO: Implement actual request logic via backend
  };

  if (!profile) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-2xl mx-auto bg-gray-900 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-teal-400 mb-4">
          {profile.name}'s Profile
        </h2>
        <p className="text-sm text-gray-400 mb-1">
          <strong>Location:</strong> {profile.location}
        </p>
        <p className="text-sm text-gray-400 mb-1">
          <strong>Email:</strong> {profile.email}
        </p>
        <p className="text-sm text-gray-400 mb-1">
          <strong>Availability:</strong> {profile.availability}
        </p>

        <div className="my-4">
          <h3 className="text-lg font-semibold text-teal-300 mb-2">Skills Offered</h3>
          <ul className="list-disc ml-5 text-sm text-gray-300">
            {profile.skillsOffered.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="my-4">
          <h3 className="text-lg font-semibold text-teal-300 mb-2">Skills Wanted</h3>
          <ul className="list-disc ml-5 text-sm text-gray-300">
            {profile.skillsWanted.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleRequest}
          disabled={!localStorage.getItem('token')}
          className={`w-full mt-4 py-2 rounded ${
            localStorage.getItem('token')
              ? 'bg-teal-600 hover:bg-teal-500'
              : 'bg-gray-700 cursor-not-allowed'
          }`}
        >
          Request Skill Swap
        </button>
      </div>
    </div>
  );
};

export default PublicProfilePage;