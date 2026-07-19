import { useState } from "react";
import { ShipWheelIcon, User, Mail, Lock, Check, X, Eye, EyeOff, ShieldCheck, Zap, ArrowLeft } from "lucide-react";
import { Link } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const queryClient = useQueryClient();

  // Reactive verification indicators for the password string syntax
  const checks = {
    length: signupData.password.length >= 6,
    hasUpper: /[A-Z]/.test(signupData.password),
    hasNumber: /[0-9]/.test(signupData.password),
  };

  const isPasswordValid = checks.length && checks.hasUpper && checks.hasNumber;

  const { mutate: signupMutation, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Account created successfully! 🎉");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong!");
    },
  });

  const handleSignup = (e) => {
    e.preventDefault();
    if (!isPasswordValid) {
      toast.error("Please ensure your password answers all strength parameters.");
      return;
    }
    signupMutation(signupData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-4 bg-base-200 transition-colors duration-300">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-base-100 rounded-3xl shadow-xl overflow-hidden min-h-[640px] border border-base-300">
        
        {/* LEFT PANEL: INTERACTIVE FORM SECTION */}
        <div className="w-full lg:w-1/2 p-8 sm:p-16 flex flex-col justify-center order-2 lg:order-1">
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
          <div className="mb-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-base-content" style={{ fontFamily: "'Syne', sans-serif" }}>
              Create Account
            </h2>
            <p className="text-sm text-base-content/60 mt-1.5 font-medium">
              Join thousands of learners exchanging languages natively worldwide.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* Full Name */}
            <div className="form-control w-full">
              <label className="input input-bordered flex items-center gap-3 bg-base-200 border-base-300 h-14 rounded-xl focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-all px-4 w-full">
                <User className="size-5 text-base-content/40 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="grow text-base-content placeholder:text-base-content/40 text-sm font-semibold bg-transparent border-none outline-none max-w-fit"
                  value={signupData.fullName}
                  onChange={(e) => setSignupData({ ...signupData, fullName: e.target.value })}
                  required
                />
              </label>
            </div>

            {/* Email */}
            <div className="form-control w-full">
              <label className="input input-bordered flex items-center gap-3 bg-base-200 border-base-300 h-14 rounded-xl focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-all px-4 w-full">
                <Mail className="size-5 text-base-content/40 flex-shrink-0" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="grow text-base-content placeholder:text-base-content/40 text-sm font-semibold bg-transparent border-none outline-none"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  required
                />
              </label>
            </div>

            {/* Password input window */}
            <div className="form-control w-full">
              <label className="input input-bordered flex items-center gap-3 bg-base-200 border-base-300 h-14 rounded-xl focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-all px-4 relative w-full">
                <Lock className="size-5 text-base-content/40 flex-shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Secure Password"
                  className="grow text-base-content placeholder:text-base-content/40 text-sm font-semibold bg-transparent border-none outline-none pr-12"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
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

            {/* Password Criteria Real-Time Checklist */}
            {signupData.password.length > 0 && (
              <div className="bg-base-200 rounded-2xl p-4 space-y-2 text-xs border border-base-300/50 transition-all duration-300">
                <p className="font-bold text-base-content/70 mb-1">Password parameters:</p>
                <div className="flex items-center gap-2">
                  {checks.length ? <Check className="size-4 text-success font-bold" /> : <X className="size-4 text-error font-bold" />}
                  <span className={checks.length ? "text-success font-semibold" : "text-base-content/50"}>Minimum 6 characters long</span>
                </div>
                <div className="flex items-center gap-2">
                  {checks.hasUpper ? <Check className="size-4 text-success font-bold" /> : <X className="size-4 text-error font-bold" />}
                  <span className={checks.hasUpper ? "text-success font-semibold" : "text-base-content/50"}>Contains an uppercase letter (A-Z)</span>
                </div>
                <div className="flex items-center gap-2">
                  {checks.hasNumber ? <Check className="size-4 text-success font-bold" /> : <X className="size-4 text-error font-bold" />}
                  <span className={checks.hasNumber ? "text-success font-semibold" : "text-base-content/50"}>Contains at least 1 number (0-9)</span>
                </div>
              </div>
            )}

            {/* Legal Agreement */}
            <div className="form-control px-1">
              <label className="label cursor-pointer justify-start gap-3 items-start select-none">
                <input type="checkbox" required className="checkbox checkbox-primary checkbox-xs sm:checkbox-sm rounded-md mt-0.5" required />
                <span className="text-xs text-base-content/70 leading-normal font-medium">
                  I agree to the <span className="text-primary font-bold hover:underline cursor-pointer">Terms of Service</span> and <span className="text-primary font-bold hover:underline cursor-pointer">Privacy Policy</span>.
                </span>
              </label>
            </div>

            {/* Action buttons */}
            <div className="pt-2">
              <button 
                type="submit" 
                className="btn btn-primary w-full h-14 min-h-14 rounded-xl border-none shadow-md shadow-primary/20 font-bold text-base tracking-wide text-primary-content hover:scale-[1.01] transition-transform"
                disabled={isPending}
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <span className="loading loading-spinner loading-sm" />
                    <span>Configuring dashboard...</span>
                  </div>
                ) : (
                  "Create Account"
                )}
              </button>
            </div>
          </form>

          {/* Router redirect link */}
          <div className="text-center mt-8">
            <p className="text-sm text-base-content/60 font-medium">
              Already a member of our circle?{" "}
              <Link to="/login" className="text-primary hover:underline font-extrabold transition-all ml-1">
                Sign In
              </Link>
            </p>
          </div>
        </div>

        {/* RIGHT PANEL: GEOMETRIC COMPLEMENT GRAPHIC */}
        <div className="relative hidden lg:flex w-1/2 bg-gradient-to-br from-secondary to-primary text-primary-content p-12 flex-col justify-between overflow-hidden order-1 lg:order-2">
          {/* Reverse Wave Geometric Mesh */}
          <div className="absolute inset-0 opacity-15 pointer-events-none select-none">
            <svg className="w-full h-full" viewBox="0 0 400 600" xmlns="http://www.w3.org/2000/svg">
              <circle cx="360" cy="80" r="170" fill="currentColor" />
              <circle cx="50" cy="500" r="190" fill="currentColor" />
              <circle cx="240" cy="320" r="100" fill="currentColor" />
            </svg>
          </div>

          <div className="relative z-10 flex items-center justify-end gap-3">
            <span className="text-2xl font-black font-mono tracking-wider">BatChit</span>
            <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
              <ShipWheelIcon className="size-6 animate-spin-slow text-primary-content" />
            </div>
          </div>

          <div className="relative text-left z-10 my-auto ml-auto max-w-sm space-y-6 ">
            <h1 className="text-4xl font-extrabold tracking-tight leading-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              Unlock True Native Fluency
            </h1>
            <p className="text-justify text-primary-content/80 text-sm leading-relaxed font-medium">
              Ditch the generic flashcard apps. Build your language proficiency by leaping straight into immersive, peer-to-peer visual and auditory exchanges.
            </p>

            {/* Micro Feature Indicators */}
            <div className="space-y-3 pt-2 ">
              <div className="text-left flex items-center gap-3 text-sm font-semibold bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5 ">
                <ShieldCheck className="size-4 opacity-80" />
                <span>Secure, moderated video spaces</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-semibold bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/5 ">
                <Zap className="size-4 opacity-80" />
                <span>Instant structural feedback loops</span>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-xs font-semibold tracking-wide text-primary-content/60 uppercase text-right">
            Master systems through dynamic usage.
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUpPage;