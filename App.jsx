import React, { useMemo, useState } from 'react'
import './index.css'

const ROLES = [
  'Owner/CEO','Academy Admin','Ops Coordinator','Academic Lead','Tutor',
  'Student','Parent/Guardian','Sales/CRM Agent','Finance','Support','Safeguarding Officer'
]

const mockLeads = [
  { id: 'L-1024', name: 'Ayesha Khan', subject: 'IGCSE Maths', country: 'UK', stage: 'Qualified', source: 'Meta' },
  { id: 'L-1025', name: 'Muhammad Ali', subject: 'A Level Physics', country: 'UAE', stage: 'Trial Booked', source: 'TikTok' },
  { id: 'L-1026', name: 'Fatima Noor', subject: 'IB English', country: 'KSA', stage: 'New', source: 'Referral' },
]

const mockClasses = [
  { id: 'C-5001', time: '16:00–17:00', title: 'IGCSE Maths – Algebra', tutor: 'Mr. Ahmed', students: 1, room: 'LiveKit' },
  { id: 'C-5002', time: '17:15–18:15', title: 'A Level Physics – Kinematics', tutor: 'Ms. Sara', students: 3, room: 'Zoom' },
]

const mockPayments = [
  { id: 'INV-9001', parent: 'Khan Family', amount: 149, currency: 'GBP', status: 'Paid', period: 'Aug 2025' },
  { id: 'INV-9002', parent: 'Hussain Family', amount: 399, currency: 'AED', status: 'Due', period: 'Aug 2025' },
]

const Stat = ({ label, value, chip }) => (
  <div className="flex flex-col gap-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="text-slate-500 text-sm">{label}</div>
    <div className="flex items-baseline gap-3">
      <div className="text-2xl font-semibold text-slate-900">{value}</div>
      {chip && (<span className="text-xs rounded-full bg-yellow-50 px-2 py-0.5 text-yellow-700 border border-yellow-200">{chip}</span>)}
    </div>
  </div>
)

const Card = ({ title, children, action }) => (
  <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
    <div className="flex items-center justify-between border-b border-slate-100 p-4">
      <h3 className="font-semibold text-slate-900">{title}</h3>
      {action}
    </div>
    <div className="p-4">{children}</div>
  </div>
)

const SidebarItem = ({ icon, label, active=false }) => (
  <div className={
    `flex items-center gap-3 rounded-xl px-3 py-2 text-sm cursor-pointer ${
      active ? 'bg-crux-dark text-white' : 'hover:bg-slate-100 text-slate-700'
    }`
  }>
    <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-crux-light/20 text-crux-dark">{icon}</span>
    <span>{label}</span>
  </div>
)

function Pill({ color='emerald', children }) {
  const map = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    amber: 'bg-amber-50 text-amber-800 border-amber-200',
    sky: 'bg-sky-50 text-sky-700 border-sky-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200'
  }
  return <span className={`text-xs rounded-full border px-2 py-0.5 ${map[color]}`}>{children}</span>
}

export default function App() {
  const [role, setRole] = useState('Owner/CEO')
  const [query, setQuery] = useState('')

  const filteredLeads = useMemo(() => {
    if (!query) return mockLeads
    return mockLeads.filter(l =>
      l.name.toLowerCase().includes(query.toLowerCase()) ||
      l.subject.toLowerCase().includes(query.toLowerCase())
    )
  }, [query])

  const roleHint = useMemo(() => {
    switch (role) {
      case 'Owner/CEO': return 'High-level view of revenue, growth, and utilisation.'
      case 'Ops Coordinator': return 'Manage leads → trials → enrolments, timetables, and SLAs.'
      case 'Tutor': return 'Today\'s classes, attendance, homework drafts, and timesheets.'
      case 'Parent/Guardian': return 'See your child’s timetable, progress, and invoices.'
      case 'Student': return 'Join class, view assignments, submit work, track grades.'
      case 'Finance': return 'Invoices, dunning queue, tutor payouts, reconciliation.'
      case 'Safeguarding Officer': return 'Incident reports, recordings, audit trails (read-only).'
      default: return 'Role-specific dashboards and actions.'
    }
  }, [role])

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-10 border-b border-yellow-300 bg-gradient-to-r from-crux-dark to-slate-900 text-white backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-crux-yellow text-crux-dark grid place-items-center font-bold">C</div>
            <div className="leading-tight">
              <div className="font-semibold">Crux Online Academy</div>
              <div className="text-xs opacity-80">LMS Admin · {role}</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select className="rounded-xl border border-yellow-400 bg-crux-dark/30 px-3 py-2 text-sm text-white" value={role} onChange={e => setRole(e.target.value)}>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search leads / classes / parents" className="rounded-xl border border-yellow-400 bg-white/90 px-3 py-2 text-sm text-slate-900 w-64" />
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-12 gap-6">
        <aside className="col-span-12 lg:col-span-3 xl:col-span-2">
          <nav className="flex flex-col gap-1">
            <SidebarItem icon="🏠" label="Dashboard" active />
            <SidebarItem icon="🎯" label="Leads & CRM" />
            <SidebarItem icon="🗓️" label="Timetable" />
            <SidebarItem icon="🎥" label="Live Class" />
            <SidebarItem icon="📚" label="Courses & Content" />
            <SidebarItem icon="📝" label="Assignments & Quizzes" />
            <SidebarItem icon="📈" label="Reports & Analytics" />
            <SidebarItem icon="💳" label="Payments & Invoices" />
            <SidebarItem icon="👩‍🏫" label="Tutors & Payouts" />
            <SidebarItem icon="🛟" label="Support & Safeguarding" />
            <SidebarItem icon="⚙️" label="Settings" />
          </nav>
          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-sm font-semibold text-slate-900">Role Hint</div>
            <p className="mt-1 text-sm text-slate-600">{roleHint}</p>
          </div>
        </aside>

        <main className="col-span-12 lg:col-span-9 xl:col-span-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat label="Active Students" value="128" chip="RAG: Green" />
            <Stat label="Trial Booked (7d)" value="23" chip="Conv 31%" />
            <Stat label="Attendance" value="93%" chip="Target ≥92%" />
            <Stat label="MRR" value="£14,870" chip="+8% MoM" />
          </div>

          <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
            <Card title="Leads Pipeline" action={<button className="rounded-xl bg-crux-dark text-white text-sm px-3 py-2">Add Lead</button>}>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-500">
                      <th className="py-2 pr-4">Lead</th>
                      <th className="py-2 pr-4">Subject</th>
                      <th className="py-2 pr-4">Country</th>
                      <th className="py-2 pr-4">Stage</th>
                      <th className="py-2">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.map(l => (
                      <tr key={l.id} className="border-t border-slate-100">
                        <td className="py-2 pr-4 font-medium text-slate-900">{l.name}</td>
                        <td className="py-2 pr-4">{l.subject}</td>
                        <td className="py-2 pr-4">{l.country}</td>
                        <td className="py-2 pr-4"><Pill color={l.stage === 'Trial Booked' ? 'sky' : l.stage === 'Qualified' ? 'emerald' : 'slate'}>{l.stage}</Pill></td>
                        <td className="py-2">{l.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card title="Today’s Classes" action={<button className="rounded-xl border border-slate-300 px-3 py-2 text-sm">Create Class</button>}>
              <ul className="flex flex-col gap-3">
                {mockClasses.map(c => (
                  <li key={c.id} className="rounded-xl border border-slate-200 p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-slate-900">{c.title}</div>
                        <div className="text-sm text-slate-600">{c.time} · {c.tutor} · {c.students === 1 ? '1:1' : `${c.students} students`} · {c.room}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="rounded-lg bg-green-600 px-3 py-1.5 text-white text-sm">Join</button>
                        <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm">Materials</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Card>

            <Card title="Recent Payments & Dunning" action={<button className="rounded-xl border border-slate-300 px-3 py-2 text-sm">Create Invoice</button>}>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-slate-500">
                      <th className="py-2 pr-4">Invoice</th>
                      <th className="py-2 pr-4">Parent</th>
                      <th className="py-2 pr-4">Amount</th>
                      <th className="py-2 pr-4">Status</th>
                      <th className="py-2">Period</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockPayments.map(p => (
                      <tr key={p.id} className="border-t border-slate-100">
                        <td className="py-2 pr-4 font-medium text-slate-900">{p.id}</td>
                        <td className="py-2 pr-4">{p.parent}</td>
                        <td className="py-2 pr-4">{p.currency} {p.amount}</td>
                        <td className="py-2 pr-4"><Pill color={p.status === 'Paid' ? 'emerald' : 'amber'}>{p.status}</Pill></td>
                        <td className="py-2">{p.period}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-6">
            <Card title="Quick Actions">
              <div className="grid grid-cols-2 gap-3">
                {['Book Trial','Send WhatsApp Template','Add Assignment','Generate Quiz','Record Payment','Run Tutor Payouts'].map(a => (
                  <button key={a} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-left text-sm hover:border-slate-400">
                    {a} →
                  </button>
                ))}
              </div>
            </Card>

            <Card title="Parent Progress Digest (Preview)">
              <div className="text-sm text-slate-700">
                <p className="mb-3">Assalamu Alaikum! Here is {'{student}'}'s weekly summary:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Topics covered: Algebra – Linear Equations</li>
                  <li>Attendance: 100% (2/2 classes)</li>
                  <li>Homework: 1/1 submitted (Score: 85%)</li>
                  <li>Next week: Quadratic Expressions + 2 past-paper questions</li>
                </ul>
                <div className="mt-3 text-xs text-slate-500">Powered by Crux · Auto-generated, tutor-verified</div>
              </div>
            </Card>

            <Card title="Safeguarding & Incidents">
              <div className="flex flex-col gap-3 text-sm">
                <div className="rounded-xl border border-slate-200 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-900">No active incidents</div>
                      <div className="text-slate-600">Report concerns from any live class. Audit logs retained 12 months.</div>
                    </div>
                    <button className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm">Open Runbook</button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>

      <footer className="mx-auto max-w-7xl px-4 pb-10 pt-2 text-xs text-slate-500">
        © 2025 Crux Online Academy · LMS MVP UI Shell · Brand styled
      </footer>
    </div>
  )
}