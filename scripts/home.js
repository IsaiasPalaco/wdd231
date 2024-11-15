document.addEventListener("DOMContentLoaded", function() {
    const currentYear = new Date().getFullYear();
    document.getElementById("currentyear").textContent = currentYear;
    const lastModified = document.lastModified;
    document.getElementById("lastModified").textContent = `Last Modified: ${lastModified}`;
});

document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu'); 
    const navLinks = document.getElementById('nav-links'); 

    menuIcon.addEventListener('click', () => {
        navLinks.classList.toggle('show'); 
        menuIcon.classList.toggle('open'); 
    });

    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming...',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web...',
            technology: ['HTML', 'CSS'],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized...',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes...',
            technology: ['C#'],
            completed: false
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience...',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience...',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: false
        }
    ];

    const coursesContainer = document.getElementById("courses-content");
    const totalCreditsElement = document.getElementById("total-credits");
    const filterButtons = document.querySelectorAll(".filter-btn");

    function displayCourses(filteredCourses) {
        coursesContainer.innerHTML = '';

        let totalCredits = 0;

        filteredCourses.forEach(course => {
            const courseElement = document.createElement('div');
            courseElement.classList.add('course-card');
            if (course.completed) {
                courseElement.classList.add('completed');
            }

            courseElement.innerHTML = `
                <p><strong>${course.subject} ${course.number}</strong></p>
            `;

            coursesContainer.appendChild(courseElement);

            if (course.completed) {
                totalCredits += course.credits;
            }
        });

        totalCreditsElement.textContent = `Total Credits: ${totalCredits}`;
    }

    function filterCourses(subject) {
        let filteredCourses;
        if (subject === "all") {
            filteredCourses = courses;
        } else {
            filteredCourses = courses.filter(course => course.subject === subject);
        }
        displayCourses(filteredCourses);
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterType = button.dataset.filter;
            filterCourses(filterType);
        });
    });

    filterCourses("all");
});










