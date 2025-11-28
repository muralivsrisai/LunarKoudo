import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, ArrowLeft, Plus, Trash2, Building2, BookOpenCheck, FileUp, Loader } from 'lucide-react';

function AdminPanel() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('colleges');
  const [colleges, setColleges] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [collegeForm, setCollegeForm] = useState({
    name: '',
    description: '',
    location: '',
    established: ''
  });

  const [courseForm, setCourseForm] = useState({
    collegeId: '',
    name: '',
    code: '',
    description: '',
    department: '',
    duration: ''
  });

  const [materialForm, setMaterialForm] = useState({
    courseId: '',
    title: '',
    description: '',
    file: null
  });

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) navigate("/admin-login");
  }, []);
  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("adminToken");

const [collegesRes, coursesRes] = await Promise.all([
  axios.get('https://lunarkoudobackend.onrender.com/api/colleges', {
    headers: { Authorization: token }
  }),
  axios.get('https://lunarkoudobackend.onrender.com/api/courses', {
    headers: { Authorization: token }
  })
]);

      setColleges(collegesRes.data);
      setCourses(coursesRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddCollege = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://lunarkoudobackend.onrender.com/api/colleges', collegeForm);
      alert('College added successfully!');
      setCollegeForm({ name: '', description: '', location: '', established: '' });
      fetchData();
    } catch (error) {
      alert('Error adding college: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('https://lunarkoudobackend.onrender.com/api/courses', courseForm);
      alert('Course added successfully!');
      setCourseForm({ collegeId: '', name: '', code: '', description: '', department: '', duration: '' });
      fetchData();
    } catch (error) {
      alert('Error adding course: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadMaterial = async (e) => {
    e.preventDefault();
    if (!materialForm.file) {
      alert('Please select a file');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('courseId', materialForm.courseId);
    formData.append('title', materialForm.title);
    formData.append('description', materialForm.description);
    formData.append('file', materialForm.file);

    try {
      await axios.post('https://lunarkoudobackend.onrender.com/api/materials', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Material uploaded successfully!');
      setMaterialForm({ courseId: '', title: '', description: '', file: null });
      e.target.reset();
    } catch (error) {
      alert('Error uploading material: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCollege = async (id) => {
    if (!window.confirm('Are you sure you want to delete this college?')) return;
    try {
      await axios.delete(`https://lunarkoudobackend.onrender.com/api/colleges/${id}`);
      fetchData();
    } catch (error) {
      alert('Error deleting college: ' + error.message);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course?')) return;
    try {
      await axios.delete(`https://lunarkoudobackend.onrender.com/api/courses/${id}`);
      fetchData();
    } catch (error) {
      alert('Error deleting course: ' + error.message);
    }
  };

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
                LunarKoudo Admin
              </span>
            </div>
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-slate-700 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">Admin Panel</h1>
          <p className="text-xl text-slate-600">Manage colleges, courses, and study materials</p>
        </div>

        <div className="flex space-x-2 mb-8 bg-white p-2 rounded-xl shadow-md w-fit">
          <button
            onClick={() => setActiveTab('colleges')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'colleges'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5" />
              <span>Colleges</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'courses'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center space-x-2">
              <BookOpenCheck className="w-5 h-5" />
              <span>Courses</span>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('materials')}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              activeTab === 'materials'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center space-x-2">
              <FileUp className="w-5 h-5" />
              <span>Materials</span>
            </div>
          </button>
        </div>

        {activeTab === 'colleges' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
                <Plus className="w-6 h-6 text-blue-600" />
                <span>Add New College</span>
              </h2>
              <form onSubmit={handleAddCollege} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">College Name</label>
                  <input
                    type="text"
                    required
                    value={collegeForm.name}
                    onChange={(e) => setCollegeForm({ ...collegeForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                    placeholder="Enter college name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                  <textarea
                    required
                    value={collegeForm.description}
                    onChange={(e) => setCollegeForm({ ...collegeForm, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 h-24"
                    placeholder="Enter college description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={collegeForm.location}
                    onChange={(e) => setCollegeForm({ ...collegeForm, location: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                    placeholder="Enter location"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Established Year</label>
                  <input
                    type="number"
                    value={collegeForm.established}
                    onChange={(e) => setCollegeForm({ ...collegeForm, established: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                    placeholder="Enter year"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                  <span>{loading ? 'Adding...' : 'Add College'}</span>
                </button>
              </form>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Existing Colleges</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {colleges.map((college) => (
                  <div
                    key={college._id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-900">{college.name}</h3>
                      <p className="text-sm text-slate-500">{college.location}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteCollege(college._id)}
                      className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
                <Plus className="w-6 h-6 text-blue-600" />
                <span>Add New Course</span>
              </h2>
              <form onSubmit={handleAddCourse} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Select College</label>
                  <select
                    required
                    value={courseForm.collegeId}
                    onChange={(e) => setCourseForm({ ...courseForm, collegeId: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                  >
                    <option value="">Choose a college</option>
                    {colleges.map((college) => (
                      <option key={college._id} value={college._id}>
                        {college.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Course Name</label>
                  <input
                    type="text"
                    required
                    value={courseForm.name}
                    onChange={(e) => setCourseForm({ ...courseForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                    placeholder="Enter course name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Course Code</label>
                  <input
                    type="text"
                    required
                    value={courseForm.code}
                    onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                    placeholder="e.g., CS101"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                  <textarea
                    required
                    value={courseForm.description}
                    onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 h-24"
                    placeholder="Enter course description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Department</label>
                  <input
                    type="text"
                    value={courseForm.department}
                    onChange={(e) => setCourseForm({ ...courseForm, department: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                    placeholder="e.g., Computer Science"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Duration</label>
                  <input
                    type="text"
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                    placeholder="e.g., 4 years"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? <Loader className="w-5 h-5 animate-spin" /> : <Plus className="w-5 h-5" />}
                  <span>{loading ? 'Adding...' : 'Add Course'}</span>
                </button>
              </form>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Existing Courses</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {courses.map((course) => (
                  <div
                    key={course._id}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-900">{course.name}</h3>
                      <p className="text-sm text-slate-500">{course.code} - {course.collegeId?.name}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteCourse(course._id)}
                      className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'materials' && (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center space-x-2">
                <FileUp className="w-6 h-6 text-blue-600" />
                <span>Upload Study Material</span>
              </h2>
              <form onSubmit={handleUploadMaterial} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Select Course</label>
                  <select
                    required
                    value={materialForm.courseId}
                    onChange={(e) => setMaterialForm({ ...materialForm, courseId: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                  >
                    <option value="">Choose a course</option>
                    {courses.map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.name} ({course.code})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Material Title</label>
                  <input
                    type="text"
                    required
                    value={materialForm.title}
                    onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200"
                    placeholder="Enter material title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Description</label>
                  <textarea
                    required
                    value={materialForm.description}
                    onChange={(e) => setMaterialForm({ ...materialForm, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 h-24"
                    placeholder="Enter material description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Upload File (PDF, DOC, PPT)</label>
                  <input
                    type="file"
                    required
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                    onChange={(e) => setMaterialForm({ ...materialForm, file: e.target.files[0] })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-50 file:text-blue-700 file:font-semibold hover:file:bg-blue-100"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {loading ? <Loader className="w-5 h-5 animate-spin" /> : <FileUp className="w-5 h-5" />}
                  <span>{loading ? 'Uploading...' : 'Upload Material'}</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPanel;
