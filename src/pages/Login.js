

const Login = () => {


    return(
        <div className="h-screen bg-gray-100 flex justify-center items-center flex-col font-sans">
        <div className=" rounded-[10px] w-[80%] sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 2xl:w-1/6 h-fit text-center p-[24px] bg-gray-100 text-black shadow-lg border border-gray-400">
          <h2 className="font-extrabold text-2xl text-blue-800 mb-1">LOGIN</h2>
          <p className="text-xs mb-[30px]">Welcome to Flight Management System</p>
          <form
            // onSubmit={handleSubmit}
            className="gap-4 flex justify-center items-center flex-col"
          >
            <input
              className="w-full px-[20px] py-[10px] rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300"
              type="text"
              placeholder="Username"
            //   value={username}
            //   onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              className="w-full px-[20px] py-[10px] rounded-md mb-1 border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 transition duration-300"
              type="password"
              placeholder="Password"
            //   value={password}
            //   onChange={(e) => setPassword(e.target.value)}
              required
            />
  
            <button
              type="submit"
              className="mt-[10px] w-[100%] px-[20px] py-[10px] rounded-md bg-blue-800 text-white hover:bg-blue-600 transition ease-in duration-300"
            >
              Log in
            </button>
            <hr className="w-full"></hr>
            {/* <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={() => {
                console.log("Google Login Failed");
              }}
            /> */}
          </form>
        </div>
        {/* <Link to="/register">
          <h3 className="mt-[10px] text-sm">
            New to iRenta?{" "}
            <span className="text-blue-600 hover:underline font-bold">
              Sign Up
            </span>
          </h3>
        </Link> */}
      </div>
    );
};

export default Login;