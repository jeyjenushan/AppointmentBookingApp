import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-green-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full px-8 py-12 text-center">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
          Welcome to the Hospital Management System
        </h1>
        <p className="text-gray-600 mb-8">
          Please choose your role to continue:
        </p>
        <div className="flex flex-col gap-4">
          <Link
            to="/doctorLogin"
            className="bg-primary  text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Doctor Login
          </Link>
          <Link
            to="/adminLogin"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
          >
            Admin Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
