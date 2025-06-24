// Global Variables
let currentUser = null
let selectedRole = "traveler"
let bookingData = {}

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
  initializeWebsite()
  addScrollEffects()
  addAnimations()
})

// Initialize Website
function initializeWebsite() {
  // Add smooth scrolling to navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Add active class to navigation based on scroll
  window.addEventListener("scroll", updateActiveNavigation)

  // Initialize search functionality
  initializeSearch()

  // Load user data if logged in
  loadUserData()
}

// Search Tab Switching
function switchTab(tabName) {
  // Hide all search forms
  document.querySelectorAll(".search-form").forEach((form) => {
    form.classList.add("hidden")
  })

  // Remove active class from all tabs
  document.querySelectorAll(".search-tab").forEach((tab) => {
    tab.classList.remove("active")
  })

  // Show selected form and activate tab
  document.getElementById(tabName + "Search").classList.remove("hidden")
  event.target.classList.add("active")
}

// Search Functions
function searchPackages() {
  const destination = document.querySelector('#packagesSearch input[type="text"]').value
  const date = document.querySelector('#packagesSearch input[type="date"]').value
  const guests = document.querySelector("#packagesSearch select").value

  if (!destination.trim()) {
    showNotification("Please enter a destination", "error")
    return
  }

  showNotification("Searching packages for " + destination + "...", "info")

  // Simulate search delay
  setTimeout(() => {
    const packages = getPackagesByDestination(destination)
    displaySearchResults(packages, "packages")
  }, 1500)
}

function searchFlights() {
  const from = document.querySelector("#flightsSearch input:nth-child(1)").value
  const to = document.querySelector("#flightsSearch input:nth-child(2)").value
  const date = document.querySelector('#flightsSearch input[type="date"]').value

  if (!from.trim() || !to.trim()) {
    showNotification("Please enter both departure and destination cities", "error")
    return
  }

  showNotification("Searching flights from " + from + " to " + to + "...", "info")

  setTimeout(() => {
    const flights = getFlightResults(from, to, date)
    displaySearchResults(flights, "flights")
  }, 1500)
}

function searchHotels() {
  const destination = document.querySelector('#hotelsSearch input[type="text"]').value
  const checkin = document.querySelector("#hotelsSearch input:nth-child(2)").value
  const checkout = document.querySelector("#hotelsSearch input:nth-child(3)").value

  if (!destination.trim()) {
    showNotification("Please enter a destination", "error")
    return
  }

  showNotification("Searching hotels in " + destination + "...", "info")

  setTimeout(() => {
    const hotels = getHotelResults(destination, checkin, checkout)
    displaySearchResults(hotels, "hotels")
  }, 1500)
}

function searchCabs() {
  const pickup = document.querySelector("#cabsSearch input:nth-child(1)").value
  const drop = document.querySelector("#cabsSearch input:nth-child(2)").value
  const datetime = document.querySelector('#cabsSearch input[type="datetime-local"]').value

  if (!pickup.trim() || !drop.trim()) {
    showNotification("Please enter both pickup and drop locations", "error")
    return
  }

  showNotification("Searching cabs from " + pickup + " to " + drop + "...", "info")

  setTimeout(() => {
    const cabs = getCabResults(pickup, drop, datetime)
    displaySearchResults(cabs, "cabs")
  }, 1500)
}

// Mock Data Functions
function getPackagesByDestination(destination) {
  const allPackages = [
    {
      id: "golden-triangle",
      name: "Golden Triangle Tour",
      destination: "Delhi-Agra-Jaipur",
      price: 15999,
      originalPrice: 19999,
      duration: "6 Days / 5 Nights",
      rating: 4.8,
      reviews: 2340,
      image: "golden-triangle",
      features: ["4-Star Hotels", "All Meals", "AC Transport", "Guide Included"],
    },
    {
      id: "kashmir",
      name: "Kashmir Paradise",
      destination: "Srinagar-Gulmarg-Pahalgam",
      price: 24999,
      originalPrice: 29999,
      duration: "7 Days / 6 Nights",
      rating: 4.9,
      reviews: 1890,
      image: "kashmir",
      features: ["5-Star Hotels", "Houseboat Stay", "Shikara Ride", "Cable Car"],
    },
    {
      id: "goa",
      name: "Goa Beach Holiday",
      destination: "North & South Goa",
      price: 18999,
      originalPrice: 22999,
      duration: "5 Days / 4 Nights",
      rating: 4.6,
      reviews: 3120,
      image: "goa",
      features: ["Beach Resort", "Water Sports", "Cruise Dinner", "Sightseeing"],
    },
  ]

  return allPackages.filter(
    (pkg) =>
      pkg.destination.toLowerCase().includes(destination.toLowerCase()) ||
      pkg.name.toLowerCase().includes(destination.toLowerCase()),
  )
}

function getFlightResults(from, to, date) {
  return [
    {
      airline: "IndiGo",
      flightNumber: "6E-234",
      departure: "06:30",
      arrival: "08:45",
      duration: "2h 15m",
      price: 4500,
      from: from,
      to: to,
      date: date,
    },
    {
      airline: "Air India",
      flightNumber: "AI-101",
      departure: "14:20",
      arrival: "16:50",
      duration: "2h 30m",
      price: 5200,
      from: from,
      to: to,
      date: date,
    },
    {
      airline: "SpiceJet",
      flightNumber: "SG-456",
      departure: "19:15",
      arrival: "21:35",
      duration: "2h 20m",
      price: 3800,
      from: from,
      to: to,
      date: date,
    },
  ]
}

function getHotelResults(destination, checkin, checkout) {
  return [
    {
      name: "Grand Palace Hotel",
      location: destination,
      rating: 4.5,
      price: 3500,
      amenities: ["Free WiFi", "Pool", "Spa", "Restaurant"],
      image: "hotel1",
    },
    {
      name: "Royal Heritage Resort",
      location: destination,
      rating: 4.8,
      price: 5200,
      amenities: ["Free WiFi", "Pool", "Gym", "Room Service"],
      image: "hotel2",
    },
    {
      name: "Budget Inn",
      location: destination,
      rating: 4.2,
      price: 1800,
      amenities: ["Free WiFi", "AC", "Restaurant"],
      image: "hotel3",
    },
  ]
}

function getCabResults(pickup, drop, datetime) {
  return [
    {
      type: "Sedan",
      model: "Swift Dzire",
      price: 12,
      estimatedFare: 450,
      duration: "45 mins",
      driver: "Rajesh Kumar",
      rating: 4.7,
    },
    {
      type: "SUV",
      model: "Innova Crysta",
      price: 18,
      estimatedFare: 680,
      duration: "45 mins",
      driver: "Amit Singh",
      rating: 4.8,
    },
    {
      type: "Hatchback",
      model: "Maruti Alto",
      price: 10,
      estimatedFare: 380,
      duration: "50 mins",
      driver: "Suresh Yadav",
      rating: 4.5,
    },
  ]
}

// Display Search Results
function displaySearchResults(results, type) {
  if (results.length === 0) {
    showNotification("No results found. Try different search criteria.", "warning")
    return
  }

  let resultsHTML = `<h3>Search Results (${results.length} found)</h3><div class="search-results">`

  results.forEach((result) => {
    if (type === "packages") {
      resultsHTML += createPackageResultHTML(result)
    } else if (type === "flights") {
      resultsHTML += createFlightResultHTML(result)
    } else if (type === "hotels") {
      resultsHTML += createHotelResultHTML(result)
    } else if (type === "cabs") {
      resultsHTML += createCabResultHTML(result)
    }
  })

  resultsHTML += "</div>"

  // Create and show results modal
  showResultsModal(resultsHTML)
}

function createPackageResultHTML(pkg) {
  return `
        <div class="result-card">
            <div class="result-image ${pkg.image}"></div>
            <div class="result-content">
                <h4>${pkg.name}</h4>
                <p>${pkg.destination}</p>
                <div class="result-rating">
                    <span class="stars">${"★".repeat(Math.floor(pkg.rating))}${"☆".repeat(5 - Math.floor(pkg.rating))}</span>
                    <span>${pkg.rating} (${pkg.reviews} reviews)</span>
                </div>
                <div class="result-price">
                    <span class="original-price">₹${pkg.originalPrice}</span>
                    <span class="current-price">₹${pkg.price}</span>
                </div>
                <button onclick="bookPackage('${pkg.id}')" class="book-btn">Book Now</button>
            </div>
        </div>
    `
}

function createFlightResultHTML(flight) {
  return `
        <div class="result-card">
            <div class="flight-info">
                <h4>${flight.airline} ${flight.flightNumber}</h4>
                <div class="flight-route">
                    <span>${flight.from} ${flight.departure}</span>
                    <span>→</span>
                    <span>${flight.to} ${flight.arrival}</span>
                </div>
                <p>Duration: ${flight.duration}</p>
                <div class="result-price">
                    <span class="current-price">₹${flight.price}</span>
                </div>
            </div>
        </div>
    `
}

function createHotelResultHTML(hotel) {
  return `
        <div class="result-card">
            <div class="hotel-info">
                <h4>${hotel.name}</h4>
                <p>${hotel.location}</p>
                <div class="result-rating">
                    <span class="stars">${"★".repeat(Math.floor(hotel.rating))}${"☆".repeat(5 - Math.floor(hotel.rating))}</span>
                    <span>${hotel.rating}</span>
                </div>
                <div class="amenities">
                    ${hotel.amenities.map((amenity) => `<span class="amenity">${amenity}</span>`).join("")}
                </div>
                <div class="result-price">
                    <span class="current-price">₹${hotel.price}/night</span>
                </div>
            </div>
        </div>
    `
}

function createCabResultHTML(cab) {
  return `
        <div class="result-card">
            <div class="cab-info">
                <h4>${cab.type} - ${cab.model}</h4>
                <p>Driver: ${cab.driver} (${cab.rating}★)</p>
                <p>Estimated Time: ${cab.duration}</p>
                <div class="result-price">
                    <span class="current-price">₹${cab.estimatedFare}</span>
                    <span class="rate">₹${cab.price}/km</span>
                </div>
            </div>
        </div>
    `
}

// Modal Functions
function openLoginModal() {
  document.getElementById("loginModal").style.display = "block"
}

function closeLoginModal() {
  document.getElementById("loginModal").style.display = "none"
}

function openSignupModal() {
  closeLoginModal()
  showNotification("Signup functionality will be available soon!", "info")
}

function selectRole(role) {
  selectedRole = role
  document.querySelectorAll(".role-btn").forEach((btn) => btn.classList.remove("active"))
  event.target.classList.add("active")
}

function handleLogin(event) {
  event.preventDefault()

  const email = event.target.querySelector('input[type="email"]').value
  const password = event.target.querySelector('input[type="password"]').value

  if (!email || !password) {
    showNotification("Please fill in all fields", "error")
    return
  }

  // Simulate login process
  showNotification("Logging in...", "info")

  setTimeout(() => {
    currentUser = {
      email: email,
      role: selectedRole,
      name: email.split("@")[0],
    }

    localStorage.setItem("currentUser", JSON.stringify(currentUser))

    closeLoginModal()
    updateUIForLoggedInUser()
    showNotification(`Welcome back, ${currentUser.name}!`, "success")

    if (selectedRole === "admin") {
      showNotification("Admin panel access granted", "success")
    }
  }, 1500)
}

function logout() {
  currentUser = null
  localStorage.removeItem("currentUser")
  updateUIForLoggedOutUser()
  showNotification("Logged out successfully", "success")
}

function forgotPassword() {
  closeLoginModal()
  showNotification("Password reset link will be sent to your email", "info")
}

// Booking Functions
function viewDestination(destinationId) {
  const destinations = {
    "golden-triangle": {
      name: "Golden Triangle Tour",
      description:
        "Experience the magnificent Golden Triangle covering Delhi, Agra, and Jaipur. Visit iconic monuments like Taj Mahal, Red Fort, and Amber Palace.",
      highlights: ["Taj Mahal at sunrise", "Red Fort Delhi", "Amber Palace Jaipur", "Local markets", "Cultural shows"],
      duration: "6 Days / 5 Nights",
      price: 15999,
    },
    kashmir: {
      name: "Kashmir Paradise",
      description:
        "Discover the breathtaking beauty of Kashmir with its pristine lakes, snow-capped mountains, and beautiful gardens.",
      highlights: [
        "Dal Lake Shikara ride",
        "Gulmarg cable car",
        "Mughal gardens",
        "Pahalgam valleys",
        "Houseboat stay",
      ],
      duration: "7 Days / 6 Nights",
      price: 24999,
    },
  }

  const destination = destinations[destinationId]
  if (destination) {
    showDestinationModal(destination)
  }
}

function bookPackage(packageId) {
  if (!currentUser) {
    showNotification("Please login to book packages", "warning")
    openLoginModal()
    return
  }

  bookingData = { packageId, userId: currentUser.email }
  showBookingModal(packageId)
}

function showBookingModal(packageId) {
  const bookingHTML = `
        <h3>Book Your Package</h3>
        <div class="booking-form">
            <div class="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Enter your full name" required>
            </div>
            <div class="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="Enter your phone number" required>
            </div>
            <div class="form-group">
                <label>Travel Date</label>
                <input type="date" required>
            </div>
            <div class="form-group">
                <label>Number of Travelers</label>
                <select required>
                    <option value="1">1 Person</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                    <option value="5">5+ People</option>
                </select>
            </div>
            <div class="form-group">
                <label>Special Requests</label>
                <textarea placeholder="Any special requirements or requests"></textarea>
            </div>
            <div class="booking-summary">
                <h4>Booking Summary</h4>
                <p>Package: Golden Triangle Tour</p>
                <p>Duration: 6 Days / 5 Nights</p>
                <p>Price: ₹15,999 per person</p>
            </div>
            <button onclick="confirmBooking()" class="book-btn">Confirm Booking</button>
        </div>
    `

  document.getElementById("bookingContent").innerHTML = bookingHTML
  document.getElementById("bookingModal").style.display = "block"
}

function closeBookingModal() {
  document.getElementById("bookingModal").style.display = "none"
}

function confirmBooking() {
  const form = document.querySelector(".booking-form")
  const formData = new FormData()

  // Validate form
  const inputs = form.querySelectorAll("input[required], select[required]")
  let isValid = true

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      isValid = false
      input.style.borderColor = "#ff6b6b"
    } else {
      input.style.borderColor = "#eee"
    }
  })

  if (!isValid) {
    showNotification("Please fill in all required fields", "error")
    return
  }

  // Simulate booking process
  showNotification("Processing your booking...", "info")

  setTimeout(() => {
    closeBookingModal()
    showNotification("Booking confirmed! You will receive confirmation details via email.", "success")

    // Store booking in localStorage for demo
    const bookings = JSON.parse(localStorage.getItem("userBookings") || "[]")
    bookings.push({
      id: Date.now(),
      packageId: bookingData.packageId,
      userId: currentUser.email,
      date: new Date().toISOString(),
      status: "confirmed",
    })
    localStorage.setItem("userBookings", JSON.stringify(bookings))
  }, 2000)
}

// Newsletter Functions
function subscribeNewsletter() {
  const email = document.getElementById("newsletterEmail").value

  if (!email || !isValidEmail(email)) {
    showNotification("Please enter a valid email address", "error")
    return
  }

  showNotification("Subscribing to newsletter...", "info")

  setTimeout(() => {
    document.getElementById("newsletterEmail").value = ""
    showNotification("Successfully subscribed to newsletter!", "success")

    // Store subscription in localStorage for demo
    const subscribers = JSON.parse(localStorage.getItem("newsletterSubscribers") || "[]")
    if (!subscribers.includes(email)) {
      subscribers.push(email)
      localStorage.setItem("newsletterSubscribers", JSON.stringify(subscribers))
    }
  }, 1500)
}

// Utility Functions
function showNotification(message, type = "info") {
  const notification = document.getElementById("notification")
  const notificationText = document.getElementById("notificationText")

  notificationText.textContent = message
  notification.className = `notification ${type}`
  notification.style.display = "flex"

  // Auto hide after 5 seconds
  setTimeout(() => {
    closeNotification()
  }, 5000)
}

function closeNotification() {
  document.getElementById("notification").style.display = "none"
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function toggleMobileMenu() {
  const navMenu = document.getElementById("navMenu")
  navMenu.classList.toggle("mobile-active")
}

function updateActiveNavigation() {
  const sections = document.querySelectorAll("section[id]")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active")
    }
  })
}

function loadUserData() {
  const savedUser = localStorage.getItem("currentUser")
  if (savedUser) {
    currentUser = JSON.parse(savedUser)
    updateUIForLoggedInUser()
  }
}

function updateUIForLoggedInUser() {
  const loginBtn = document.querySelector(".login-btn")
  loginBtn.textContent = currentUser.name
  loginBtn.onclick = showUserMenu
}

function updateUIForLoggedOutUser() {
  const loginBtn = document.querySelector(".login-btn")
  loginBtn.textContent = "Login"
  loginBtn.onclick = openLoginModal
}

function showUserMenu() {
  const menu = `
        <div class="user-menu">
            <p>Welcome, ${currentUser.name}!</p>
            <button onclick="viewProfile()">My Profile</button>
            <button onclick="viewBookings()">My Bookings</button>
            ${currentUser.role === "admin" ? '<button onclick="openAdminPanel()">Admin Panel</button>' : ""}
            <button onclick="logout()">Logout</button>
        </div>
    `

  showNotification("User menu functionality coming soon!", "info")
}

function viewProfile() {
  showNotification("Profile page coming soon!", "info")
}

function viewBookings() {
  const bookings = JSON.parse(localStorage.getItem("userBookings") || "[]")
  const userBookings = bookings.filter((booking) => booking.userId === currentUser.email)

  if (userBookings.length === 0) {
    showNotification("No bookings found", "info")
    return
  }

  showNotification(`You have ${userBookings.length} booking(s)`, "success")
}

function openAdminPanel() {
  if (currentUser && currentUser.role === "admin") {
    showNotification("Admin panel access granted", "success")
    // Here you would redirect to admin panel
  } else {
    showNotification("Access denied. Admin privileges required.", "error")
  }
}

// Animation and Effects
function addScrollEffects() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in")
      }
    })
  }, observerOptions)

  // Observe all cards and sections
  document.querySelectorAll(".destination-card, .package-card, .feature-card").forEach((el) => {
    observer.observe(el)
  })
}

function addAnimations() {
  // Add loading animation to buttons when clicked
  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", function () {
      if (!this.classList.contains("loading")) {
        const originalText = this.textContent
        this.classList.add("loading")
        this.innerHTML = '<span class="loading"></span> Loading...'

        setTimeout(() => {
          this.classList.remove("loading")
          this.textContent = originalText
        }, 1000)
      }
    })
  })
}

function initializeSearch() {
  // Add enter key support for search inputs
  document.querySelectorAll(".search-input").forEach((input) => {
    input.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        const form = this.closest(".search-form")
        const button = form.querySelector(".search-btn")
        button.click()
      }
    })
  })
}

function showResultsModal(content) {
  const modal = document.createElement("div")
  modal.className = "modal"
  modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
            ${content}
        </div>
    `

  document.body.appendChild(modal)
  modal.style.display = "block"

  // Add styles for search results
  const style = document.createElement("style")
  style.textContent = `
        .search-results {
            display: grid;
            gap: 1rem;
            margin-top: 1rem;
            max-height: 400px;
            overflow-y: auto;
        }
        
        .result-card {
            display: flex;
            gap: 1rem;
            padding: 1rem;
            border: 1px solid #eee;
            border-radius: 8px;
            transition: all 0.3s ease;
        }
        
        .result-card:hover {
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .result-image {
            width: 100px;
            height: 80px;
            border-radius: 8px;
            flex-shrink: 0;
        }
        
        .result-content {
            flex: 1;
        }
        
        .result-content h4 {
            margin-bottom: 0.5rem;
            color: #333;
        }
        
        .result-rating {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin: 0.5rem 0;
        }
        
        .result-price {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin: 0.5rem 0;
        }
        
        .amenities {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin: 0.5rem 0;
        }
        
        .amenity {
            background: #f0f0f0;
            padding: 0.2rem 0.5rem;
            border-radius: 12px;
            font-size: 0.8rem;
        }
    `

  document.head.appendChild(style)
}

function showDestinationModal(destination) {
  const modal = document.createElement("div")
  modal.className = "modal"
  modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.closest('.modal').remove()">&times;</span>
            <h2>${destination.name}</h2>
            <p>${destination.description}</p>
            <h4>Highlights:</h4>
            <ul>
                ${destination.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}
            </ul>
            <div class="destination-details">
                <p><strong>Duration:</strong> ${destination.duration}</p>
                <p><strong>Starting Price:</strong> ₹${destination.price}</p>
            </div>
            <button onclick="bookPackage('${destination.name.toLowerCase().replace(/\s+/g, "-")}')" class="book-btn">
                Book This Package
            </button>
        </div>
    `

  document.body.appendChild(modal)
  modal.style.display = "block"
}

// Initialize everything when page loads
window.addEventListener("load", () => {
  // Add welcome message
  setTimeout(() => {
    showNotification("Welcome to TravelHude! Explore amazing destinations.", "success")
  }, 1000)

  // Add some interactive effects
  document.querySelectorAll(".destination-card, .package-card").forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })
})

// Handle window resize
window.addEventListener("resize", () => {
  // Close mobile menu on resize
  if (window.innerWidth > 768) {
    document.getElementById("navMenu").classList.remove("mobile-active")
  }
})

// Handle clicks outside modals
window.addEventListener("click", (event) => {
  const modals = document.querySelectorAll(".modal")
  modals.forEach((modal) => {
    if (event.target === modal) {
      modal.style.display = "none"
    }
  })
})

// Prevent form submission on demo
document.addEventListener("submit", (e) => {
  e.preventDefault()
})

// Add CSS for mobile menu
const mobileMenuStyle = document.createElement("style")
mobileMenuStyle.textContent = `
    @media (max-width: 768px) {
        .nav-menu {
            position: fixed;
            top: 70px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 70px);
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            flex-direction: column;
            justify-content: flex-start;
            align-items: center;
            padding-top: 2rem;
            transition: left 0.3s ease;
            z-index: 999;
        }
        
        .nav-menu.mobile-active {
            left: 0;
        }
        
        .nav-link {
            display: block;
            width: 80%;
            text-align: center;
            padding: 1rem;
            margin: 0.5rem 0;
            border-radius: 8px;
        }
        
        .login-btn {
            margin-top: 2rem;
        }
    }
`

document.head.appendChild(mobileMenuStyle)

console.log("TravelHude website loaded successfully! 🚀")
