import React, { useState, useRef } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'

const Home = () => {

    const { loading, generateReport,reports } = useInterview()
    const [ jobDescription, setJobDescription ] = useState("")
    const [ selfDescription, setSelfDescription ] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current.files[ 0 ]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        navigate(`/interview/${data._id}`)
    }
    const [resumeFile, setResumeFile] = useState(null);

const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) setResumeFile(file);
};

const formatFileSize = (bytes) => {
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const removeResume = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setResumeFile(null);
    resumeInputRef.current.value = ''; // allows re-selecting the same file
};
    if (loading) {
        return (
            <main className='min-h-screen w-full flex justify-center items-center bg-[#0d1117]'>
                <h1 className='text-2xl font-bold text-[#e6edf3]'>Loading your interview plan...</h1>
            </main>
        )
    }

    return (
        <div className='w-full min-h-screen bg-[#0d1117] text-[#e6edf3] font-sans flex flex-col items-center justify-center p-12 gap-8'>

            {/* Page Header */}
            <header className='text-center'>
                <h1 className='text-4xl font-bold mb-2 text-[#e6edf3]'>Create Your Custom <span className='text-[#ff2d78]'>Interview Plan</span></h1>
                <p className='text-[#7d8590] text-sm max-w-md mx-auto leading-relaxed'>Let our AI analyze the job requirements and your unique profile to build a winning strategy.</p>
            </header>

            {/* Main Card */}
            <div className='w-full max-w-4xl bg-[#161b22] border border-[#2a3348] rounded-lg overflow-hidden'>
                <div className='flex min-h-[520px]'>

                    {/* Left Panel - Job Description */}
                    <div className='flex-1 flex flex-col gap-4 p-6 relative'>
                        <div className='flex items-center gap-2 mb-1'>
                            <span className='text-[#ff2d78]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>
                            </span>
                            <h2 className='text-base font-semibold text-[#e6edf3]'>Target Job Description</h2>
                            <span className='text-xs font-bold text-[#ff2d78] bg-[rgba(255,45,120,0.15)] border border-[rgba(255,45,120,0.3)] px-2 py-1 rounded'>REQUIRED</span>
                        </div>
                        <textarea
                            onChange={(e) => { setJobDescription(e.target.value) }}
                            className='flex-1 w-full bg-[#1e2535] border border-[#2a3348] rounded p-3 text-[#e6edf3] text-sm resize-none outline-none focus:border-[#ff2d78] placeholder-[#7d8590]'
                            placeholder={`Paste the full job description here...\ne.g. 'Senior Frontend Engineer at Google requires proficiency in React, TypeScript, and large-scale system design...'`}
                            maxLength={5000}
                        />
                        <div className='absolute bottom-6 right-6 text-xs text-[#7d8590]'>0 / 5000 chars</div>
                    </div>

                    {/* Vertical Divider */}
                    <div className='w-px bg-[#2a3348]' />

                    {/* Right Panel - Profile */}
                    <div className='flex-1 flex flex-col gap-3 p-6'>
                        <div className='flex items-center gap-2 mb-1'>
                            <span className='text-[#ff2d78]'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                            </span>
                            <h2 className='text-base font-semibold text-[#e6edf3]'>Your Profile</h2>
                        </div>

                        {/* Upload Resume */}
                        <div className='flex flex-col gap-2'>
                        <label className='flex items-center gap-2 text-sm font-medium text-[#e6edf3]'>
                            Upload Resume
                            <span className='text-xs font-bold text-[#ff2d78] bg-[rgba(255,45,120,0.15)] border border-[rgba(255,45,120,0.3)] px-2 py-1 rounded'>BEST RESULTS</span>
                        </label>

                        <label
                            className={`flex flex-col items-center justify-center gap-1 p-6 bg-[#1e2535] border-2 border-dashed border-[#2a3348] rounded cursor-pointer hover:border-[#ff2d78] hover:bg-[rgba(255,45,120,0.05)] transition-all ${resumeFile ? 'border-[#22c55e] bg-[#161b22]' : ''}`}
                            htmlFor='resume'
                        >
                            {resumeFile ? (
                                <>
                                    <span className='text-[#22c55e]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                            <polyline points="22 4 12 14.01 9 11.01" />
                                        </svg>
                                    </span>
                                    <p className='text-sm font-medium text-[#e6edf3]'>{resumeFile.name}</p>
                                    <p className='text-xs text-[#7d8590]'>{formatFileSize(resumeFile.size)} &middot; Uploaded</p>
                                    <button type='button' className='mt-2 text-xs text-[#ef4444] underline hover:no-underline' onClick={removeResume}>
                                        Remove
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span className='text-[#ff2d78]'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="16 16 12 12 8 16" />
                                            <line x1="12" y1="12" x2="12" y2="21" />
                                            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
                                        </svg>
                                    </span>
                                    <p className='text-sm font-medium text-[#e6edf3]'>Click to upload or drag &amp; drop</p>
                                    <p className='text-xs text-[#7d8590]'>PDF or DOCX (Max 5MB)</p>
                                </>
                            )}

                            <input
                                ref={resumeInputRef}
                                hidden
                                type='file'
                                id='resume'
                                name='resume'
                                accept='.pdf,.docx'
                                onChange={handleResumeChange}
                            />
                        </label>
                    </div>

                        {/* OR Divider */}
                        <div className='flex items-center gap-3 text-[#7d8590] text-xs'>
                            <div className='flex-1 h-px bg-[#2a3348]'></div>
                            <span>OR</span>
                            <div className='flex-1 h-px bg-[#2a3348]'></div>
                        </div>

                        {/* Quick Self-Description */}
                        <div className='flex flex-col gap-2'>
                            <label className='text-sm font-medium text-[#e6edf3]' htmlFor='selfDescription'>Quick Self-Description</label>
                            <textarea
                                onChange={(e) => { setSelfDescription(e.target.value) }}
                                id='selfDescription'
                                name='selfDescription'
                                className='w-full h-24 bg-[#1e2535] border border-[#2a3348] rounded p-3 text-[#e6edf3] text-sm resize-none outline-none focus:border-[#ff2d78] placeholder-[#7d8590]'
                                placeholder="Briefly describe your experience, key skills, and years of experience if you don't have a resume handy..."
                            />
                        </div>

                        {/* Info Box */}
                        <div className='flex items-start gap-2 p-3 bg-[#1b2a4a] border border-[#2d4a7a] rounded'>
                            <span className='flex-shrink-0 text-[#4a90e2] mt-0.5'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="#1a1f27" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="#1a1f27" strokeWidth="2" /></svg>
                            </span>
                            <p className='text-xs text-[#8ab4f8] leading-relaxed m-0'>Either a <strong className='text-[#e6edf3]'>Resume</strong> or a <strong className='text-[#e6edf3]'>Self Description</strong> is required to generate a personalized plan.</p>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className='flex items-center justify-between p-4 border-t border-[#2a3348]'>
                    <span className='text-xs text-[#7d8590]'>AI-Powered Strategy Generation &bull; Approx 30s</span>
                    <button
                        onClick={handleGenerateReport}
                        className='flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[#ff2d78] to-[#d91c60] text-white text-sm font-semibold rounded hover:opacity-90 active:scale-95 transition-all'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
                        Generate My Interview Strategy
                    </button>
                </div>
            </div>

            {/* Recent Reports List */}
            {reports.length > 0 && (
                <section className='flex flex-col gap-3 w-full max-w-4xl'>
                    <h2 className='text-lg font-semibold text-[#e6edf3]'>My Recent Interview Plans</h2>
                    <ul className='flex gap-3 flex-wrap list-none p-0 m-0'>
                        {reports.map(report => (
                            <li key={report._id} className='bg-[#161b22] border border-[#2a3348] rounded p-4 flex-1 flex flex-col gap-2 cursor-pointer hover:border-[#ff2d78] transition-colors' onClick={() => navigate(`/interview/${report._id}`)}>
                                <h3 className='m-0 text-[#e6edf3]'>{report.title || 'Untitled Position'}</h3>
                                <p className='text-xs text-[#7d8590] m-0'>Generated on {new Date(report.createdAt).toLocaleDateString()}</p>
                                <p className={`text-xs font-semibold m-0 ${report.matchScore >= 80 ? 'text-[#3fb950]' : report.matchScore >= 60 ? 'text-[#f5a623]' : 'text-[#ff4d4d]'}`}>Match Score: {report.matchScore}%</p>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Page Footer */}
            <footer className='flex gap-6 mt-8'>
                <a href='#' className='text-xs text-[#7d8590] no-underline hover:text-[#e6edf3] transition-colors'>Privacy Policy</a>
                <a href='#' className='text-xs text-[#7d8590] no-underline hover:text-[#e6edf3] transition-colors'>Terms of Service</a>
                <a href='#' className='text-xs text-[#7d8590] no-underline hover:text-[#e6edf3] transition-colors'>Help Center</a>
            </footer>
        </div>
    )
}

export default Home