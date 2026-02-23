import { Link } from "react-router";
import { MessageCircle, Users, Video, Globe, Shield, Zap, ShipWheelIcon } from "lucide-react";
import ThemeSelector from "../components/ThemeSelector";

const LandingPage = () => {
    const features = [
        {
            icon: <MessageCircle className="w-8 h-8" />,
            title: "Real-time Messaging",
            description: "Practice writing in your target language with instant text chat and receive feedback from language partners."
        },
        {
            icon: <Video className="w-8 h-8" />,
            title: "Video & Audio Calls",
            description: "Improve pronunciation and fluency through high-quality video and audio calls with native speakers."
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Language Partner Network",
            description: "Connect with native speakers and language learners worldwide to practice and exchange languages."
        },
        {
            icon: <Globe className="w-8 h-8" />,
            title: "Multiple Languages",
            description: "Learn and practice any language you want with our global community of speakers from diverse regions."
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Safe Learning Environment",
            description: "Learn comfortably in a secure, private space designed for respectful language exchange and practice."
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Instant Practice",
            description: "Start learning immediately with real-time conversations and instant connection to language partners."
        }
    ];

    return (
        <div className="min-h-screen bg-base-200">
            {/* Hero Section */}
            <div className="navbar bg-base-100 shadow-lg px-4 lg:px-8">
                <div className="flex-1">
                    <Link to="/" className="flex items-center gap-2.5">
                        <ShipWheelIcon className="size-9 text-primary" />
                        <span className="text-2xl lg:text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                            BatChit
                        </span>
                    </Link>
                </div>
                <div className="flex-none flex items-center gap-2">
                    <ThemeSelector />
                    <Link to="/login" className="btn btn-outline">
                        Login
                    </Link>
                    <Link to="/signup" className="btn btn-primary">
                        Sign Up
                    </Link>
                </div>
            </div>

            {/* Hero Content */}
            <div className="hero min-h-[70vh] bg-base-200">
                <div className="hero-content text-center">
                    <div className="max-w-3xl">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            Learn Languages Together
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 text-base-content/80">
                            A multilanguage learning platform where you can practice and master new languages through real-time video and audio calls with native speakers.
                        </p>
                        <div className="flex gap-4 justify-center flex-wrap">
                            <Link to="/signup" className="btn btn-primary btn-lg">
                                Get Started Free
                            </Link>
                            <Link to="/login" className="btn btn-outline btn-lg">
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16 px-4 lg:px-8 max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">Why Choose BatChit?</h2>
                    <p className="text-lg text-base-content/70">
                        Everything you need to master a new language through real conversations
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="card-body items-center text-center">
                                <div className="text-primary mb-4">{feature.icon}</div>
                                <h3 className="card-title text-xl mb-2">{feature.title}</h3>
                                <p className="text-base-content/70">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-base-300 py-16 px-4 lg:px-8">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                        Ready to Start Your Language Journey?
                    </h2>
                    <p className="text-lg mb-8 text-base-content/70">
                        Join thousands of language learners connecting with native speakers worldwide
                    </p>
                    <Link to="/signup" className="btn btn-primary btn-lg">
                        Start Learning Today
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer footer-center p-10 bg-base-100 text-base-content">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <ShipWheelIcon className="w-8 h-8 text-primary" />
                        <span className="text-2xl font-bold">BatChit</span>
                    </div>
                    <p className="font-semibold">
                        Your multilanguage learning platform through real conversations
                    </p>
                    <p className="text-base-content/60">Copyright &copy; {new Date().getFullYear()} - All rights reserved</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
