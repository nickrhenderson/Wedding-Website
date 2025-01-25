// Function for Image Shuffle
const imgShuffle = document.querySelector('.img-shuffle');
const images = imgShuffle.querySelectorAll('img');
const totalImages = images.length;
let currentIndex = 0;
const imageDelay = 5000; // Default delay is 3 seconds per image

// Function to fade in images one by one
function shuffleImages() {
    // Remove 'active' class from all images
    images.forEach(img => img.classList.remove('active'));

    // Add 'active' class to the current image (fade it in)
    images[currentIndex].classList.add('active');

    // Increment the index and reset if we reach the last image
    currentIndex = (currentIndex + 1) % totalImages;
}

// Initialize the shuffle sequence
shuffleImages();

// Set interval to cycle through images
setInterval(shuffleImages, imageDelay);

// Function for Countdown Timer
document.addEventListener('DOMContentLoaded', function () {
    function updateCountdown() {
        const now = new Date();
        const targetDate = new Date('2025-05-12T15:00:00');

        const timeDifference = targetDate - now;

        if (timeDifference <= 0) {
            document.querySelectorAll('.countdown').forEach(element => {
                element.innerHTML = 'The date has passed!';
            });
            return;
        }

        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        const countdownText = `
            <div class="countdown-item">
                <div class="countdown-number">${days}</div>
                <div class="countdown-label">DAYS</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number">${hours}</div>
                <div class="countdown-label">HOURS</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number">${minutes}</div>
                <div class="countdown-label">MINUTES</div>
            </div>
            <div class="countdown-item">
                <div class="countdown-number">${seconds}</div>
                <div class="countdown-label">SECONDS</div>
            </div>
        `;

        document.querySelectorAll('.countdown').forEach(element => {
            element.innerHTML = countdownText;
        });
    }

    // Update the countdown immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
});

// Function for Polka Dots
document.addEventListener("DOMContentLoaded", () => {
    const navBar = document.querySelector(".nav-bar");
    const maxDots = 50; // Maximum number of dots that can exist at any time
    let dotCount = 0; // Track the number of dots currently created

    function createPolkaDot() {
        if (dotCount >= maxDots) return; // Stop creating dots if max is reached

        const dot = document.createElement("div");
        dot.classList.add("polka-dot");

        // Random position for the dot within the nav-bar
        const randomX = Math.random() * 100;
        const randomDelay = Math.random() * 2; // Random delay for animation
        const size = Math.random() * 5 + 5; // Random size between 5px and 10px

        dot.style.left = `calc(${randomX}% - ${size / 2}px)`; // Horizontal position
        dot.style.animationDelay = `${randomDelay}s`;
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;

        navBar.appendChild(dot);
        dotCount++;

        // Remove the dot after animation ends
        dot.addEventListener('animationend', () => {
            dot.remove();
            dotCount--; // Decrement the counter when the dot is removed
        });
    }

    // Create new dots at intervals (200ms between each)
    setInterval(createPolkaDot, 200);
});

// Function for nav-bar load in
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-bar a');
    
    // Create an Intersection Observer to detect when elements are in the viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a class to trigger the animation when the link enters the viewport
                const link = entry.target;
                link.classList.add('in-view');
                link.style.animationDelay = `${index * 0.3}s`; // Delay animation based on the index
            }
        });
    }, {
        threshold: 0.5 // The link is considered in view when 50% of it is visible
    });

    // Observe each nav link
    navLinks.forEach((link) => {
        observer.observe(link);
    });
});

//Function for registires
document.querySelectorAll('.registries svg').forEach(svg => {
    svg.addEventListener('mousemove', (event) => {
        const rect = svg.getBoundingClientRect();
        const svgCenterX = rect.left + rect.width / 2;
        const svgCenterY = rect.top + rect.height / 2;

        const deltaX = event.clientX - svgCenterX;
        const deltaY = event.clientY - svgCenterY;

        // Normalize the tilt values based on the SVG dimensions
        const tiltX = (deltaY / rect.height) * 50; // Adjust 10 for tilt intensity on X-axis
        const tiltY = -(deltaX / rect.width) * 50; // Adjust 10 for tilt intensity on Y-axis

        svg.style.transform = `perspective(500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`;
    });

    svg.addEventListener('mouseleave', () => {
        svg.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
});

// Firebase import inside the module script
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getDatabase, ref, get, set, update } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js';

// Initialize Firebase (add your Firebase config here)
const firebaseConfig = {
    apiKey: "AIzaSyD8hHOwcYp5h-qqbtrDhjC7hz-2U_nRo5s",
    authDomain: "logan-nick-wedding.firebaseapp.com",
    databaseURL: "https://logan-nick-wedding-default-rtdb.firebaseio.com",
    projectId: "logan-nick-wedding",
    storageBucket: "logan-nick-wedding.firebasestorage.app",
    messagingSenderId: "846981011315",
    appId: "1:846981011315:web:68be04c1b8298e84d35706",
    measurementId: "G-Y6P355C78R"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// The rest of your event listeners and logic
const rsvpButton = document.getElementById('rsvpButton');
const formContainer = document.getElementById('formContainer');
const nameEntry = document.getElementById('nameEntry');
const nameSubmit = document.getElementById('nameSubmit');
const attendanceOptions = document.getElementById('attendanceOptions');
const attendanceSubmit = document.getElementById('attendanceSubmit');
const responseMessage = document.getElementById('responseMessage');

rsvpButton.addEventListener('click', () => {
    rsvpButton.classList.add('hidden');
    formContainer.classList.remove('hidden');
});

async function handleNameSubmit(event) {
    event.preventDefault();

    const nameInput = await formatName(document.getElementById('name').value.trim());
    const nameLabel = document.querySelector('label[for="name"]');
    
    // Validate name field
    if (nameInput === '') {
        document.getElementById('name').classList.add('error');
        nameLabel.textContent = "NAME NOT FOUND";
    } else {
        document.getElementById('name').classList.remove('error');
        nameLabel.textContent = "NAME";
        nameEntry.classList.add('hidden');
        attendanceOptions.classList.remove('hidden');
        checkNameInDatabase(nameInput);
    }
}

async function handleAttendanceSubmit(event) {
    event.preventDefault();

    const attendanceInput = document.getElementById('attendance');
    const plusOneInput = document.getElementById('plus-one');
    const nameInput = await formatName(document.getElementById('name').value.trim());

    if (attendanceInput.value === '') {
        attendanceInput.classList.add('error');
    } else {
        attendanceInput.classList.remove('error');
        const attendanceData = {
            attendance: attendanceInput.value,
            'plus-one': plusOneInput.value.trim() || ''
        };

        // Update database
        updateAttendanceInDatabase(nameInput, attendanceData);
        displayAttendanceMessage(attendanceInput.value, nameInput);
        formContainer.classList.add('hidden');
        responseMessage.classList.remove('hidden');
    }
}

function displayAttendanceMessage(status, name) {
    const messages = {
        'attending': `🎊 We look forward to seeing you ${name}! 🎊`,
        'maybe': `🎊 We look forward hoping to seeing you ${name}! 🎊`,
        'not-attending': `🎊 Sorry you can't attend ${name}, best wishes! 🎊`
    };
    responseMessage.textContent = messages[status] || '';
}

async function formatName(name) {
    const dbRef = ref(database, 'users');
    try {
        const snapshot = await get(dbRef);
        const usersData = snapshot.val();
        
        if (!usersData) return '';
        
        const matchedKey = Object.keys(usersData).find(key => key.toLowerCase() === name.toLowerCase());
        return matchedKey ? String(matchedKey) : '';
    } catch (error) {
        return ''; // Return an empty string on error
    }
}

async function checkNameInDatabase(name) {
    const dbRef = ref(database, 'users');
    try {
        const snapshot = await get(dbRef);
        const usersData = snapshot.val();
        
        if (!usersData) return false;
        
        return usersData.hasOwnProperty(name); // Check if the name exists in the database
    } catch (error) {
        return false; // Return false if an error occurs
    }
}

function updateAttendanceInDatabase(name, data) {
    const userRef = ref(database, 'users/' + name);
    update(userRef, data).then(() => {
        console.log(`Successfully updated attendance for ${name}`);
    }).catch((error) => {
        console.error('Error updating data:', error);
    });
}

// Event listeners
nameSubmit.addEventListener('click', handleNameSubmit);
attendanceSubmit.addEventListener('click', handleAttendanceSubmit);

// Function to observe the elements when they come into view
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.info > div.section');

    const revealOnScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight;

            if (sectionTop < viewportHeight - 100) { // Adjust threshold as needed
                section.classList.add('visible');
            }
        });
    };

    // Trigger animations on scroll
    window.addEventListener('scroll', revealOnScroll);

    // Trigger animations on load in case some sections are already in view
    revealOnScroll();
});

// Function to generate about-us hearts
document.addEventListener("DOMContentLoaded", () => {
    const heartContainer = document.querySelector(".heart-container");

    // Check if heartContainer exists
    if (!heartContainer) {
        console.error("Missing .heart-container element.");
        return;
    }

    // Function to generate hearts
    function createHearts() {
        // Generate hearts periodically
        setInterval(() => {
            const heart = document.createElement("div");
            heart.classList.add("heart");

            // Randomize size, position, rotation, and animation duration
            const size = Math.random() * 20 + 10; // Random size (10px to 30px)
            const left = Math.random() * 100; // Random horizontal position (0% to 100%)
            const duration = Math.random() * 3 + 3; // Random animation duration (3s to 6s)
            const rotation = Math.random() * 360 - 180; // Random initial rotation (-180deg to 180deg)

            // Add heart emoji content
            heart.textContent = "❤️"; // Heart emoji

            // Apply styles
            heart.style.fontSize = `${size}px`; // Size of the heart emoji
            heart.style.left = `${left}%`; // Position horizontally
            heart.style.animationDuration = `${duration}s`; // Random duration
            heart.style.setProperty("--initial-rotation", `${rotation}deg`); // Set custom rotation
            heart.style.transform = `rotate(${rotation}deg)`; // Apply random starting rotation

            heartContainer.appendChild(heart);

            // Remove the heart after its animation completes
            setTimeout(() => {
                heart.remove();
            }, duration * 1000); // Remove after the animation duration
        }, Math.random() * 500 + 300); // Randomize interval (300ms to 800ms)
    }

    // Start generating hearts immediately after DOM is loaded
    createHearts();
});