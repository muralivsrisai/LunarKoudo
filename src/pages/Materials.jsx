import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { BookOpen, ArrowLeft, Download, FileText, Loader, File } from 'lucide-react';

function Materials() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseAndMaterials();
  }, [courseId]);

  const fetchCourseAndMaterials = async () => {
    try {
      const [courseRes, materialsRes] = await Promise.all([
        axios.get(`https://lunarkoudobackend.onrender.com/api/courses/${courseId}`),
        axios.get(`https://lunarkoudobackend.onrender.com/api/materials?courseId=${courseId}`)
      ]);
      setCourse(courseRes.data);
      setMaterials(materialsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDownload = async (fileUrl, fileType, title) => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
  
      const blobUrl = window.URL.createObjectURL(blob);
  
      const safeTitle = title.replace(/[^a-zA-Z0-9 _-]/g, ""); 
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${safeTitle}.${fileType}`;   // <--- filename = title + extension
      document.body.appendChild(link);
      link.click();
  
      link.remove();
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download error:", error);
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
              LunarKoudo
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-slate-700 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Courses</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {course && (
          <div className="mb-12 bg-white rounded-2xl p-8 shadow-lg border border-slate-100">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-5xl font-bold text-slate-900 mb-2">{course.name}</h1>
                {course.code && (
                  <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold">
                    {course.code}
                  </span>
                )}
              </div>
            </div>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">{course.description}</p>

            <div className="flex flex-wrap gap-6 pt-6 border-t border-slate-200">
              {course.collegeId && (
                <div>
                  <p className="text-sm text-slate-500 mb-1">College</p>
                  <p className="font-semibold text-slate-900">{course.collegeId.name}</p>
                </div>
              )}
              {course.department && (
                <div>
                  <p className="text-sm text-slate-500 mb-1">Department</p>
                  <p className="font-semibold text-slate-900">{course.department}</p>
                </div>
              )}
              {course.duration && (
                <div>
                  <p className="text-sm text-slate-500 mb-1">Duration</p>
                  <p className="font-semibold text-slate-900">{course.duration}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Study Materials</h2>
          <p className="text-slate-600">Download PDFs and other course materials</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : materials.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-xl text-slate-500">No study materials available yet</p>
            <p className="text-slate-400 mt-2">Check back later for updates</p>
          </div>
        ) : (
          <div className="space-y-4">
            {materials.map((material) => (
              <div
                key={material._id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="bg-gradient-to-br from-red-100 to-red-50 p-3 rounded-xl flex-shrink-0">
                      <FileText className="w-8 h-8 text-red-600" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        {material.title}
                      </h3>
                      <p className="text-slate-600 mb-4 leading-relaxed">
                        {material.description}
                      </p>

                      <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                      <div className="flex items-center space-x-2">
  <File className="w-4 h-4" />
  <span>{material.title}.{material.fileType}</span>
</div>

                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{formatFileSize(material.fileSize)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>Uploaded {formatDate(material.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDownload(material.fileUrl, material.fileType,material.title)}
                    className="ml-4 flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 flex-shrink-0"
                  >
                    <Download className="w-5 h-5" />
                    <span>Download</span>
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

export default Materials;
