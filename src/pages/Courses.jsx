import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, ArrowLeft, Search, Loader, BookOpenCheck, Clock } from 'lucide-react';

function Courses() {
  const navigate = useNavigate();
  const { collegeId } = useParams();
  const [college, setCollege] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchCollegeAndCourses();
  }, [collegeId]);

  const fetchCollegeAndCourses = async () => {
    try {
      const [collegeRes, coursesRes] = await Promise.all([
        axios.get(`https://lunarkoudobackend.onrender.com/api/colleges/${collegeId}`),
        axios.get(`https://lunarkoudobackend.onrender.com/api/courses?collegeId=${collegeId}`)
      ]);
      setCollege(collegeRes.data);
      setCourses(coursesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      <nav className="bg-white shadow-md">
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
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 text-slate-700 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Colleges</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {college && (
          <div className="mb-12 bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
            <h1 className="text-5xl font-bold text-slate-900 mb-4">{college.name}</h1>
            <p className="text-lg text-slate-600 leading-relaxed">{college.description}</p>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Available Courses</h2>
          <div className="relative max-w-xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses by name, code, or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 shadow-sm"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <BookOpenCheck className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-xl text-slate-500">
              {searchTerm ? 'No courses found matching your search' : 'No courses available yet'}
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                onClick={() => navigate(`/materials/${course._id}`)}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-slate-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-3 rounded-xl">
                    <BookOpenCheck className="w-8 h-8 text-blue-600" />
                  </div>
                  {course.code && (
                    <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                      {course.code}
                    </span>
                  )}
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-700 transition-colors duration-200">
                  {course.name}
                </h3>

                <p className="text-slate-600 mb-6 leading-relaxed line-clamp-3">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-4 mb-6">
                  {course.department && (
                    <div className="flex items-center space-x-2 text-slate-500">
                      <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      <span className="text-sm font-medium">{course.department}</span>
                    </div>
                  )}
                  {course.duration && (
                    <div className="flex items-center space-x-2 text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{course.duration}</span>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <button className="text-blue-600 font-semibold group-hover:text-blue-700 flex items-center space-x-2 transition-colors duration-200">
                    <span>View Study Materials</span>
                    <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
