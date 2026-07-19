import { useState } from "react";
import { ShipWheelIcon, Mail, Lock, Eye, EyeOff, Globe, MessageSquare, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import useLogin from "../hooks/useLogin";

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { isPending, loginMutation } = useLogin({
    onSuccess: () => {
      toast.success("Login successful!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Login failed");
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  p-4 sm:p-6 lg:p-2 bg-base-200 transition-colors duration-300">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-base-100 rounded-3xl shadow-xl overflow-hidden min-h-[620px] border border-base-300">
        
        {/* LEFT PANEL: APP BRANDING & MOTIVATIONAL SIDEBAR */}
        <div className="relative hidden lg:flex w-1/2 bg-gradient-to-br from-primary to-secondary text-primary-content p-12 flex-col justify-between overflow-hidden">
          {/* Decorative Background Blob Mesh */}
          <div className="absolute inset-0 opacity-15 pointer-events-none select-none">
            <svg className="w-full h-full" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="80" r="160" fill="currentColor" />
              <circle cx="380" cy="540" r="200" fill="currentColor" />
              <circle cx="200" cy="300" r="110" fill="currentColor" />
            </svg>
          </div>

          {/* Top Identity Block */}
          <div className="relative z-10 flex items-center gap-3">
            <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
              <ShipWheelIcon className="size-6 text-primary-content" />
            </div>
            <span className="text-2xl font-black font-mono tracking-wider">BatChit</span>
          </div>

          {/* Center Informational Copy */}
          <div className="relative z-10 my-auto max-w-sm space-y-6">
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Pick Up Exactly Where You Left Off
            </h1>
            <p className="text-primary-content/80 text-sm leading-relaxed font-medium">
              Your global language exchange circle is waiting. Sign back in to instantly connect with native speakers, review your call history, and practice conversational mechanics.
            </p>

            {/* Micro Feature Indicators */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm font-semibold bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5">
                <Globe className="size-4 opacity-80" />
                <span>120+ Active native dialog tracks</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5">
                <MessageSquare className="size-4 opacity-80" />
                <span>Real-time instant translation tools</span>
              </div>
            </div>
          </div>

          {/* Bottom Metatag */}
          <div className="relative z-10 text-xs font-semibold tracking-wide text-primary-content/60 uppercase">
            Fluency comes from actually talking.
          </div>
        </div>

        {/* RIGHT PANEL: INTERACTIVE LOGIN INTERFACE */}
        <div className="w-full lg:w-1/2 p-8 sm:p-16 flex flex-col justify-center">
          <div className="mb-6 flex justify-start">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-base-300 bg-base-200 px-4 py-2 text-sm font-semibold text-base-content/80 transition-colors hover:bg-base-300 hover:text-base-content"
            >
              <ArrowLeft className="size-4" />
              Back 
            </Link>
          </div>
          
          {/* Mobile Identity Viewport */}
          <div className="mb-8 block lg:hidden">
            <div className="flex items-center gap-2.5">
              <ShipWheelIcon className="size-8 text-primary" />
              <span className="text-2xl font-black font-mono tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                BatChit
              </span>
            </div>
          </div>

          {/* Section Headers */}
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-base-content" style={{ fontFamily: "'Syne', sans-serif" }}>
              Welcome Back
            </h2>
            <p className="text-sm text-base-content/60 mt-1.5 font-medium">
              Enter your credential parameters to access your dashboard.
            </p>
          </div>

          {/* Submission Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Field Wrapper */}
            <div className="form-control w-full">
              <label className="input w-full input-bordered flex items-center gap-3 bg-base-200 border-base-300 h-14 rounded-xl focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-all px-4">
                <Mail className="size-5 text-base-content/40 flex-shrink-0" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="grow text-base-content placeholder:text-base-content/40 text-sm font-semibold bg-transparent border-none outline-none"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                />
              </label>
            </div>

            {/* Password Field Wrapper */}
            <div className="form-control w-full">
              <label className="input w-full input-bordered flex items-center gap-3 bg-base-200 border-base-300 h-14 rounded-xl focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-all px-4 relative">
                <Lock className="size-5 text-base-content/40 flex-shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="grow text-base-content placeholder:text-base-content/40 text-sm font-semibold bg-transparent border-none outline-none pr-12"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  tabIndex="-1"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-base-content/40 hover:text-base-content transition-colors"
                >
                  {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                </button>
              </label>
            </div>

            {/* Meta Utility Links */}
            <div className="flex items-center justify-between text-xs sm:text-sm font-medium px-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-base-content/70">
                <input type="checkbox" required className="checkbox checkbox-primary checkbox-xs sm:checkbox-sm rounded-md" />
                <span>Remember this terminal</span>
              </label>
              <a href="#" className="text-primary hover:underline font-bold transition-all">Forgot Password?</a>
            </div>

            {/* Form Actions Button Set */}
            <div className="pt-4 space-y-4">
              <button
                type="submit"
                className="btn btn-primary w-full h-14 min-h-14 rounded-xl border-none shadow-md shadow-primary/20 font-bold text-base tracking-wide text-primary-content hover:scale-[1.01] transition-transform"
                disabled={isPending}
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <span className="loading loading-spinner loading-sm" />
                    <span>Synchronizing session...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>

              <div className="divider text-xs text-base-content/30 font-bold uppercase tracking-widest my-4">Or Connect Via</div>

              <button
                type="button"
                className="btn btn-outline w-full h-14 min-h-14 rounded-xl border border-base-300 text-base-content font-bold hover:bg-base-200 hover:border-base-300 transition-all"
              >
                Continue with alternative auth
              </button>
            </div>
          </form>

          {/* Redirection Router Link */}
          <div className="text-center mt-10">
            <p className="text-sm text-base-content/60 font-medium">
              New to our language ecosystem?{" "}
              <Link to="/signup" className="text-primary hover:underline font-extrabold transition-all ml-1">
                Create Account
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;