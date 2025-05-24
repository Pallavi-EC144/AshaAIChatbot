import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChatInterface } from "@/components/chat/ChatInterface";
import { 
  MessageCircle, 
  FileText, 
  GraduationCap, 
  Briefcase, 
  Users, 
  UserCheck,
  LogOut,
  Heart
} from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState("chat");

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.split(" ");
    return parts.map(part => part.charAt(0)).join("").toUpperCase().slice(0, 2);
  };

  const navigationItems = [
    { id: "chat", label: "Chat", icon: MessageCircle },
    { id: "resume", label: "Resume Builder", icon: FileText },
    { id: "courses", label: "Courses", icon: GraduationCap },
    { id: "jobs", label: "Job Search", icon: Briefcase },
    { id: "communities", label: "Communities", icon: Users },
    { id: "mentorship", label: "Mentorship", icon: UserCheck },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
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

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={user?.profileImageUrl} />
                  <AvatarFallback className="bg-gradient-to-r from-purple-600 to-teal-600 text-white">
                    {getInitials(`${user?.firstName || ""} ${user?.lastName || ""}`)}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="font-semibold text-gray-900">
                    {user?.firstName ? `${user.firstName} ${user.lastName || ""}` : "Welcome"}
                  </p>
                  <p className="text-sm text-gray-500">Career Explorer</p>
                </div>
              </div>
              <Button variant="outline" onClick={handleLogout} className="text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-64 flex-shrink-0">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={user?.profileImageUrl} />
                      <AvatarFallback className="bg-gradient-to-r from-purple-600 to-teal-600 text-white">
                        {getInitials(`${user?.firstName || ""} ${user?.lastName || ""}`)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {user?.firstName ? `${user.firstName} ${user.lastName || ""}` : "Welcome User"}
                      </h3>
                      <p className="text-sm text-gray-500">Career Explorer</p>
                    </div>
                  </div>
                  <nav className="space-y-2">
                    {navigationItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => setActiveSection(item.id)}
                          className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                            activeSection === item.id
                              ? "bg-purple-50 text-purple-600"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              {activeSection === "chat" && <ChatInterface />}
              {activeSection === "resume" && (
                <Card className="h-[calc(100vh-120px)]">
                  <CardContent className="p-8 flex flex-col items-center justify-center h-full">
                    <FileText className="h-16 w-16 text-gray-400 mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Resume Builder</h2>
                    <p className="text-gray-600 text-center mb-6 max-w-md">
                      Create a professional resume with AI assistance. Get personalized tips and templates.
                    </p>
                    <Button 
                      onClick={() => window.open("https://www.resume-now.com/", "_blank")}
                      className="bg-gradient-to-r from-purple-600 to-teal-600"
                    >
                      Build Your Resume
                    </Button>
                  </CardContent>
                </Card>
              )}
              {activeSection === "courses" && (
                <Card className="h-[calc(100vh-120px)]">
                  <CardContent className="p-8 flex flex-col items-center justify-center h-full">
                    <GraduationCap className="h-16 w-16 text-gray-400 mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Course Recommendations</h2>
                    <p className="text-gray-600 text-center mb-6 max-w-md">
                      Ask me about any skill you want to learn, and I'll provide personalized course recommendations!
                    </p>
                    <Button onClick={() => setActiveSection("chat")} variant="outline">
                      Start Chat for Recommendations
                    </Button>
                  </CardContent>
                </Card>
              )}
              {activeSection === "jobs" && (
                <Card className="h-[calc(100vh-120px)]">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Women-Focused Job Portals</h2>
                    <div className="grid md:grid-cols-2 gap-6">
                      {[
                        { name: 'Naukri Women Jobs', url: 'https://www.naukri.com/women-jobs', description: 'Dedicated job section for women professionals' },
                        { name: 'GharSeNaukri', url: 'https://www.gharsenaukri.com/', description: 'Work from home opportunities for women' },
                        { name: 'LinkedIn Female Jobs', url: 'https://in.linkedin.com/jobs/female-only-jobs', description: 'Professional network with female-focused opportunities' },
                        { name: 'Herkey', url: 'https://www.herkey.com/', description: 'Freelance and remote work platform' },
                        { name: 'Internshala Women', url: 'https://internshala.com/jobs-for-women/', description: 'Internships and jobs specifically for women' }
                      ].map((portal, index) => (
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
                  </CardContent>
                </Card>
              )}
              {activeSection === "communities" && (
                <Card className="h-[calc(100vh-120px)]">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Join Our Communities</h2>
                    <div className="grid md:grid-cols-2 gap-6">
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
                  </CardContent>
                </Card>
              )}
              {activeSection === "mentorship" && (
                <Card className="h-[calc(100vh-120px)]">
                  <CardContent className="p-8 flex flex-col items-center justify-center h-full">
                    <UserCheck className="h-16 w-16 text-gray-400 mb-4" />
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4">Find a Mentor</h2>
                    <p className="text-gray-600 text-center mb-6 max-w-md">
                      Connect with experienced professionals who can guide your career journey.
                    </p>
                    <Button 
                      onClick={() => window.open("https://www.herkey.com/", "_blank")}
                      className="bg-gradient-to-r from-purple-600 to-teal-600"
                    >
                      Explore Mentorship Programs
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
