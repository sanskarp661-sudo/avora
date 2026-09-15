(function () {
  'use strict';

  // Mobile menu
  var menuToggle = document.getElementById('menuToggle');
  var mobileDrawer = document.getElementById('mobileDrawer');
  menuToggle.addEventListener('click', function () {
    var open = mobileDrawer.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mobileDrawer.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileDrawer.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  // Services accordion — single group open at a time
  var accordion = document.getElementById('servicesAccordion');
  accordion.querySelectorAll('.accordion-trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var item = trigger.closest('.accordion-item');
      var panel = item.querySelector('.accordion-panel');
      var icon = trigger.querySelector('.g-toggle-icon');
      var isOpen = panel.classList.contains('is-open');

      accordion.querySelectorAll('.accordion-panel.is-open').forEach(function (p) {
        p.classList.remove('is-open');
        var t = p.previousElementSibling;
        var i = t.querySelector('.g-toggle-icon');
        i.classList.remove('ph-minus');
        i.classList.add('ph-plus');
      });

      if (!isOpen) {
        panel.classList.add('is-open');
        icon.classList.remove('ph-plus');
        icon.classList.add('ph-minus');
      }
    });
  });

  // Work filter
  var workFilters = document.getElementById('workFilters');
  var projectGrid = document.getElementById('projectGrid');
  workFilters.addEventListener('click', function (e) {
    var btn = e.target.closest('.chip');
    if (!btn) return;
    workFilters.querySelectorAll('.chip').forEach(function (c) { c.classList.remove('is-active'); });
    btn.classList.add('is-active');
    var filter = btn.getAttribute('data-filter');
    projectGrid.querySelectorAll('.project-card').forEach(function (card) {
      var show = filter === 'All' || card.getAttribute('data-cat') === filter;
      card.style.display = show ? '' : 'none';
    });
  });

  // Testimonial carousel
  var quotes = [
    { text: '“They handled everything from planning to execution. We didn’t have to worry about a thing.”', attrib: 'Anisha Verma | Wedding | Udaipur' },
    { text: '“Five rooms, three days, 1,400 people. The run of show never slipped once.”', attrib: 'Karan Mehta, Meridian Group | Annual Summit | Goa' },
    { text: '“The launch looked like a set, not an event. Our press coverage doubled our target.”', attrib: 'Priya Nair, Kite | Product Launch | Mumbai' }
  ];
  var quoteIndex = 0;
  var quoteText = document.getElementById('quoteText');
  var quoteAttrib = document.getElementById('quoteAttrib');
  var quoteCounter = document.getElementById('quoteCounter');

  function renderQuote() {
    var q = quotes[quoteIndex];
    quoteText.textContent = q.text;
    quoteAttrib.textContent = q.attrib;
    quoteCounter.textContent = (quoteIndex + 1) + ' / ' + quotes.length;
  }
  document.getElementById('quotePrev').addEventListener('click', function () {
    quoteIndex = (quoteIndex + quotes.length - 1) % quotes.length;
    renderQuote();
  });
  document.getElementById('quoteNext').addEventListener('click', function () {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    renderQuote();
  });

  // Enquiry modal
  var modal = document.getElementById('enquiryModal');
  var modalForm = document.getElementById('modalForm');
  var modalThanks = document.getElementById('modalThanks');

  function openEnquiry() {
    modal.classList.add('is-open');
    modalForm.style.display = 'block';
    modalThanks.classList.remove('is-open');
    mobileDrawer.classList.remove('is-open');
  }
  function closeEnquiry() {
    modal.classList.remove('is-open');
  }
  document.querySelectorAll('.js-open-enquiry').forEach(function (btn) {
    btn.addEventListener('click', openEnquiry);
  });
  document.querySelectorAll('.js-close-enquiry').forEach(function (btn) {
    btn.addEventListener('click', closeEnquiry);
  });
  document.getElementById('enquiryForm').addEventListener('submit', function (e) {
    e.preventDefault();
    modalForm.style.display = 'none';
    modalThanks.classList.add('is-open');
  });

  // Service chip multi-select (visual only)
  document.getElementById('serviceChips').addEventListener('click', function (e) {
    var btn = e.target.closest('.chip');
    if (!btn) return;
    btn.classList.toggle('is-active');
  });

  renderQuote();
})();
