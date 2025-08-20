// Auto-horizontal scroll for testimonial scroller
// Auto-scroll functionality removed as per user request

document.addEventListener("DOMContentLoaded", function () {
  const scroller = document.querySelector('.testimonial-scroller');
  const cards = document.querySelectorAll('.testimonial-card');
  const dotsContainer = document.querySelector('.testimonial-dots');
  let currentIdx = 0;

  function goToTestimonial(idx, smooth = true) {
    if (!scroller || !cards.length) return;
    currentIdx = idx;
    cards[idx].scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', inline: 'center', block: 'nearest' });
    updateDots();
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIdx);
    });
  }

  if (scroller && cards.length > 0 && dotsContainer) {
    // Create dots
    dotsContainer.innerHTML = '';
    cards.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.className = 'testimonial-dot' + (idx === 0 ? ' active' : '');
      dot.onclick = () => {
        goToTestimonial(idx);
      };
      dotsContainer.appendChild(dot);
    });

    // Update dots on manual scroll (for swipe)
    let scrollTimeout;
    scroller.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        let idx = 0;
        let minDiff = Infinity;
        cards.forEach((card, i) => {
          const diff = Math.abs(card.getBoundingClientRect().left - scroller.getBoundingClientRect().left);
          if (diff < minDiff) {
            minDiff = diff;
            idx = i;
          }
        });
        currentIdx = idx;
        updateDots();
      }, 100);
    });
  }

  // Simple Form Handling for Formspree
  const forms = document.querySelectorAll('form[action*="formspree.io"]');
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
      }
      
      // Let the form submit naturally to Formspree
      // Formspree will handle the email sending
      
      // Reset button after a delay (in case of success)
      setTimeout(() => {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = 'Send Message';
        }
      }, 3000);
    });
  });

  // Show notification function
  function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'danger'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
      top: 20px;
      right: 20px;
      z-index: 9999;
      min-width: 300px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    notification.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 5000);
  }
});
