import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-6 shadow-lg">
      <h3 className="text-2xl font-bold mb-8 border-b pb-2">Task Tracker</h3>
      <ul className="space-y-4">
        <li>
          <Link
            to="/"
            className="block px-4 py-2 rounded hover:bg-gray-700 transition duration-200"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/task"
            className="block px-4 py-2 rounded hover:bg-gray-700 transition duration-200"
          >
            Task
          </Link>
        </li>
        <li>
          <Link
            to="/users"
            className="block px-4 py-2 rounded hover:bg-gray-700 transition duration-200"
          >
            User
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;
