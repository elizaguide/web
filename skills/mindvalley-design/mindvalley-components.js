/**
 * Mindvalley Component Library
 * Pre-built, responsive HTML components for rapid page development
 * Usage: MV.hero({title: "Your Title", subtitle: "Your subtitle"})
 */

window.MV = {
  
  /**
   * Hero Section Component
   * @param {Object} options - {title, subtitle, cta, ctaLink, background}
   */
  hero: function(options = {}) {
    const {
      title = "Transform Your Life",
      subtitle = "Join millions discovering their extraordinary potential",
      cta = "Get Started",
      ctaLink = "#",
      background = "gradient-purple" // gradient-purple, gradient-dark, image
    } = options;
    
    const bgClass = background === "gradient-dark" ? "mv-bg-gradient-dark" : "mv-hero-quick";
    
    return `
      <section class="${bgClass}">
        <div class="mv-container">
          <h1 class="title-bold-1 mv-mb-4">${title}</h1>
          <p class="body-lg mv-mb-8 mv-max-w-2xl mv-mx-auto">${subtitle}</p>
          <a href="${ctaLink}" class="mv-btn mv-btn-primary">${cta}</a>
        </div>
      </section>
    `;
  },

  /**
   * Features Grid Component
   * @param {Object} options - {title, features: [{title, description, icon}]}
   */
  features: function(options = {}) {
    const {
      title = "Why Choose Us",
      features = [
        {title: "Feature 1", description: "Amazing benefit", icon: "🚀"},
        {title: "Feature 2", description: "Incredible value", icon: "⚡"},
        {title: "Feature 3", description: "Life changing", icon: "🎯"}
      ]
    } = options;
    
    const featureItems = features.map(feature => `
      <div class="mv-card mv-text-center">
        <div class="mv-text-3xl mv-mb-4">${feature.icon}</div>
        <h3 class="title-bold-6 mv-text-purple mv-mb-4">${feature.title}</h3>
        <p class="body mv-text-gray">${feature.description}</p>
      </div>
    `).join('');
    
    return `
      <section class="mv-section-lg">
        <div class="mv-container">
          <h2 class="title-bold-3 mv-text-center mv-mb-12">${title}</h2>
          <div class="mv-features">
            ${featureItems}
          </div>
        </div>
      </section>
    `;
  },

  /**
   * Testimonial Component
   * @param {Object} options - {quote, author, role, image}
   */
  testimonial: function(options = {}) {
    const {
      quote = "This completely transformed how I approach life. Incredible results!",
      author = "Sarah Johnson",
      role = "Mindvalley Student",
      image = null
    } = options;
    
    const authorImage = image ? 
      `<img src="${image}" alt="${author}" class="mv-w-16 mv-h-16 mv-rounded-full mv-mx-auto mv-mb-4">` : 
      '';
    
    return `
      <section class="mv-section mv-bg-gray-lighter">
        <div class="mv-container">
          <div class="mv-testimonial mv-max-w-2xl mv-mx-auto">
            ${authorImage}
            <p class="body-lg mv-mb-6">"${quote}"</p>
            <div class="mv-font-semibold mv-text-purple">${author}</div>
            <div class="body-sm mv-text-gray">${role}</div>
          </div>
        </div>
      </section>
    `;
  },

  /**
   * CTA Section Component
   * @param {Object} options - {title, subtitle, cta, ctaLink, background}
   */
  cta: function(options = {}) {
    const {
      title = "Ready to Transform?",
      subtitle = "Join thousands who've already started their journey",
      cta = "Start Now",
      ctaLink = "#",
      background = "gradient-dark" // gradient-dark, gradient-purple, purple
    } = options;
    
    const bgClass = background === "gradient-purple" ? "mv-bg-gradient-purple" : "mv-cta-section";
    const btnClass = background === "gradient-purple" ? "mv-btn mv-btn-secondary" : "mv-btn mv-btn-secondary";
    
    return `
      <section class="${bgClass}">
        <div class="mv-container">
          <h2 class="title-bold-2 mv-mb-4">${title}</h2>
          <p class="body-lg mv-mb-8 mv-max-w-xl mv-mx-auto">${subtitle}</p>
          <a href="${ctaLink}" class="${btnClass}">${cta}</a>
        </div>
      </section>
    `;
  },

  /**
   * Benefits List Component
   * @param {Object} options - {title, benefits: ["Benefit 1", "Benefit 2"]}
   */
  benefits: function(options = {}) {
    const {
      title = "What You'll Get",
      benefits = [
        "Instant access to transformational content",
        "Expert-guided learning paths", 
        "Global community support",
        "30-day money-back guarantee"
      ]
    } = options;
    
    const benefitItems = benefits.map(benefit => 
      `<div class="mv-flex mv-items-center mv-mb-4">
        <div class="mv-text-success mv-text-xl mv-mr-4">✓</div>
        <span class="body">${benefit}</span>
      </div>`
    ).join('');
    
    return `
      <section class="mv-section">
        <div class="mv-container">
          <div class="mv-mobile-stack mv-items-start">
            <div class="mv-flex-1">
              <h2 class="title-bold-3 mv-mb-8">${title}</h2>
              <div class="mv-max-w-lg">
                ${benefitItems}
              </div>
            </div>
            <div class="mv-flex-1 mv-text-center">
              <div class="mv-bg-gradient-purple mv-text-white mv-p-8 mv-rounded-xl">
                <h3 class="title-bold-5 mv-mb-4">Special Offer</h3>
                <div class="mv-text-3xl mv-font-bold mv-mb-2">$97</div>
                <div class="mv-text-sm mv-mb-6">Limited Time</div>
                <a href="#" class="mv-btn mv-btn-secondary">Get Access</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  /**
   * FAQ Component
   * @param {Object} options - {title, faqs: [{question, answer}]}
   */
  faq: function(options = {}) {
    const {
      title = "Frequently Asked Questions",
      faqs = [
        {
          question: "How does this program work?",
          answer: "Our comprehensive system guides you through proven methodologies step by step."
        },
        {
          question: "Is there a money-back guarantee?",
          answer: "Yes! We offer a full 30-day money-back guarantee if you're not satisfied."
        },
        {
          question: "How long do I have access?",
          answer: "You get lifetime access to all materials and future updates."
        }
      ]
    } = options;
    
    const faqItems = faqs.map((faq, index) => `
      <div class="mv-card mv-mb-4">
        <button class="mv-w-full mv-text-left mv-flex mv-justify-between mv-items-center" onclick="toggleFAQ(${index})">
          <h3 class="title-bold-6 mv-text-purple">${faq.question}</h3>
          <span class="mv-text-purple mv-text-xl" id="faq-icon-${index}">+</span>
        </button>
        <div class="mv-mt-4 mv-hidden" id="faq-answer-${index}">
          <p class="body mv-text-gray">${faq.answer}</p>
        </div>
      </div>
    `).join('');
    
    return `
      <section class="mv-section">
        <div class="mv-container">
          <h2 class="title-bold-3 mv-text-center mv-mb-12">${title}</h2>
          <div class="mv-max-w-2xl mv-mx-auto">
            ${faqItems}
          </div>
        </div>
      </section>
      
      <script>
        function toggleFAQ(index) {
          const answer = document.getElementById('faq-answer-' + index);
          const icon = document.getElementById('faq-icon-' + index);
          
          if (answer.classList.contains('mv-hidden')) {
            answer.classList.remove('mv-hidden');
            icon.textContent = '−';
          } else {
            answer.classList.add('mv-hidden');
            icon.textContent = '+';
          }
        }
      </script>
    `;
  },

  /**
   * Stats/Numbers Component
   * @param {Object} options - {title, stats: [{number, label}]}
   */
  stats: function(options = {}) {
    const {
      title = "Trusted by Millions",
      stats = [
        {number: "2M+", label: "Students Worldwide"},
        {number: "95%", label: "Success Rate"},
        {number: "50+", label: "Expert Teachers"},
        {number: "10+", label: "Years Experience"}
      ]
    } = options;
    
    const statItems = stats.map(stat => `
      <div class="mv-text-center">
        <div class="mv-text-3xl md:mv-text-4xl mv-font-bold mv-text-purple mv-mb-2">${stat.number}</div>
        <div class="body-sm mv-text-gray">${stat.label}</div>
      </div>
    `).join('');
    
    return `
      <section class="mv-section mv-bg-white">
        <div class="mv-container">
          <h2 class="title-bold-3 mv-text-center mv-mb-12">${title}</h2>
          <div class="mv-grid-2 md:mv-grid-4 mv-gap-8">
            ${statItems}
          </div>
        </div>
      </section>
    `;
  },

  /**
   * Video/Media Section Component
   * @param {Object} options - {title, subtitle, videoUrl, thumbnail, cta}
   */
  media: function(options = {}) {
    const {
      title = "Watch the Transformation",
      subtitle = "See real results from real people",
      videoUrl = "#",
      thumbnail = "https://via.placeholder.com/600x400/7a12d4/ffffff?text=Play+Video",
      cta = "Watch Now"
    } = options;
    
    return `
      <section class="mv-section mv-bg-gray-lighter">
        <div class="mv-container">
          <div class="mv-mobile-stack mv-items-center">
            <div class="mv-flex-1">
              <h2 class="title-bold-3 mv-mb-4">${title}</h2>
              <p class="body-lg mv-mb-8 mv-text-gray">${subtitle}</p>
              <a href="${videoUrl}" class="mv-btn mv-btn-primary">${cta}</a>
            </div>
            <div class="mv-flex-1">
              <div class="mv-relative mv-rounded-xl mv-overflow-hidden mv-shadow-lg">
                <img src="${thumbnail}" alt="Video thumbnail" class="mv-w-full">
                <div class="mv-absolute mv-inset-0 mv-flex mv-items-center mv-justify-center">
                  <div class="mv-bg-white mv-rounded-full mv-p-4 mv-shadow-lg">
                    <div class="mv-w-0 mv-h-0" style="border-left: 20px solid #7a12d4; border-top: 12px solid transparent; border-bottom: 12px solid transparent; margin-left: 4px;"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  /**
   * Complete Landing Page Generator
   * @param {Object} config - Full page configuration
   */
  landingPage: function(config = {}) {
    const {
      hero = {},
      features = {},
      testimonial = {},
      benefits = {},
      cta = {},
      faq = {}
    } = config;
    
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${hero.title || "Transform Your Life"}</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>">
        <link rel="stylesheet" href="mindvalley-core.css">
        <link rel="stylesheet" href="mindvalley-utilities.css">
      </head>
      <body>
        ${this.hero(hero)}
        ${this.features(features)}
        ${this.testimonial(testimonial)}
        ${this.benefits(benefits)}
        ${this.cta(cta)}
        ${this.faq(faq)}
      </body>
      </html>
    `;
  }
};

// Auto-inject components if data attributes are found
document.addEventListener('DOMContentLoaded', function() {
  // Auto-generate components from data attributes
  const components = document.querySelectorAll('[data-mv-component]');
  
  components.forEach(element => {
    const componentType = element.getAttribute('data-mv-component');
    const config = element.getAttribute('data-mv-config');
    
    if (MV[componentType]) {
      try {
        const options = config ? JSON.parse(config) : {};
        element.innerHTML = MV[componentType](options);
      } catch (e) {
        console.error('Error generating component:', componentType, e);
      }
    }
  });
});