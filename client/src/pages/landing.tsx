import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, FileText, Users, Briefcase, Heart, Star } from "lucide-react";

export default function Landing() {
  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const jobPortals = [
    { name: 'Naukri Women Jobs', url: 'https://www.naukri.com/women-jobs', description: 'Dedicated job section for women professionals' },
    { name: 'GharSeNaukri', url: 'https://www.gharsenaukri.com/', description: 'Work from home opportunities for women' },
    { name: 'LinkedIn Female Jobs', url: 'https://in.linkedin.com/jobs/female-only-jobs', description: 'Professional network with female-focused opportunities' },
    { name: 'Herkey', url: 'https://www.herkey.com/', description: 'Freelance and remote work platform' },
    { name: 'Internshala Women', url: 'https://internshala.com/jobs-for-women/', description: 'Internships and jobs specifically for women' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-teal-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Heart className="text-white h-5 w-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AshaAI</h1>
                <p className="text-xs text-gray-500">Career Companion</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-purple-600 transition-colors">Home</a>
              <a href="#features" className="text-gray-700 hover:text-purple-600 transition-colors">Features</a>
              <a href="#communities" className="text-gray-700 hover:text-purple-600 transition-colors">Communities</a>
              <a href="#jobs" className="text-gray-700 hover:text-purple-600 transition-colors">Job Portals</a>
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={handleLogin} className="border-purple-600 text-purple-600 hover:bg-purple-50">
                Login
              </Button>
              <Button onClick={handleLogin} className="bg-gradient-to-r from-purple-600 to-teal-600 text-white hover:opacity-90">
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
            <div className="text-center mb-16">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Empowering <span className="bg-gradient-to-r from-purple-600 to-teal-600 bg-clip-text text-transparent">Indian Women</span><br />
                in Their Career Journey
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                Get personalized career guidance, course recommendations, and mentorship opportunities. 
                Break barriers, not stereotypes. Every career path is yours to explore.
              </p>
              <div className="flex justify-center space-x-4">
                <Button onClick={handleLogin} size="lg" className="bg-gradient-to-r from-purple-600 to-teal-600 text-white hover:opacity-90">
                  Get Started
                </Button>
                <Button variant="outline" size="lg" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                  Learn More
                </Button>
              </div>
            </div>

            {/* Features Grid */}
            <div id="features" className="grid md:grid-cols-3 gap-8 mb-20">
              <Card className="hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-teal-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <GraduationCap className="text-white h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Course Recommendations</h3>
                  <p className="text-gray-600">Get personalized course suggestions based on your interests and career goals. From Java to Data Science, explore all possibilities.</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-600 to-pink-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <FileText className="text-white h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Resume Builder</h3>
                  <p className="text-gray-600">Create professional resumes with AI assistance. Get tips and guidance for crafting the perfect resume for your dream job.</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-shadow">
                <CardContent className="p-8 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-amber-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                    <Users className="text-white h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Mentorship & Community</h3>
                  <p className="text-gray-600">Connect with mentors and join communities of like-minded women. Network, learn, and grow together.</p>
                </CardContent>
              </Card>
            </div>

            {/* Job Portals Section */}
            <div id="jobs" className="bg-white rounded-2xl p-8 shadow-lg mb-20">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Women-Focused Job Portals</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobPortals.map((portal, index) => (
                  <a
                    key={index}
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 border-2 border-gray-200 rounded-lg hover:border-purple-600 transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{portal.name}</h3>
                    <p className="text-gray-600 text-sm">{portal.description}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Communities Section */}
            <div id="communities" className="bg-gradient-to-r from-purple-50 to-teal-50 rounded-2xl p-8 mb-20">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Join Our Communities</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Tech Sisters</h3>
                    <p className="text-gray-600 mb-4">Connect with women in technology, share experiences, and learn together.</p>
                    <Button className="bg-purple-600 text-white hover:bg-purple-700">Join Community</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Career Changers</h3>
                    <p className="text-gray-600 mb-4">Support group for women transitioning between careers and industries.</p>
                    <Button className="bg-teal-600 text-white hover:bg-teal-700">Join Community</Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
