import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getProfile as getAllProfiles } from '../services/profileService'; // Adjust if you renamed

const HomePage = () => {
  const [profiles, setProfiles] = useState([]);
  const [search, setSearch] = useState('');
  const [availability, setAvailability] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const data = await getAllProfiles(); // Fetch all profiles
        setProfiles(data || []);
      } catch (err) {
        toast.error('Failed to load profiles');
      }
    };
    fetchProfiles();
  }, []);

  const handleSearchChange = (e) => setSearch(e.target.value);
  const handleAvailabilityChange = (e) => setAvailability(e.target.value);

  const filteredProfiles = profiles.filter((p) => {
    const matchesName = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesAvailability = availability ? p.availability === availability : true;
    return matchesName && matchesAvailability;
  });

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-teal-400 text-center">Explore Profiles</h1>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search by name or skill..."
            value={search}
            onChange={handleSearchChange}
            className="flex-1 px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:ring-2 focus:ring-teal-500"
          />
          <select
            value={availability}
            onChange={handleAvailabilityChange}
            className="w-full md:w-48 px-4 py-2 rounded bg-gray-800 border border-gray-700"
          >
            <option value="">All Availability</option>
            <option value="weekdays">Weekdays</option>
            <option value="weekends">Weekends</option>
            <option value="evenings">Evenings</option>
          </select>
        </div>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProfiles.length === 0 ? (
            <p className="text-gray-400">No profiles found.</p>
          ) : (
            filteredProfiles.map((profile) => (
              <div
                key={profile._id}
                className="bg-gray-900 p-4 rounded-xl shadow hover:ring-2 hover:ring-teal-500 transition"
              >
                <div className="mb-2">
                  <h3 className="text-lg font-semibold">{profile.name}</h3>
                  <p className="text-sm text-gray-400">{profile.location}</p>
                </div>

                <p className="text-sm text-gray-300 mb-1">
                  <strong>Skills Offered:</strong> {profile.skillsOffered?.join(', ') || 'N/A'}
                </p>
                <p className="text-sm text-gray-300 mb-1">
                  <strong>Skills Wanted:</strong> {profile.skillsWanted?.join(', ') || 'N/A'}
                </p>
                <p className="text-sm text-gray-400">
                  <strong>Availability:</strong> {profile.availability}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => navigate(`/profile/${profile._id}`)}
                    className="flex-1 py-1.5 rounded bg-blue-600 hover:bg-blue-500"
                  >
                    View Profile
                  </button>

                  <button
                    disabled={!localStorage.getItem('token')}
                    className={`flex-1 py-1.5 rounded ${
                      localStorage.getItem('token')
                        ? 'bg-teal-600 hover:bg-teal-500'
                        : 'bg-gray-700 cursor-not-allowed'
                    }`}
                  >
                    Request
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
