import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-base-200 min-h-screen">
      {/* Hero Section */}
      <div className="hero min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/random/1600x900')" }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">Welcome to The New York Times</h1>
            <Link to="/register" className="btn btn-primary mr-4">Get Started</Link>
            <Link to="/articles" className="btn btn-outline">Explore Articles</Link>
          </div>
        </div>
      </div>

      
      {/* Call to Action Section */}
      <section className="bg-primary py-12 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="mb-8">Join us today and get the latest news from all over the world..</p>
          <Link to="/register" className="btn btn-secondary btn-lg">Sign Up Now</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
