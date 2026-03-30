const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'admin', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// The replacement logic:
const modalStartString = '{/* Course Modal */}';
const sectionIdx = content.indexOf(modalStartString);

if (sectionIdx !== -1) {
  const modalEndString = '{/* University Modal */}';
  const modalEndIdx = content.indexOf(modalEndString, sectionIdx);

  if (modalEndIdx !== -1) {
    const originalModal = content.substring(sectionIdx, modalEndIdx);
    
    // Replace the container width
    let newModal = originalModal.replace('w-full max-w-4xl my-4', 'w-full max-w-7xl my-4');
    
    // Structure the body:
    // Change `<div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(90vh-130px)]">`
    const bodyStart = '<div className="p-4 sm:p-6 space-y-4 sm:space-y-6 overflow-y-auto max-h-[calc(90vh-130px)]">';
    
    newModal = newModal.replace(bodyStart, 
`<div className="p-4 sm:p-6 flex flex-col lg:flex-row gap-8 overflow-y-auto max-h-[calc(90vh-130px)]">
  <div className="flex-1 space-y-4 sm:space-y-6">`
    );
    
    const previewPane = `  </div>
  {/* Live Preview Pane */}
  <div className="w-full lg:w-[450px] flex-shrink-0">
    <div className="sticky top-0">
      <h4 className="text-md font-semibold text-gray-900 mb-4 flex items-center">
        <Eye className="h-5 w-5 mr-2 text-purple-600" /> Live Card Preview
      </h4>
      <div className="group relative w-full h-full bg-[#050B14] border border-white/5 rounded-[32px] p-6 sm:p-8 hover:border-blue-500/40 transition-all duration-500 flex flex-col overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative z-10 flex items-start justify-between mb-8">
          <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-3 transition-all duration-500 shadow-xl">
            <BookOpen className="h-6 w-6" />
          </div>
          <span className={\`text-[10px] font-black px-3 py-1.5 rounded-full border tracking-[0.2em] uppercase backdrop-blur-xl \${courseForm.category === 'Undergraduate' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : courseForm.category === 'Postgraduate' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'}\`}>
            {courseForm.category || 'Category'}
          </span>
        </div>

        <div className="relative z-10 flex-1">
          <h4 className="text-xl sm:text-2xl font-black text-white mb-3 tracking-tighter group-hover:text-blue-400 transition-colors uppercase leading-tight line-clamp-2">
            {courseForm.name || 'Course Name'}
          </h4>
          <p className="text-slate-400 font-light text-sm leading-relaxed mb-6 line-clamp-3 min-h-[4.2rem]">
            {courseForm.description || 'Add a description to see it appear here...'}
          </p>
        </div>

        <div className="relative z-10 space-y-4 pt-6 mt-auto border-t border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 opacity-80">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</span>
            </div>
            <span className="text-sm font-bold text-slate-200">{courseForm.duration || '--'}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 opacity-80">
              <Award className="h-4 w-4 text-blue-400" />
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Investment</span>
            </div>
            <span className="text-sm font-bold text-blue-400">{courseForm.fees || 'TBA'}</span>
          </div>
          {courseForm.offeredByUniversities && courseForm.offeredByUniversities.length > 0 && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 opacity-80">
                <GraduationCap className="h-4 w-4 text-blue-400" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">University</span>
              </div>
              <span className="text-xs font-bold text-slate-200 line-clamp-1 text-right max-w-[150px]">
                {typeof courseForm.offeredByUniversities[0] === 'string'
                  ? universities.find(u => u._id === courseForm.offeredByUniversities[0])?.name || 'Loading...'
                  : (courseForm.offeredByUniversities[0] as any).name || 'Loading...'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
</div>
`;

    // The footer pattern might be slightly different.
    // Let's use string split and join.
    // Find the LAST occurrence of `<div className="p-6 border-t` before modalEnd.
    const footerDiv = '<div className="p-6 border-t';
    const lastFooterIdx = newModal.lastIndexOf(footerDiv);
    
    if (lastFooterIdx !== -1) {
       // Look backwards from lastFooterIdx to find the closing div of the body content
       const closingDivsRegex = /<\/div>\s*$/;
       const splitBefore = newModal.substring(0, lastFooterIdx);
       const splitAfter = newModal.substring(lastFooterIdx);
       
       // remove the very last `</div>` from splitBefore because we wrap the inside
       const lastDivIdx = splitBefore.lastIndexOf('</div>');
       const finalBefore = splitBefore.substring(0, lastDivIdx);
       
       newModal = finalBefore + previewPane + splitAfter;
       
       content = content.replace(originalModal, newModal);
       fs.writeFileSync(filePath, content, 'utf8');
       console.log('Successfully updated Admin Dashboard Add Course modal with live preview.');
    } else {
       console.log('Could not find the footer div.');
    }
  } else {
    console.log('Could not find modal end.');
  }
} else {
  console.log('Could not find modal start.');
}
