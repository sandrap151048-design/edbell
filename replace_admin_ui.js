const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'admin', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add missing imports
if (!content.includes('Clock,') && content.includes('BookOpenCheck')) {
  content = content.replace(
    /BookOpenCheck\n\} from 'lucide-react';/,
    "BookOpenCheck,\n  Clock,\n  Building,\n  Star\n} from 'lucide-react';"
  );
}

// Helper to replace precisely in a section
function replaceTableWithGrid(content, sectionStartString, newGridHTML) {
  const sectionIdx = content.indexOf(sectionStartString);
  if (sectionIdx === -1) {
    console.error('Could not find section: ' + sectionStartString);
    return content;
  }
  
  const divTableStart = content.indexOf('<div className="overflow-x-auto">', sectionIdx);
  const tableEnd = content.indexOf('</table>', divTableStart) + 8; // length of </table>
  const divTableEnd = content.indexOf('</div>', tableEnd) + 6; // length of </div>
  
  if (divTableStart !== -1 && tableEnd !== -1 && divTableEnd !== -1) {
    const before = content.substring(0, divTableStart);
    const after = content.substring(divTableEnd);
    return before + newGridHTML + after;
  }
  console.error('Could not find table inside section: ' + sectionStartString);
  return content;
}

// 2. Replace Courses table with public cards
const courseNewCode = `<div className="w-full">
            {courses.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No courses found</h3>
                <p className="text-slate-400 mb-4 text-sm font-mono tracking-tighter">Initialize database or add curriculum manually</p>
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => openCourseModal()}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Add Your First Course
                  </button>
                  <button
                    onClick={seedSampleData}
                    disabled={isSeeding}
                    className="bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors border border-blue-500/30"
                  >
                    {isSeeding ? 'Loading...' : 'Add Sample Data'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                  <div key={course._id || index} className="group relative h-full bg-[#050B14] border border-white/5 rounded-[32px] p-6 sm:p-8 hover:border-blue-500/40 transition-all duration-500 flex flex-col overflow-hidden shadow-sm hover:shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10 flex items-start justify-between mb-8">
                      <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-3 transition-all duration-500 shadow-xl">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <span className={\`text-[10px] font-black px-3 py-1.5 rounded-full border tracking-[0.2em] uppercase backdrop-blur-xl \${course.category === 'Undergraduate' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : course.category === 'Postgraduate' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'}\`}>
                        {course.category}
                      </span>
                    </div>

                    <div className="relative z-10 flex-1">
                      <h4 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tighter group-hover:text-blue-400 transition-colors uppercase leading-tight line-clamp-2">
                        {course.name}
                      </h4>
                      <p className="text-slate-400 font-light text-sm leading-relaxed mb-6 line-clamp-3">
                        {course.description}
                      </p>
                    </div>

                    <div className="relative z-10 space-y-4 pt-6 border-t border-white/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 opacity-80">
                          <Clock className="h-4 w-4 text-blue-400" />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</span>
                        </div>
                        <span className="text-sm font-bold text-slate-200">{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 opacity-80">
                          <Award className="h-4 w-4 text-blue-400" />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Investment</span>
                        </div>
                        <span className="text-sm font-bold text-blue-400">{course.fees || 'TBA'}</span>
                      </div>
                      {course.offeredByUniversities && course.offeredByUniversities.length > 0 && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 opacity-80">
                            <GraduationCap className="h-4 w-4 text-blue-400" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">University</span>
                          </div>
                          <span className="text-xs font-bold text-slate-200 line-clamp-1 text-right max-w-[150px]">{course.offeredByUniversities[0].name}</span>
                        </div>
                      )}
                    </div>

                    <div className="relative z-10 mt-6 pt-6 border-t border-white/5 flex space-x-3 mt-auto">
                      <button
                        onClick={() => openCourseModal(course)}
                        className="flex-1 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 border border-blue-500/30 uppercase tracking-widest"
                      >
                        <Edit className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => deleteCourse(course._id)}
                        className="flex-1 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 border border-red-600/30 uppercase tracking-widest"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>`;

content = replaceTableWithGrid(content, 'const renderAddCourseSection = () =>', courseNewCode);

// 3. Replace Universities table with public cards
const uniNewCode = `<div className="w-full">
            {universities.length === 0 ? (
              <div className="text-center py-12">
                <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">No universities found</h3>
                <p className="text-slate-400 mb-4 text-sm font-mono tracking-tighter">Initialize database or add universities manually</p>
                <div className="flex justify-center space-x-3">
                  <button
                    onClick={() => openUniversityModal()}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Add Your First University
                  </button>
                  <button
                    onClick={seedSampleData}
                    disabled={isSeeding}
                    className="bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white px-4 py-2 rounded-lg text-sm transition-colors border border-blue-500/30"
                  >
                    {isSeeding ? 'Loading...' : 'Add Sample Data'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                {universities.map((university, index) => (
                  <div
                    key={university._id || index}
                    className="group relative h-full bg-[#050B14] border border-white/5 rounded-[32px] overflow-hidden hover:border-green-500/40 transition-all duration-500 flex flex-col shadow-sm hover:shadow-xl p-6 sm:p-8"
                  >
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                    
                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-start justify-between mb-8">
                        <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:bg-green-600 group-hover:text-white transition-all duration-500">
                          <Building className="w-6 h-6" />
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <div className="inline-flex items-center bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-[10px] font-black tracking-widest mb-2 uppercase border border-green-500/10">
                            {university.accreditation}
                          </div>
                          <div className="flex items-center justify-end text-yellow-500">
                            <Star className="w-3.5 h-3.5 fill-current mr-1" />
                            <span className="text-sm font-bold text-slate-200">{university.rating || '4.5'}</span>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors tracking-tight uppercase italic line-clamp-2">{university.name}</h3>
                      
                      <div className="flex items-center text-slate-400 text-xs mb-4 space-x-3">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1.5 text-green-400/70" />
                          <span className="truncate max-w-[120px]">{university.location || 'India'}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1.5 text-green-400/70" />
                          <span>Est. {university.established}</span>
                        </div>
                      </div>
                      
                      <p className="text-slate-400 text-sm font-light leading-relaxed mb-6 flex-grow line-clamp-3">
                        {university.description}
                      </p>
                      
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <div className="text-sm font-bold text-white">{university.totalStudents || university.studentsCount || '5K+'}</div>
                          <div className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Students</div>
                        </div>
                        <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                          <div className="text-sm font-bold text-white">{university.coursesOffered || '50+'}</div>
                          <div className="text-[9px] text-slate-400 font-black uppercase tracking-wider">Courses</div>
                        </div>
                      </div>

                      <div className="relative z-10 flex space-x-3 mt-auto pt-4 border-t border-white/5">
                        <button
                          onClick={() => openUniversityModal(university)}
                          className="flex-1 bg-green-600/10 hover:bg-green-600 text-green-400 hover:text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 border border-green-500/30 uppercase tracking-widest"
                        >
                          <Edit className="h-4 w-4" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => deleteUniversity(university._id)}
                          className="flex-1 bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 border border-red-600/30 uppercase tracking-widest"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>`;

content = replaceTableWithGrid(content, 'const renderAddUniversitySection = () =>', uniNewCode);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated Admin Dashboard ui cards with precise section targeting.');
