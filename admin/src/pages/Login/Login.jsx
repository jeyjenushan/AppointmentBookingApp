import LoginForm from "../../components/Login/LoginForm";

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col gap-4 m-auto items-start p-8 w-full max-w-md border rounded-xl text-gray-600 text-sm shadow-lg bg-white">
        <h2 className="text-2xl font-semibold m-auto text-gray-800">
          <span className="text-primary">Doctor</span> Login
        </h2>

        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
