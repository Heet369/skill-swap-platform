import { NavLink, Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md" aria-label="Main Navigation">
      <Link to="/" className="text-2xl font-bold tracking-wide hover:text-teal-400">
        Skill Swap Platform
      </Link>

      <div className="flex items-center gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-teal-400 font-semibold transition' : 'hover:text-teal-400 transition'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/requests"
          className={({ isActive }) =>
            isActive ? 'text-teal-400 font-semibold transition' : 'hover:text-teal-400 transition'
          }
        >
          Swap Request
        </NavLink>

        <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-teal-500 cursor-pointer">
          {/* Replace with dynamic user avatar */}
          <img
            src="https://i.pravatar.cc/150?img=3"
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;