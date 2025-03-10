---
layout: default
title: Blog
permalink: /blog/
---

<section class="section">
  <div class="section-header">
    <h2 class="section-title">Blog Posts</h2>
  </div>
  <div class="section-body">
    <div class="blog-grid">
      {% for post in site.posts %}
      <div class="blog-card">
        <div class="blog-header">
          <h3 class="blog-title">{{ post.title }}</h3>
          <div class="blog-meta">
            <span class="blog-date"><i class="far fa-calendar-alt"></i> {{ post.date | date: "%B %d, %Y" }}</span>
          </div>
        </div>
        <div class="blog-tags">
          {% for tag in post.tags %}
          <span class="blog-tag">{{ tag }}</span>
          {% endfor %}
        </div>
        <div class="blog-summary">
          <p>{{ post.excerpt | strip_html | truncatewords: 30 }}</p>
        </div>
        <div class="blog-actions">
          <a href="{{ post.url }}" class="blog-button">
            <i class="fas fa-book-open"></i> Read More
          </a>
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
</section>