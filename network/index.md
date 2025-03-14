---
layout: default
title: Developer Network
---

<section class="section">
  <div class="section-header">
    <h2 class="section-title">Developer Network</h2>
  </div>
  <div class="section-body">
    <p class="network-intro">
      A network of talented developers and friends who inspire my work. 
      Check out their projects and contributions to the development community.
    </p>
    <div class="friends-grid">
      {% for friend in site.data.friends %}
        {% include friend-card.html friend=friend %}
      {% endfor %}
    </div>
  </div>
</section>
