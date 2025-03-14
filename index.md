---
layout: default
---

<!-- About Section -->
<section id="about" class="section">
  <div class="section-header">
    <h2 class="section-title">About</h2>
  </div>
  <div class="section-body">
    <div class="about-content">
      <img
        src="https://avatars.githubusercontent.com/u/81803340"
        alt="Jyotiraditya Panda"
        class="avatar"
        loading="lazy"
      />
      <div class="about-info">
        <h1>Jyotiraditya Panda</h1>
        <h2>AOSP and BSP Developer</h2>
        <p>
          Passionate about Android Open Source Project (AOSP) and Board
          Support Packages (BSP). I develop efficient solutions for
          mobile devices, specializing in custom ROMs and system
          optimization.
        </p>
        <p>
          My work focuses on optimizing performance, extending battery
          life, and enhancing the overall user experience on Android
          devices. I'm committed to open-source development and creating
          tools that make development processes more efficient.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- Projects Section -->
<section id="projects" class="section">
  <div class="section-header">
    <h2 class="section-title">Projects</h2>
  </div>
  <div class="section-body">
    <div class="projects-grid">
      {% for project in site.data.projects %}
        {% include project-card.html project=project %}
      {% endfor %}
    </div>
  </div>
</section>

<!-- Contact Section -->
<section id="contact" class="section">
  <div class="section-header">
    <h2 class="section-title">Contact</h2>
  </div>
  <div class="section-body">
    <div class="contact-links">
      {% for contact in site.data.contacts %}
        {% include contact-item.html contact=contact %}
      {% endfor %}
    </div>
  </div>
</section>
