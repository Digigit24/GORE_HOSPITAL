
const footerHTML = `
  <div class="rts-footer-area footer-bg pt--105 pt_sm--50">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="footer-wrapper-style-between">
            <div class="single-wized">
              <a href="#" class="logo">
                <img id="footerlogo" width="200" style="border-radius: 20px" src="/assets/logo.jpeg"
                  alt="logo" class="logo">
              </a>
              <h6 class="title">Contact</h6>
              <div class="body">
                <p class="location" style="display: inline-flex;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
                    class="bi bi-geo-alt-fill" viewBox="0 0 16 16" style="margin-right: 8px;">
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                  </svg> <a href="https://maps.app.goo.gl/mQUofmKkM4vZiJsG9" target="_blank">Gore Multispeciality Hospital,
                    Ravet, Pimpri Chinchwad
                    PCMC </a>
                </p>
                <a href="mailto:goremultispecialityhospital01@gmail.com " style="display: inline-flex;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor"
                    class="bi bi-envelope-fill" viewBox="0 0 16 16" style="margin-right: 8px;">
                    <path
                      d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                  </svg> goremultispecialityhospital01@gmail.com </a>

              </div>
            </div>

            <div class="single-wized">
              <h6 class="title">Quick Links</h6>
              <div class="body">
                <ul class="nav-bottom">
                  <li><a href="/about-us.html">About Us</a></li>
                  <li><a href="/our-doctors.html">Specialist Doctors</a></li>
                  <li><a href="/appointment.html">Book Appointment</a></li>
                  <li><a href="/contact-us.html">Contact</a></li>
                </ul>
              </div>
            </div>

            <div class="single-wized">
              <h6 class="title">Our Services</h6>
              <div class="body">
                <ul class="nav-bottom">
                  <li><a href="/services/cardiology.html">Cardiology</a></li>
                  <li><a href="/services/gynaecology.html">Obstetrics &amp; Gynaecology</a></li>
                  <li><a href="/services/pediatric.html">Paediatrics</a></li>
                  <li><a href="/services/orthopaedics.html">Orthopaedics</a></li>
                </ul>
              </div>
            </div>

            <div class="single-wized">
              <h6 class="title">Working Time</h6>
              <div class="body">
                <p class="location">OPD (Mon “ Sat): 9:00 AM “ 9:00 PM</p>
                <p class="location">Sunday: 10:00 AM “ 2:00 PM</p>
                <p class="location">Emergency: 24x7</p>
                <a href="tel:+919689528414">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-telephone-fill" viewBox="0 0 16 16" style="margin-right: 8px;">
                    <path fill-rule="evenodd"
                      d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                  </svg>
                  +91 96895 28414 </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="copyright-area">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div class="col-lg-12">
            <div class="copyright-area-inner">
              <p>© 2025 Gore Multispeciality Hospital, Ravet PCMC. All Rights Reserved.</p>
              <p>
                <a href="/privacy-policy.html"
                  style="color: inherit; opacity: 0.7; font-size: 14px; margin-right: 10px;">Privacy Policy</a> |
                <a href="/term.html" style="color: inherit; opacity: 0.7; font-size: 14px;">Terms & Conditions</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
`;

document.addEventListener('DOMContentLoaded', function () {
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.innerHTML = footerHTML;
  }
});
