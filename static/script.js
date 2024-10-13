// JavaScript to handle scrolling to section of page
document.addEventListener('DOMContentLoaded', () => {
    const scrollLinks = document.querySelectorAll('.scroll-link');
    const topBar = document.querySelector('.top-bar');
    const topBarHeight = topBar ? topBar.offsetHeight : 0; // Get the top bar height

    scrollLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default anchor behavior
            
            const targetId = link.getAttribute('href').substring(1); // Get the target ID
            const targetElement = document.getElementById(targetId); // Get the target element

            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY; // Get the target position
                const offsetPosition = targetPosition - topBarHeight; // Adjust position for the top bar
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth' // Smooth scroll
                });
            } else {
            }
        });
    });
});

// JavaScript to underline top bar and change background color
document.addEventListener('DOMContentLoaded', () => {
    const scrollLinks = document.querySelectorAll('.scroll-link');
    const navLinksContainer = document.querySelector('.nav-links');
    const underline = document.createElement('div');
    underline.classList.add('underline');
    navLinksContainer.appendChild(underline);

    const topBar = document.querySelector('.top-bar');
    const topBarHeight = topBar ? topBar.offsetHeight : 0; // Get the top bar height

    function updateUnderline(link) {
        const linkRect = link.getBoundingClientRect();
        const containerRect = navLinksContainer.getBoundingClientRect();
        underline.style.width = `${linkRect.width}px`;
        underline.style.left = `${linkRect.left - containerRect.left}px`;
    }

    function initializeUnderline() {
        const activeLink = document.querySelector('.scroll-link.active');
        if (activeLink) {
            updateUnderline(activeLink);
        } else if (scrollLinks.length > 0) {
            updateUnderline(scrollLinks[0]);
        }
    }

    function updateActiveLink() {
        const sections = document.querySelectorAll('div[id]');
        let currentSection = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 60 && window.scrollY < sectionTop + sectionHeight - 60) {
                currentSection = section.getAttribute('id');
            }
        });

        scrollLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
                updateUnderline(link);
            }
        });

        // Check if the underline is under the "Photos" link
        const photosLink = document.querySelector('a[href="#intro"]'); // 'PHOTOS' link
        const photosLinkRect = photosLink ? photosLink.getBoundingClientRect() : null;

        if (photosLinkRect) {
            const underlineRect = underline.getBoundingClientRect();
            if (underlineRect.left >= photosLinkRect.left && underlineRect.right <= photosLinkRect.right) {
                // Underline is under 'Photos'
                topBar.classList.remove('black-background');
                topBar.classList.add('default-background');
            } else {
                // Underline is not under 'Photos'
                topBar.classList.remove('default-background');
                topBar.classList.add('black-background');
            }
        }
    }

    // Initialize underline position on page load
    initializeUnderline();

    // Update underline and active link on scroll
    window.addEventListener('scroll', updateActiveLink);

    // Optionally update the underline position on window resize
    window.addEventListener('resize', () => {
        const activeLink = document.querySelector('.scroll-link.active');
        if (activeLink) {
            updateUnderline(activeLink);
        }
    });
});

// Javascript for countdown
document.addEventListener('DOMContentLoaded', function () {
    function updateCountdown() {
        const now = new Date();
        const targetDate = new Date('2025-05-12T00:00:00');

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

// Javascript for RSVP
const { createClient } = supabase;
const _supabase = createClient('https://bdaxwicegvivvcspvclp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJkYXh3aWNlZ3ZpdnZjc3B2Y2xwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg3Nzg3OTAsImV4cCI6MjA0NDM1NDc5MH0.oBuSneA0ooFIZmxMt028YAsQHI5BQZZKjz8LXn7_Dp0');

document.addEventListener('DOMContentLoaded', async function() {
    let nameLibrary = [];

    try {
        // Fetch names from Supabase
        const { data, error } = await _supabase
            .from('Attendees')
            .select('name');

        if (error) {
            throw new Error(error.message);
        }

        nameLibrary = data.map(attendee => attendee.name);
    } catch (err) {
        console.error('Error fetching names:', err);
    }

    document.getElementById('search-button').addEventListener('click', function() {
        const inputValue = document.getElementById('name-input').value.trim();
        const resultMessage = document.getElementById('result-message');
        const selectButton = document.getElementById('select-button');

        if (nameLibrary.includes(inputValue)) {
            resultMessage.textContent = inputValue;
            resultMessage.style.display = 'block';
            selectButton.style.display = 'inline-block';
        } else {
            resultMessage.textContent = 'Name not found';
            resultMessage.style.display = 'block';
            selectButton.style.display = 'none';
        }
    });

    document.getElementById('select-button').addEventListener('click', function() {
        const selectedName = document.getElementById('result-message').textContent;

        document.getElementById('rsvp').style.display = 'none';
        document.getElementById('new-form').style.display = 'block';

        document.querySelector('#new-form h1').textContent = selectedName;
    });

    document.getElementById('new-form-content').addEventListener('submit', async function(event) {
        event.preventDefault(); // Prevent the default form submission

        const phoneNumber = document.getElementById('phone-number').value.trim();
        const attending = document.getElementById('attendance').value;
        const plusOneName = document.getElementById('plus-one-name').value.trim();
        const selectedName = document.querySelector('#new-form h1').textContent;

        try {
            const { error } = await _supabase
                .from('Attendees')
                .update({ phone: phoneNumber, attendance: attending, plusone: plusOneName })
                .eq('name', selectedName);

            if (error) {
                throw new Error(error.message);
            }

            const inputContainers = document.querySelectorAll('#new-form .input-container');
            inputContainers.forEach(container => container.remove());
            document.getElementById('submit').remove();

            document.querySelector('#new-form h1').textContent = "💌 We look forward to seeing you!";
            
            document.getElementById('new-form').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        } catch (err) {
            console.error('Error updating attendance:', err);
        }
    });

    document.getElementById('attendance').addEventListener('change', function() {
        const selectElement = document.getElementById('attendance');
        if (selectElement.value) {
            selectElement.classList.add('has-value');
        } else {
            selectElement.classList.remove('has-value');
        }
    });

    document.getElementById('phone-number').addEventListener('input', function() {
        let value = this.value.replace(/\D/g, '');
        if (value.length <= 3) {
            this.value = `(${value}`;
        } else if (value.length <= 6) {
            this.value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
        } else {
            this.value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }
    });

    const checkbox = document.getElementById('plus-one-checkbox');
    const plusOneFields = document.getElementById('plus-one-fields');
    const plusOneNameInput = document.getElementById('plus-one-name');
    
    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            plusOneFields.style.display = 'block';
            plusOneNameInput.setAttribute('required', 'required');
        } else {
            plusOneFields.style.display = 'none';
            plusOneNameInput.removeAttribute('required');
        }
    });
});

// Javascript for rsvp form load in
document.addEventListener('DOMContentLoaded', function() {
    const rsvpForm = document.querySelector('.rsvp-form');
    const rsvpSection = document.getElementById('rsvp');
    const form = document.querySelector('#new-form .rsvp-form');
    const scrollThreshold = rsvpSection.offsetTop + 100; // Adjust this value as needed

    function handleScroll() {
        if (window.scrollY + window.innerHeight > scrollThreshold) {
            rsvpForm.classList.add('drop-in');
            form.classList.add('drop-in');
        } else {
            rsvpForm.classList.remove('drop-in');
            form.classList.remove('drop-in');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on page load in case already scrolled
});

// JavaScript for registries load-in
document.addEventListener('DOMContentLoaded', function() {
    const registriesSection = document.getElementById('registries');
    const registriesImages = registriesSection.querySelectorAll('.image-class'); // Replace '.image-class' with the actual class for your images
    const scrollThreshold = registriesSection.offsetTop + 0; // Adjust this value as needed

    function handleScroll() {
        if (window.scrollY + window.innerHeight > scrollThreshold) {
            registriesSection.classList.add('animate-images');
            registriesImages.forEach(image => {
                image.classList.add('animate-images'); // Add animation class to each image
            });
        } else {
            registriesSection.classList.remove('animate-images');
            registriesImages.forEach(image => {
                image.classList.remove('animate-images'); // Remove animation class from each image
            });
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on page load in case already scrolled
});

// JavaScript for triggering the typing effect on scroll
document.addEventListener('DOMContentLoaded', function() {
    const venueSection = document.getElementById('venue');
    const venueTitle = venueSection.querySelector('h1');
    
    // Create an Intersection Observer to detect when the venue section comes into view
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                venueTitle.classList.add('typed-text');
                observer.unobserve(venueTitle); // Stop observing after the animation triggers
            }
        });
    }, { threshold: 0.1 }); // Adjust threshold as needed

    observer.observe(venueTitle); // Start observing the title
});