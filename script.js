// Mock Data for ProConnect Platform

// 1. Student Profile
const studentProfile = {
    name: "Alex Doe",
    email: "alex.doe@example.com",
    skills: ['Python', 'JavaScript', 'React', 'Figma', 'Node.js'],
    resumeUrl: "#", // Placeholder
    portfolioLinks: ["https://github.com/alexdoe", "https://dribbble.com/alexdoe"], // Placeholder links
    openTo: ['Gigs', 'Internships', 'Full-time'],
};

// 2. Job Listings
const jobListings = [
    {
        id: 1,
        title: "Frontend Developer Intern",
        company: "Innovate Inc.",
        type: "Internship",
        location: "Remote",
        pay: "$25/hour",
        description: "Assist our frontend team in developing and maintaining our web applications. A great opportunity to learn from experienced developers.",
        requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React'],
    },
    {
        id: 2,
        title: "UI/UX Design Gig",
        company: "Creative Solutions",
        type: "Gig",
        location: "Remote",
        pay: "$500 project-based",
        description: "Design a new landing page for a startup. Must have a strong portfolio in UI/UX design.",
        requiredSkills: ['Figma', 'Adobe XD', 'User Research'],
    },
    {
        id: 3,
        title: "Full-Stack Engineer",
        company: "Tech Giant LLC",
        type: "Full-time",
        location: "Onsite - San Francisco, CA",
        pay: "$120,000/year",
        description: "Join our core engineering team to build scalable and robust features for our main product.",
        requiredSkills: ['Python', 'Django', 'React', 'PostgreSQL', 'AWS'],
    },
     {
        id: 4,
        title: "Data Science Intern",
        company: "DataDriven Co.",
        type: "Internship",
        location: "Remote",
        pay: "$30/hour",
        description: "Work on real-world data science projects, from data cleaning to model deployment. Ideal for students passionate about data.",
        requiredSkills: ['Python', 'R', 'SQL', 'Pandas', 'Scikit-learn'],
    }
];

// 3. Student's Applications
const myApplications = [];

// 4. Employer's Posted Listings
// For demo purposes, we'll populate this with the same data as jobListings.
const employerListings = [...jobListings];

document.addEventListener('DOMContentLoaded', function() {
    // Check if we are on the student dashboard page
    if (document.getElementById('job-listings-container')) {
        renderJobListings();
        setupStudentDashboardEventListeners();
    }

    // Check for employer dashboard
    if (document.getElementById('employer-listings-container')) {
        renderEmployerListings();
        setupEmployerDashboardEventListeners();
    }
});

function renderJobListings() {
    const container = document.getElementById('job-listings-container');
    container.innerHTML = ''; // Clear existing listings
    jobListings.forEach(job => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Type:</strong> ${job.type} | <strong>Location:</strong> ${job.location}</p>
            <p><strong>Pay:</strong> ${job.pay}</p>
            <p><strong>Required Skills:</strong> ${job.requiredSkills.join(', ')}</p>
            <button class="btn quick-apply-btn" data-job-id="${job.id}">Quick Apply</button>
        `;
        container.appendChild(card);
    });
}

function renderMyApplications() {
    const container = document.getElementById('my-applications-container');
    container.innerHTML = ''; // Clear existing applications
    if (myApplications.length === 0) {
        container.innerHTML = '<p>You have not applied to any jobs yet.</p>';
        return;
    }
    myApplications.forEach(app => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${app.jobTitle}</h3>
            <p><strong>Status:</strong> <span class="status-${app.status.toLowerCase()}">${app.status}</span></p>
        `;
        container.appendChild(card);
    });
}

function renderProfile() {
    const container = document.getElementById('my-profile-container');
    container.innerHTML = `
        <div class="card">
            <h3>${studentProfile.name}</h3>
            <p><strong>Email:</strong> ${studentProfile.email}</p>
            <p><strong>Open to:</strong> ${studentProfile.openTo.join(', ')}</p>
            <h4>Skills</h4>
            <ul>
                ${studentProfile.skills.map(skill => `<li>${skill}</li>`).join('')}
            </ul>
            <h4>Links</h4>
            <a href="${studentProfile.resumeUrl}" class="btn" target="_blank">View Resume</a>
            ${studentProfile.portfolioLinks.map(link => `<a href="${link}" class="btn" target="_blank">View Portfolio</a>`).join('')}
        </div>
    `;
}

function renderEmployerListings() {
    const container = document.getElementById('employer-listings-container');
    container.innerHTML = ''; // Clear existing content
    if (employerListings.length === 0) {
        container.innerHTML = '<p>You have not posted any jobs yet.</p>';
        return;
    }
    employerListings.forEach(job => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.company} - ${job.location}</p>
            <button class="btn view-applicants-btn" data-job-id="${job.id}" data-job-title="${job.title}">View Applicants</button>
        `;
        container.appendChild(card);
    });
}

function viewApplicants(jobId, jobTitle) {
    const container = document.getElementById('employer-listings-container');
    container.innerHTML = `
        <button id="back-to-listings-btn" class="btn">← Back to Listings</button>
        <h2>Applicants for ${jobTitle}</h2>
    `;

    // Hardcoded fake applicants for demo
    const fakeApplicants = [
        { name: 'John Doe', resume: '#' },
        { name: 'Jane Smith', resume: '#' }
    ];

    fakeApplicants.forEach(applicant => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h4>${applicant.name}</h4>
            <a href="${applicant.resume}" target="_blank" class="btn">View Resume</a>
            <button class="btn shortlist-btn">Shortlist</button>
            <button class="btn reject-btn">Reject</button>
            <button class="btn message-btn">Message</button>
        `;
        container.appendChild(card);
    });
}

function showSection(sectionId) {
    // Hide all dashboard sections
    document.querySelectorAll('#browse-section, #applications-section, #profile-section').forEach(section => {
        section.style.display = 'none';
    });

    // Show the selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
    }

    // Render content for the section when it's shown
    if (sectionId === 'applications-section') {
        renderMyApplications();
    } else if (sectionId === 'profile-section') {
        renderProfile();
    }
}

function setupStudentDashboardEventListeners() {
     // Event listener for "Quick Apply" buttons
    document.getElementById('job-listings-container').addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('quick-apply-btn')) {
            const jobId = parseInt(e.target.getAttribute('data-job-id'));
            
            // Check if already applied
            const hasApplied = myApplications.some(app => app.jobId === jobId);
            if (hasApplied) {
                alert('You have already applied for this job.');
                return;
            }

            const job = jobListings.find(j => j.id === jobId);
            if (job) {
                myApplications.push({
                    jobId: job.id,
                    jobTitle: job.title,
                    status: 'Applied'
                });
                alert('Application Submitted!');
            }
        }
    });
}

function showEmployerSection(sectionId) {
    // Hide all employer sections
    document.querySelectorAll('#listings-section, #post-job-section').forEach(section => {
        section.style.display = 'none';
    });
    // Show the selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.style.display = 'block';
    }

    if (sectionId === 'listings-section') {
        renderEmployerListings();
    }
}

function setupEmployerDashboardEventListeners() {
    // Listener for the "Post a Job" form
    document.getElementById('post-job-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newJob = {
            id: Date.now(), // Use timestamp for a simple unique ID
            title: document.getElementById('job-title').value,
            company: "My Demo Company", // Placeholder company name
            type: document.getElementById('job-type').value,
            location: document.getElementById('job-location').value,
            pay: document.getElementById('job-pay').value,
            description: document.getElementById('job-description').value,
            requiredSkills: document.getElementById('job-skills').value.split(',').map(skill => skill.trim()),
        };

        // Add the new job to our mock data arrays
        jobListings.unshift(newJob); // Add to the front for visibility
        employerListings.unshift(newJob);

        alert('Job posted successfully!');
        this.reset(); // Clear the form
        
        // Switch to listings view and re-render to show the new job
        showEmployerSection('listings-section');
    });

    // Delegated event listener for the listings container
    document.getElementById('employer-listings-container').addEventListener('click', function(e) {
        const target = e.target;
        if (target.classList.contains('view-applicants-btn')) {
            const jobId = target.getAttribute('data-job-id');
            const jobTitle = target.getAttribute('data-job-title');
            viewApplicants(jobId, jobTitle);
        } else if (target.id === 'back-to-listings-btn') {
            renderEmployerListings();
        } else if (target.classList.contains('shortlist-btn')) {
            alert('Candidate Shortlisted!');
        } else if (target.classList.contains('reject-btn')) {
            alert('Candidate Rejected!');
        } else if (target.classList.contains('message-btn')) {
            alert('Message Sent!');
        }
    });
}

// Add your scripts here