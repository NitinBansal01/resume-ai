import React, { useState, useEffect } from 'react'
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate, useParams } from 'react-router'



const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [ open, setOpen ] = useState(false)
    return (
        <div className='bg-[#1c2230] border border-[#2a3348] rounded hover:border-[#4a5568] transition-colors'>
            <div className='flex items-start gap-3 p-3 cursor-pointer user-select-none' onClick={() => setOpen(o => !o)}>
                <span className='flex-shrink-0 text-xs font-bold text-[#ff2d78] bg-[rgba(255,45,120,0.1)] border border-[rgba(255,45,120,0.2)] rounded px-1 py-0.5 mt-0.5'>Q{index + 1}</span>
                <p className='flex-1 m-0 text-sm font-medium text-[#e6edf3] leading-relaxed'>{item.question}</p>
                <span className={`flex-shrink-0 text-[#7d8590] transition-transform mt-0.5 ${open ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='px-4 pb-4 flex flex-col gap-3 border-t border-[#2a3348] pt-3'>
                    <div className='flex flex-col gap-1'>
                        <span className='text-xs font-bold text-[#a78bfa] bg-[rgba(167,139,250,0.1)] border border-[rgba(167,139,250,0.2)] rounded px-2 py-1 w-fit'>Intention</span>
                        <p className='m-0 text-xs text-[#a5b0c0] leading-relaxed'>{item.intention}</p>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <span className='text-xs font-bold text-[#3fb950] bg-[rgba(63,185,80,0.1)] border border-[rgba(63,185,80,0.2)] rounded px-2 py-1 w-fit'>Model Answer</span>
                        <p className='m-0 text-xs text-[#a5b0c0] leading-relaxed'>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='flex flex-col gap-2 py-3 pl-14 relative'>
        <div className='absolute left-5 top-5 w-3 h-3 rounded-full bg-[#0d1117] border-2 border-[#ff2d78]'></div>
        <div className='flex items-center gap-2'>
            <span className='text-xs font-bold text-[#ff2d78] bg-[rgba(255,45,120,0.1)] border border-[rgba(255,45,120,0.25)] rounded-full px-2 py-1'>Day {day.day}</span>
            <h3 className='m-0 text-sm font-semibold text-[#e6edf3]'>{day.focus}</h3>
        </div>
        <ul className='list-none p-0 m-0 flex flex-col gap-1'>
            {day.tasks.map((task, i) => (
                <li key={i} className='flex items-start gap-2 text-xs text-[#a5b0c0] leading-relaxed'>
                    <span className='flex-shrink-0 w-1 h-1 rounded-full bg-[#7d8590] mt-1.5'></span>
                    {task}
                </li>
            ))}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [ activeNav, setActiveNav ] = useState('technical')
    const { report, getReportById, loading } = useInterview()
    const { interviewId } = useParams()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [ interviewId ])



    if (loading || !report) {
        return (
            <main className='min-h-screen w-full flex justify-center items-center bg-[#0d1117]'>
                <h1 className='text-2xl font-bold text-[#e6edf3]'>Loading your interview plan...</h1>
            </main>
        )
    }

    const scoreColor =
        report.matchScore >= 80 ? 'border-[#3fb950]' :
            report.matchScore >= 60 ? 'border-[#f5a623]' : 'border-[#ff4d4d]'

    const scoreTextColor =
        report.matchScore >= 80 ? 'text-[#3fb950]' :
            report.matchScore >= 60 ? 'text-[#f5a623]' : 'text-[#ff4d4d]'

    return (
        <div className='w-full min-h-screen bg-[#0d1117] text-[#e6edf3] font-sans flex items-stretch p-6'>
            <div className='flex w-full max-w-7xl mx-auto bg-[#161b22] border border-[#2a3348] rounded-lg justify-between'>

                {/* ── Left Nav ── */}
                <nav className='w-56 flex-shrink-0 p-7 flex flex-col justify-between gap-1'>
                    <div>
                        <p className='text-xs font-bold uppercase tracking-widest text-[#7d8590] px-3 mb-2'>Sections</p>
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`flex items-center gap-2 w-full px-3 py-2 rounded text-sm text-left font-sans border-none cursor-pointer transition-all ${activeNav === item.id ? 'bg-[rgba(255,45,120,0.1)] text-[#ff2d78]' : 'text-[#7d8590] hover:bg-[#1c2230] hover:text-[#e6edf3]'}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className='flex items-center flex-shrink-0'>{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </div>
                </nav>

                <div className='w-px bg-[#2a3348] flex-shrink-0' />

                {/* ── Center Content ── */}
                <main className='flex-1 p-7 overflow-y-auto max-h-[calc(100vh-3rem)] pb-20'>
                    {activeNav === 'technical' && (
                        <section>
                            <div className='flex items-baseline gap-3 mb-6 pb-4 border-b border-[#2a3348]'>
                                <h2 className='text-lg font-bold text-[#e6edf3] m-0'>Technical Questions</h2>
                                <span className='text-xs text-[#7d8590] bg-[#1c2230] px-2.5 py-1 rounded-full border border-[#2a3348]'>{report.technicalQuestions.length} questions</span>
                            </div>
                            <div className='flex flex-col gap-3'>
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className='flex items-baseline gap-3 mb-6 pb-4 border-b border-[#2a3348]'>
                                <h2 className='text-lg font-bold text-[#e6edf3] m-0'>Behavioral Questions</h2>
                                <span className='text-xs text-[#7d8590] bg-[#1c2230] px-2.5 py-1 rounded-full border border-[#2a3348]'>{report.behavioralQuestions.length} questions</span>
                            </div>
                            <div className='flex flex-col gap-3'>
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className='flex items-baseline gap-3 mb-6 pb-4 border-b border-[#2a3348]'>
                                <h2 className='text-lg font-bold text-[#e6edf3] m-0'>Preparation Road Map</h2>
                                <span className='text-xs text-[#7d8590] bg-[#1c2230] px-2.5 py-1 rounded-full border border-[#2a3348]'>{report.preparationPlan.length}-day plan</span>
                            </div>
                            <div className='relative pl-14'>
                                <div className='absolute left-7 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ff2d78] to-[rgba(255,45,120,0.1)] rounded'></div>
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}
                </main>

                <div className='w-px bg-[#2a3348] flex-shrink-0' />

                {/* ── Right Sidebar ── */}
                <aside className='w-60 flex-shrink-0 p-7 flex flex-col gap-5'>

                    {/* Match Score */}
                    <div className='flex flex-col items-center gap-2'>
                        <p className='text-xs font-bold uppercase tracking-widest text-[#7d8590] m-0 self-start'>Match Score</p>
                        <div className={`w-24 h-24 rounded-full border-4 flex flex-col items-center justify-center ${scoreColor}`}>
                            <span className='text-2xl font-black text-[#e6edf3] leading-none'>{report.matchScore}</span>
                            <span className='text-xs text-[#7d8590] -mt-1'>%</span>
                        </div>
                        <p className={`text-xs text-center m-0 ${scoreTextColor}`}>Strong match for this role</p>
                    </div>

                    <div className='h-px bg-[#2a3348]' />

                    {/* Skill Gaps */}
                    <div className='flex flex-col gap-3'>
                        <p className='text-xs font-bold uppercase tracking-widest text-[#7d8590] m-0'>Skill Gaps</p>
                        <div className='flex flex-wrap gap-2'>
                            {report.skillGaps.map((gap, i) => {
                                const severityColors = {
                                    high: 'text-[#ff4d4d] bg-[rgba(255,77,77,0.1)] border-[rgba(255,77,77,0.25)]',
                                    medium: 'text-[#f5a623] bg-[rgba(245,166,35,0.1)] border-[rgba(245,166,35,0.25)]',
                                    low: 'text-[#3fb950] bg-[rgba(63,185,80,0.1)] border-[rgba(63,185,80,0.25)]'
                                }
                                return (
                                    <span key={i} className={`text-xs font-medium px-2 py-1 rounded border ${severityColors[gap.severity]}`}>
                                        {gap.skill}
                                    </span>
                                )
                            })}
                        </div>
                    </div>

                </aside>
            </div>
        </div>
    )
}

export default Interview