// Smooth scrolling functionality
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}

// Mobile navigation toggle
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar")
  const scrolled = window.scrollY

  if (scrolled > 50) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 4px 30px rgba(139, 69, 19, 0.15)"
    navbar.style.backdropFilter = "blur(20px)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "0 2px 20px rgba(139, 69, 19, 0.1)"
    navbar.style.backdropFilter = "blur(15px)"
  }
})

// Active navigation link highlighting
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
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
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault()
    const targetId = link.getAttribute("href").substring(1)
    scrollToSection(targetId)
  })
})

// Animation on scroll (simple fade-in effect)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Add stagger delay for multiple elements
      setTimeout(() => {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }, index * 100)
    }
  })
}, observerOptions)

// Apply animation to menu items and review cards
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".menu-item, .review-card, .info-item, .gallery-item")

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
    observer.observe(el)
  })
})

// Order button click tracking (for analytics - placeholder)
document.querySelectorAll(".order-btn").forEach((button) => {
  button.addEventListener("click", (e) => {
    const dishName = e.target.closest(".menu-item").querySelector("h3").textContent
    const platform = e.target.classList.contains("swiggy") ? "Swiggy" : "Zomato"

    // Add click animation
    button.style.transform = "scale(0.95)"
    setTimeout(() => {
      button.style.transform = ""
    }, 150)

    // Placeholder for analytics tracking
    console.log(`Order clicked: ${dishName} on ${platform}`)

    // You can add actual analytics tracking here
    // Example: gtag('event', 'order_click', { dish: dishName, platform: platform });
  })
})

const heroBackgrounds = [
  "/placeholder.svg?height=1080&width=1920",
  "/placeholder.svg?height=1080&width=1920",
  "/placeholder.svg?height=1080&width=1920",
  "/placeholder.svg?height=1080&width=1920",
  "/placeholder.svg?height=1080&width=1920",
]

let currentBackgroundIndex = 0

function createHeroBackgrounds() {
  const hero = document.querySelector(".hero")

  // Remove existing background style
  hero.style.background = "none"

  // Create background elements
  heroBackgrounds.forEach((bg, index) => {
    const bgElement = document.createElement("div")
    bgElement.className = "hero-background"
    bgElement.style.backgroundImage = `url('${bg}')`

    if (index === 0) {
      bgElement.classList.add("active")
    }

    hero.insertBefore(bgElement, hero.firstChild)
  })
}

function rotateHeroBackground() {
  const backgrounds = document.querySelectorAll(".hero-background")

  // Remove active class from current background
  backgrounds[currentBackgroundIndex].classList.remove("active")

  // Move to next background
  currentBackgroundIndex = (currentBackgroundIndex + 1) % heroBackgrounds.length

  // Add active class to new background
  backgrounds[currentBackgroundIndex].classList.add("active")
}

function createGalleryLightbox() {
  // Create lightbox overlay
  const lightbox = document.createElement("div")
  lightbox.className = "lightbox-overlay"
  lightbox.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(10px);
  `

  // Create lightbox content
  const lightboxContent = document.createElement("div")
  lightboxContent.className = "lightbox-content"
  lightboxContent.style.cssText = `
    max-width: 90%;
    max-height: 90%;
    position: relative;
    animation: lightboxFadeIn 0.3s ease;
  `

  // Create lightbox image
  const lightboxImg = document.createElement("img")
  lightboxImg.style.cssText = `
    width: 100%;
    height: auto;
    border-radius: 15px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  `

  // Create close button
  const closeBtn = document.createElement("button")
  closeBtn.innerHTML = "×"
  closeBtn.style.cssText = `
    position: absolute;
    top: -15px;
    right: -15px;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background: #d4af37;
    color: white;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
  `

  // Add CSS animation
  const style = document.createElement("style")
  style.textContent = `
    @keyframes lightboxFadeIn {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
  `
  document.head.appendChild(style)

  // Assemble lightbox
  lightboxContent.appendChild(lightboxImg)
  lightboxContent.appendChild(closeBtn)
  lightbox.appendChild(lightboxContent)
  document.body.appendChild(lightbox)

  // Close lightbox functionality
  const closeLightbox = () => {
    lightbox.style.display = "none"
    document.body.style.overflow = "auto"
  }

  closeBtn.addEventListener("click", closeLightbox)
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox()
  })

  // ESC key to close
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.style.display === "flex") {
      closeLightbox()
    }
  })

  // Add click handlers to gallery items
  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img")
      const overlay = item.querySelector(".gallery-overlay")

      lightboxImg.src = img.src
      lightboxImg.alt = img.alt
      lightbox.style.display = "flex"
      document.body.style.overflow = "hidden"

      // Add ripple effect
      const ripple = document.createElement("div")
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(212, 175, 55, 0.3);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
      `

      const rect = item.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      ripple.style.width = ripple.style.height = size + "px"
      ripple.style.left = rect.width / 2 - size / 2 + "px"
      ripple.style.top = rect.height / 2 - size / 2 + "px"

      item.style.position = "relative"
      item.appendChild(ripple)

      setTimeout(() => ripple.remove(), 600)
    })
  })

  // Add ripple animation CSS
  const rippleStyle = document.createElement("style")
  rippleStyle.textContent = `
    @keyframes ripple {
      to { transform: scale(4); opacity: 0; }
    }
  `
  document.head.appendChild(rippleStyle)
}

function initLazyLoading() {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src || img.src
        img.classList.remove("loading")
        img.classList.add("loaded")
        observer.unobserve(img)
      }
    })
  })

  document.querySelectorAll("img").forEach((img) => {
    imageObserver.observe(img)
    img.classList.add("loading")
  })
}

function enhanceReviewCards() {
  document.querySelectorAll(".review-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
      const photo = card.querySelector(".reviewer-photo img")
      if (photo) {
        photo.style.transform = "scale(1.1) rotate(5deg)"
        photo.style.filter = "brightness(1.1) saturate(1.2)"
      }

      const stars = card.querySelectorAll(".stars i")
      stars.forEach((star, index) => {
        setTimeout(() => {
          star.style.transform = "scale(1.2) rotate(360deg)"
          star.style.color = "#f4d03f"
        }, index * 100)
      })
    })

    card.addEventListener("mouseleave", () => {
      const photo = card.querySelector(".reviewer-photo img")
      if (photo) {
        photo.style.transform = "scale(1) rotate(0deg)"
        photo.style.filter = "brightness(1) saturate(1)"
      }

      const stars = card.querySelectorAll(".stars i")
      stars.forEach((star) => {
        star.style.transform = "scale(1) rotate(0deg)"
        star.style.color = "#d4af37"
      })
    })
  })
}

function enhanceMenuItems() {
  document.querySelectorAll(".menu-item").forEach((item) => {
    const img = item.querySelector(".menu-image img")
    const priceBadge = item.querySelector(".price-badge")

    item.addEventListener("mouseenter", () => {
      if (priceBadge) {
        priceBadge.style.transform = "scale(1.1) rotate(-5deg)"
        priceBadge.style.boxShadow = "0 8px 25px rgba(212, 175, 55, 0.6)"
      }
    })

    item.addEventListener("mouseleave", () => {
      if (priceBadge) {
        priceBadge.style.transform = "scale(1) rotate(0deg)"
        priceBadge.style.boxShadow = "0 4px 15px rgba(212, 175, 55, 0.4)"
      }
    })
  })
}

// Initialize hero backgrounds and start rotation
document.addEventListener("DOMContentLoaded", () => {
  createHeroBackgrounds()
  createGalleryLightbox()
  initLazyLoading()
  enhanceReviewCards()
  enhanceMenuItems()

  // Rotate background every 5 seconds
  setInterval(rotateHeroBackground, 5000)

  const images = document.querySelectorAll("img")

  images.forEach((img) => {
    img.addEventListener("load", () => {
      img.classList.remove("loading")
      img.classList.add("loaded")

      // Add a subtle fade-in effect
      img.style.opacity = "0"
      img.style.transition = "opacity 0.5s ease"
      setTimeout(() => {
        img.style.opacity = "1"
      }, 50)
    })

    if (!img.complete) {
      img.classList.add("loading")
    }
  })

  const progressBar = document.createElement("div")
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: linear-gradient(90deg, #d4af37, #8b4513);
    z-index: 9999;
    transition: width 0.1s ease;
  `
  document.body.appendChild(progressBar)

  window.addEventListener("scroll", () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    progressBar.style.width = scrolled + "%"
  })
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroBackgrounds = document.querySelectorAll(".hero-background")

  heroBackgrounds.forEach((bg) => {
    const speed = 0.5
    bg.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Smooth reveal animation for sections
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed")
      }
    })
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  },
)

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    revealObserver.observe(section)
  })
})

function addSocialSharing() {
  const shareButtons = document.querySelectorAll(".social-icons a")

  shareButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()

      const platform = button.querySelector("i").classList[1].split("-")[1]
      const url = encodeURIComponent(window.location.href)
      const text = encodeURIComponent("Check out Brewski Cafe - Where Coffee Meets Community!")

      let shareUrl = ""

      switch (platform) {
        case "facebook":
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
          break
        case "twitter":
          shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`
          break
        case "instagram":
          // Instagram doesn't support direct URL sharing, so we'll copy to clipboard
          navigator.clipboard.writeText(window.location.href)
          showNotification("Link copied to clipboard! Share it on Instagram.")
          return
        default:
          return
      }

      if (shareUrl) {
        window.open(shareUrl, "_blank", "width=600,height=400")
      }
    })
  })
}

function showNotification(message) {
  const notification = document.createElement("div")
  notification.textContent = message
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #d4af37;
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
    z-index: 10000;
    animation: slideInRight 0.3s ease;
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => notification.remove(), 300)
  }, 3000)
}

// Add notification animations
const notificationStyle = document.createElement("style")
notificationStyle.textContent = `
  @keyframes slideInRight {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOutRight {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`
document.head.appendChild(notificationStyle)

// Initialize social sharing
document.addEventListener("DOMContentLoaded", () => {
  addSocialSharing()
})
