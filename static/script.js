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
function handleVisibility(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.tagName === 'H2' || entry.target.tagName === 'P') {
                entry.target.classList.add('visible');
            }
            if (entry.target.tagName === 'H3') {
                entry.target.classList.add('visible');  // Add the 'visible' class to trigger the width change
            }
            observer.unobserve(entry.target);
        }
    });
}

// Create an IntersectionObserver instance
const observer = new IntersectionObserver(handleVisibility, {
    threshold: 0.1, // Trigger when 10% of the element is in view
});

// Observe the elements
document.querySelectorAll('h2, p, h3').forEach(element => {
    observer.observe(element);
});