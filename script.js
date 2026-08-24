document.addEventListener('DOMContentLoaded', () => {
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const pageSections = document.querySelectorAll('.page-section');

  // Mobile menu toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Handle SPA navigation switching
  window.switchPage = function(pageId) {
    // Hide all pages
    pageSections.forEach(section => {
      section.classList.remove('active');
    });

    // Deactivate all nav links
    navLinks.forEach(link => {
      link.classList.remove('active');
    });

    // Show target page
    const targetSection = document.getElementById(pageId);
    if (targetSection) {
      targetSection.classList.add('active');
    }

    // Activate corresponding nav link
    const targetLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
    if (targetLink) {
      targetLink.classList.add('active');
    }

    // Close mobile navigation drawer if open
    if (navMenu.classList.contains('active')) {
      navMenu.classList.remove('active');
    }

    // Keep direct hash loads and mobile navigation aligned below the sticky header.
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  // Attach click listener to nav links
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.getAttribute('data-page');
      switchPage(pageId);
    });
  });

  // Handle URL hash routing on direct link/refresh
  const initialHash = window.location.hash.substring(1);
  if (initialHash && document.getElementById(initialHash)) {
    switchPage(initialHash);
  }
});

const WHATSAPP_NUMBER = '27719094077';

function openWhatsApp(message) {
  const encodedMessage = encodeURIComponent(message);
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank', 'noopener');
}

// Registration Form Submission Handler
function handleRegistration(event) {
  event.preventDefault();
  
  const getValue = (id) => document.getElementById(id)?.value || '';
  const getCheckedValue = (name) => document.querySelector(`input[name="${name}"]:checked`)?.value || '';

  const message = [
    'Assalaamu Alaikum, I would like to submit a 2027 student admission form for Baytul-Hikmah.',
    '',
    `Name: ${getValue('regFullName')}`,
    `Father's Name: ${getValue('regFatherName')}`,
    `Date of Birth: ${getValue('regDob')}`,
    `Previous School/Madrassah: ${getValue('regPreviousSchool')}`,
    `Nationality: ${getValue('regNationality')}`,
    `Level of Quranic Knowledge: ${getCheckedValue('quranLevel')}`,
    `Parent/Guardian Name: ${getValue('regGuardianName')}`,
    `Parent/Guardian Surname: ${getValue('regGuardianSurname')}`,
    `Parent/Guardian Relationship: ${getValue('regGuardianRelationship')}`,
    `Physical Address: ${getValue('regAddress')}`,
    `Contact Number: ${getValue('regPhone')}`,
    `Course: ${getCheckedValue('course')}`,
    'Declaration: I Agree',
    `Able to pay monthly fees: ${getCheckedValue('fees')}`,
    `Date of Admission: ${getValue('regAdmissionDate')}`
  ].filter(Boolean).join('\n');

  openWhatsApp(message);
  
  document.getElementById('registrationForm').reset();
}

// Contact Form Submission Handler
function handleContact(event) {
  event.preventDefault();
  
  const name = document.getElementById('cName').value;
  const phone = document.getElementById('cPhone').value;
  const enquiry = document.getElementById('cMessage').value;

  const message = [
    'Assalaamu Alaikum, I would like to make an enquiry about Baytul-Hikmah.',
    '',
    `Name: ${name}`,
    `Contact / WhatsApp: ${phone}`,
    `Message: ${enquiry}`
  ].join('\n');

  openWhatsApp(message);
  
  document.getElementById('contactForm').reset();
}
