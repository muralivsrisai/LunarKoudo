import { useNavigate } from 'react-router-dom';
import { BookOpen, GraduationCap, Library, Users, ArrowRight, CheckCircle } from 'lucide-react';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <nav className="bg-white/80 backdrop-blur-md shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-2.5 rounded-xl shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
              LunarKoudo
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-slate-700 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Browse Materials
              </button>
              <button
                onClick={() => navigate('/admin')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Admin Portal
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Your Gateway to
              <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Academic Excellence
              </span>
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Access a comprehensive collection of study materials, course resources, and academic content
              from top institutions. Everything you need for your educational journey, all in one place.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center space-x-2"
            >
              <span>Explore Study Materials</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
              <div className="bg-gradient-to-br from-blue-100 to-blue-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <GraduationCap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Multiple Colleges</h3>
              <p className="text-slate-600 leading-relaxed">
                Browse materials from various prestigious institutions and find resources tailored to your specific college and program.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
              <div className="bg-gradient-to-br from-green-100 to-green-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Library className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Organized Courses</h3>
              <p className="text-slate-600 leading-relaxed">
                Every course is meticulously organized with detailed descriptions, making it easy to find exactly what you need.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100">
              <div className="bg-gradient-to-br from-orange-100 to-orange-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Easy Access</h3>
              <p className="text-slate-600 leading-relaxed">
                Download PDFs and study materials instantly. No registration required, completely free to use for all students.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose LunarKoudo?</h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">
              We're committed to making quality education accessible to everyone
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              'Comprehensive collection of study materials',
              'Materials from multiple colleges and universities',
              'Well-organized by courses and subjects',
              'Easy-to-use interface with quick navigation',
              'Free access for all students',
              'Regular updates with new materials',
              'Downloadable PDFs for offline study',
              'Admin-curated quality content'
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 bg-white/10 backdrop-blur-sm rounded-xl p-5 hover:bg-white/20 transition-all duration-300">
                <CheckCircle className="w-6 h-6 text-blue-200 flex-shrink-0 mt-0.5" />
                <span className="text-white font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-slate-900 mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-slate-600 mb-10">
            Join thousands of students who are already using LunarKoudo to excel in their studies
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-5 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 inline-flex items-center space-x-2"
          >
            <span>Get Started Now</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">LunarKoudo</span>
            </div>
            <p className="text-slate-400">
              © 2024 LunarKoudo. Empowering students with knowledge.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
