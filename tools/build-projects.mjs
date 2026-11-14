// Builds projects/<slug>.html case study pages (after fabwaseem.com/projects/benchline, in bryllim.com's article
// format) from the data below. Facts come only from each repo's README or Joana's own words.
// Run: node tools/build-projects.mjs   (then bump ?v= if CSS/JS changed)
import { writeFileSync, mkdirSync, readFileSync } from 'node:fs';

const V = (readFileSync('index.html', 'utf8').match(/site\.css\?v=(\d+)/) || [])[1];
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const P = [
  {
    slug: 'neu-information-system', name: 'NEU Information System', type: 'web app', year: '2026', role: 'solo build',
    sub: 'A school system for employees, students and admins, built on my own',
    stack: ['Laravel'], code: 'https://github.com/dvphnc/neu-information-system', visit: '', shot: '',
    sections: [
      ['Overview', ['A school information system that automates employee and student records, with a dashboard for admins.']],
      ['What it does', [['Employee side for staff records', 'Student side for student records', 'Admin dashboard to manage both']]],
      ['How it’s built', ['A solo Laravel build: I designed and built every part myself.']],
    ],
  },
  {
    slug: 'travia-journal', name: 'Travia Journal', type: 'website', year: '2026', role: 'owner',
    sub: 'A travel blog for everyone, not just travelers',
    stack: ['Next.js 14', 'JavaScript', 'Custom CSS', 'Vercel', 'Unsplash'],
    visit: 'https://traviajournal.vercel.app/', code: 'https://github.com/dvphnc/travia-journal', shot: 'travia',
    sections: [
      ['Overview', ['Travia is a place where anyone can sit down, read a story, and feel like they’ve been somewhere. Every post pairs a destination with a piece of trivia: something unexpected that makes you stop and think “I had no idea.”']],
      ['The problem', ['You don’t need a passport or a boarding pass to feel something reading about hidden temples at the edge of Kyoto. I wanted a travel blog for readers, not just travelers.']],
      ['What it does', [['The reading experience: full stories with a sidebar', 'Navigation and search, with Asia, Europe and Americas categories', 'Sharing a story straight from its card', 'An animated welcome screen on the home page', 'A contact form handled by a serverless API']]],
      ['How it’s built', ['A full Next.js application with static generation, a serverless API, and everything styled by hand. No UI libraries, no shortcuts.', ['Pages Router with static site generation', 'Plain JavaScript, no TypeScript, to keep it approachable', 'All CSS written from scratch in one stylesheet', 'Hosted on Vercel with automatic deployment']]],
      ['Result', ['It started as a personal project, a way to learn, build and make something I’d actually want to open. It turned into one of the things I’m most proud of building.']],
    ],
  },
  {
    slug: 'maildrop', name: 'MailDrop', type: 'web app', year: '2026', role: 'solo build',
    sub: 'Pay once, send forever: one-off emails gated behind PayPal',
    stack: ['Laravel 11', 'Vue 3', 'Inertia.js', 'PayPal SDK', 'Resend API', 'Vite', 'Docker', 'Render', 'SQLite'],
    visit: 'https://maildrop-620d.onrender.com/', code: 'https://github.com/dvphnc/maildrop', shot: 'maildrop',
    sections: [
      ['Overview', ['MailDrop is a pay-per-send email delivery platform built for simplicity. No accounts, no subscriptions: fill a form, pay with PayPal, and your email lands in seconds, with a file attached if you need it.']],
      ['The problem', ['You don’t need a full email marketing suite to send one meaningful message. Every send is gated behind a PayPal payment, so sending a one-off email feels intentional and nothing goes to waste.']],
      ['What it does', [['A split send form with a live preview that updates as you type', 'A PayPal payment flow (sandbox mode, no real money)', 'Drag and drop attachments', 'An email history dashboard with search and delete', 'A dark, minimal landing page built to get out of the way']]],
      ['How it’s built', ['A full-stack Laravel and Vue 3 application with Inertia.js, PayPal Sandbox API integration and real email delivery.', ['Inertia.js for an SPA feel without a separate API', 'Resend API for delivery over HTTP, so no SMTP blocks', 'SQLite for a lightweight database', 'A Docker production build, hosted on Render']]],
      ['Result', ['It started as a school activity, a PayPal integration exercise for class. It turned into one of the things I’m most proud of building.']],
    ],
  },
  {
    slug: 'barangay-management-system', name: 'Barangay Management System', type: 'web app', year: '2026', role: 'scrum master · full-stack developer',
    sub: 'Taking Barangay New Era from paper folders to one system',
    stack: ['Laravel 12', 'PHP 8.2', 'MySQL', 'Laravel Breeze', 'Blade', 'Vanilla CSS/JS', 'Yajra DataTables', 'DomPDF', 'PhpSpreadsheet', 'Simple QrCode'],
    visit: '', code: 'https://github.com/dvphnc/anakco-bms-newera', shot: '',
    sections: [
      ['Overview', ['A full-stack Barangay Management System for Barangay New Era: filing blotter cases, issuing clearances, tracking business permits, and letting residents request documents online. A group project for Integrative Programming and Technologies at New Era University, with every feature grounded in real barangay workflows.']],
      ['The problem', ['Barangay offices still run on paper folders, physical logbooks and manual signatures. This system replaces all of that: one place for resident records, case management, document issuance and real-time status tracking, built for the staff who use it every day.']],
      ['What it does', [['Resident and household management', 'Document issuance with PDF certificates', 'Blotter case management', 'Business permit tracking, with QR codes for public verification', 'A resident portal with a live request tracker', 'Appointments and queue management', 'Officials, staff and committees', 'Reports and analytics with Excel export', 'System administration: roles, activity log, backup and restore']]],
      ['My role', ['I served as Scrum Master and Full-Stack Developer, leading sprints, managing the backlog, and owning the end-to-end technical implementation.', ['Facilitated sprint planning, daily stand-ups and retrospectives', 'Designed the full database schema: 20+ tables', 'Built every controller, model, migration and route from scratch', 'Wrote the PDF certificate pipeline with dynamic resident data', 'Built real-time portal tracking with queued email notifications', 'Designed the whole interface from scratch, with no UI kit']]],
      ['How it’s built', ['A Laravel 12 application that runs fully offline: all assets are served locally, so no Node.js is needed. Server-side DataTables power every module, with filtering, searching and multi-format export.']],
    ],
    timeline: [['Jan 2026', 'Kickoff: requirements and barangay workflow research'], ['Feb 2026', 'Database schema, design system, wireframes'], ['Mar 2026', 'Residents, households, documents, blotter'], ['Apr 2026', 'Permits, officials, committees, reports, resident portal'], ['May 2026', 'Appointments queue, portal tracker, email notifications, polish'], ['May 26, 2026', 'Final submission']],
  },
  {
    slug: 'smartcare', name: 'SmartCare+', type: 'web app', year: '2025', role: 'project manager',
    sub: 'A clinic patient system for patients, doctors and admins',
    stack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui', 'Supabase', 'React Router', 'TanStack Query', 'Recharts', 'Vercel'],
    visit: 'https://smartcare-eta.vercel.app/', code: 'https://github.com/lonzlow/smartcare', shot: 'smartcare',
    sections: [
      ['Overview', ['A modern healthcare patient management system built with React, TypeScript and Supabase: patient scheduling, health records and care coordination in one place.']],
      ['What it does', [['Patient dashboard: medical records, appointments, profile', 'Doctor dashboard: schedules, patient records, appointments', 'Admin dashboard: doctors, patients, appointments and reports', 'Sign-in, sign-up and password reset through Supabase Auth', 'Automated appointment and system notifications', 'Full light and dark themes']]],
      ['How it’s built', ['A Vite and React single-page app with Supabase for the backend, auth and database, deployed on Vercel.', ['Tailwind CSS and shadcn/ui for the interface', 'TanStack Query for server state', 'Recharts for the report charts', 'Supabase edge functions and migrations']]],
      ['My role', ['As project manager, I kept the team’s sprints on track and bridged developers and stakeholders.']],
    ],
  },
  {
    slug: 'hirely', name: 'HIRELY', type: 'web app', year: '2025', role: 'scrum master · ui/ux designer',
    sub: 'An HR management system, designed from wireframe to final build',
    stack: ['Laravel', 'PHP', 'MySQL', 'Blade', 'HTML5 / CSS3', 'JavaScript', 'Figma', 'Vercel', 'Agile / Scrum'],
    visit: 'https://hirewithhirely.vercel.app/', code: 'https://github.com/dvphnc/hirely', shot: 'hirely',
    sections: [
      ['Overview', ['HIRELY is a full-stack HR Management System built to modernize how teams handle recruitment, employee records and HR workflows.']],
      ['The problem', ['Most HR tools are bloated and expensive. HIRELY keeps it focused: track applicants, manage employees, handle leave requests, and get a clear view of your workforce from one clean dashboard.']],
      ['What it does', [['Recruitment pipeline for applicants', 'Employee directory and profiles', 'Role-based access control', 'Leave requests and approvals', 'Dashboard analytics']]],
      ['My role', ['I served as both Scrum Master and UI/UX Designer, two roles that ended up being more connected than I expected.', ['Ran daily standups, sprint planning and retrospectives', 'Tracked milestones and surfaced blockers early', 'Led the design process from lo-fi sketches to Figma prototypes', 'Designed interfaces around real HR tasks, not assumed ones', 'Ran usability checks with the team before handoff']]],
      ['Result', ['It started as a school project under a tight two-month sprint and turned into something I genuinely care about. Built Agile, shipped on time.']],
    ],
    timeline: [['Apr 2025', 'Kickoff: team formation and backlog'], ['Weeks 1–2', 'Wireframes, Figma prototypes, database schema'], ['Weeks 3–4', 'Auth, employee directory, role-based access'], ['Weeks 5–6', 'Recruitment pipeline and leave management'], ['Week 7', 'Dashboard, polish, QA, documentation'], ['May 2025', 'Final submission and deployment']],
  },
];

const MOCK = {
  hirely: '--c1:#8e3fbf;--c2:#e85a4f;--c3:#f9c66a;--win:#ffffff',
  maildrop: '--c1:#0b0b0b;--c2:#1db954;--c3:#0d3b22;--win:#161616',
  travia: '--c1:#efe7da;--c2:#8b6f4e;--c3:#9aa7b0;--win:#ffffff',
  smartcare: '--c1:#1e3a8a;--c2:#dbe7fb;--c3:#60a5fa;--win:#ffffff',
};

const id = (t) => 'sec-' + t.toLowerCase().replace(/’/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const theme = `<div class="theme-seg" role="group" aria-label="Theme">
        <button type="button" data-theme-set="light" aria-label="Light theme" title="Light"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg></button>
        <button type="button" data-theme-set="system" aria-label="Match system theme" title="System"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/></svg></button>
        <button type="button" data-theme-set="dark" aria-label="Dark theme" title="Dark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></button>
      </div>`;
const link = (href, label) => `<a href="${href}" target="_blank" rel="noopener">${label} <span class="arr">↗</span></a>`;

function body(blocks) {
  return blocks.map((b) => Array.isArray(b) ? `<ul>\n${b.map((li) => `          <li>${esc(li)}</li>`).join('\n')}\n        </ul>` : `<p>${esc(b)}</p>`).join('\n        ');
}

mkdirSync('projects', { recursive: true });
P.forEach((p, i) => {
  const prev = P[i - 1], next = P[i + 1];
  const links = [p.visit && link(p.visit, 'visit site'), link(p.code, 'source code')].filter(Boolean).join('');
  const toc = p.sections.map(([t]) => `<li><a href="#${id(t)}">${esc(t)}</a></li>`).concat(p.timeline ? ['<li><a href="#sec-timeline">Timeline</a></li>'] : []).concat(['<li><a href="#sec-links">Links</a></li>']).join('\n        ');
  const cover = p.shot
    ? `<a class="pj-shot mock cs-cover enter" style="--d:250ms;${MOCK[p.shot]}" href="${p.visit || p.code}" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true"><span class="mock-win"><span class="mock-bar"></span><img src="../assets/img/projects/${p.shot}.webp" width="1200" height="750" alt=""/></span></a>`
    : `<div class="pj-shot is-empty cs-cover enter" style="--d:250ms" aria-hidden="true"><span class="micro">screenshot soon</span></div>`;
  const secs = p.sections.map(([t, b]) => `<h2 id="${id(t)}">${esc(t)}</h2>\n        ${body(b)}`).join('\n\n        ');
  const tl = p.timeline ? `\n\n        <h2 id="sec-timeline">Timeline</h2>\n        <dl class="cs-timeline">\n${p.timeline.map(([d, t]) => `          <div><dt>${esc(d)}</dt><dd>${esc(t)}</dd></div>`).join('\n')}\n        </dl>` : '';
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>${esc(p.name)} · Projects · dvphnc</title>
  <meta name="description" content="${esc(p.name)}: ${esc(p.sub)}. A ${esc(p.type)} by Joana Daphne Sy (${esc(p.role)})."/>
  <meta name="color-scheme" content="light dark"/>
  <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='7' fill='%23001a5e'/%3E%3Cg fill='%234d9fff'%3E%3Crect x='7' y='8' width='4' height='16'/%3E%3Crect x='11' y='8' width='6' height='4'/%3E%3Crect x='11' y='20' width='6' height='4'/%3E%3Crect x='17' y='12' width='4' height='8'/%3E%3C/g%3E%3Crect x='23' y='20' width='3' height='4' fill='%2380c0ff'/%3E%3C/svg%3E"/>
  <script>
    (function(){var d=document.documentElement;d.classList.add('js');var t=null;try{t=localStorage.getItem('theme')}catch(e){}if(t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches))d.classList.add('dark');})();
  </script>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;1,8..60,400&display=swap"/>
  <link rel="stylesheet" href="../assets/css/site.css?v=${V}"/>
  <link rel="stylesheet" href="../assets/css/note.css?v=${V}"/>
</head>
<body>
  <!-- generated by tools/build-projects.mjs: edit the data there, not this file -->

  <aside class="sidebar" aria-label="Project">
    <a href="../index.html" class="side-brand">dvphnc<span class="brand-cursor">_</span></a>
    <div class="side-group">
      <a class="side-back" href="../projects.html">← all projects</a>
    </div>
    <nav class="side-group" aria-label="On this page">
      <p class="micro" style="margin-bottom:.6rem">on this page</p>
      <ul class="side-nav toc">
        ${toc}
      </ul>
    </nav>
    <div class="side-group">
      <p class="micro">project</p>
      <p class="side-cat">${esc(p.type)} · ${esc(p.year)}</p>
      <p class="micro" style="margin-top:.6rem">role</p>
      <p class="side-cat">${esc(p.role)}</p>
    </div>
    <div class="side-foot">
      <span class="micro">projects</span>
      ${theme}
    </div>
  </aside>

  <header class="topbar">
    <a href="../projects.html" class="side-back">← projects</a>
    <div class="topbar-right">
      ${theme}
    </div>
  </header>

  <main class="main">
    <article class="wrap read">
      <p class="micro crumb enter" style="--d:50ms"><a href="../projects.html">projects</a> / ${esc(p.slug.replace(/-/g, ' '))}</p>
      <h1 class="read-title enter" style="--d:90ms">${esc(p.name)}</h1>
      <p class="read-sub enter" style="--d:130ms">${esc(p.sub)}</p>
      <dl class="cs-facts enter" style="--d:170ms">
        <div><dt>type</dt><dd>${esc(p.type)}</dd></div>
        <div><dt>year</dt><dd>${esc(p.year)}</dd></div>
        <div><dt>role</dt><dd>${esc(p.role)}</dd></div>
        <div><dt>stack</dt><dd>${esc(p.stack.slice(0, 3).join(' · '))}${p.stack.length > 3 ? ` <span class="cs-more">+${p.stack.length - 3} more</span>` : ''}</dd></div>
      </dl>
      <div class="proj-links cs-links enter" style="--d:210ms">${links}</div>

      ${cover}

      <div class="prose enter" id="prose" style="--d:290ms">
        ${secs}${tl}

        <h2 id="sec-links">Links</h2>
        <ul class="xp-skills cs-stack" aria-label="Stack">${p.stack.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
        <ul class="cs-linklist">
          ${p.visit ? `<li><a class="tl" href="${p.visit}" target="_blank" rel="noopener">Live site <span class="arr">↗</span></a> <span class="micro">${esc(p.visit.replace(/^https:\/\//, '').replace(/\/$/, ''))}</span></li>` : ''}
          <li><a class="tl" href="${p.code}" target="_blank" rel="noopener">Source code <span class="arr">↗</span></a> <span class="micro">${esc(p.code.replace(/^https:\/\//, ''))}</span></li>
        </ul>
      </div>

      <nav class="pager" aria-label="More projects">
        ${prev ? `<a class="card prev" href="${prev.slug}.html"><span class="micro">← previous</span><p class="pager-title">${esc(prev.name)}</p></a>` : `<a class="card prev" href="../projects.html"><span class="micro">← all projects</span><p class="pager-title">Projects</p></a>`}
        ${next ? `<a class="card next" href="${next.slug}.html"><span class="micro">next →</span><p class="pager-title">${esc(next.name)}</p></a>` : `<a class="card next" href="../projects.html"><span class="micro">all projects →</span><p class="pager-title">Projects</p></a>`}
      </nav>

      <footer class="foot">
        <span class="micro">© 2026 joana daphne sy · dvphnc</span>
        <a class="micro tl" href="../index.html">home <span class="arr">↗</span></a>
      </footer>
    </article>
  </main>

  <script src="../assets/js/theme.js?v=${V}"></script>
  <script src="../assets/js/note.js?v=${V}"></script>
</body>
</html>
`;
  writeFileSync(`projects/${p.slug}.html`, html);
  console.log('projects/' + p.slug + '.html');
});
