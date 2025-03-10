import DataManager from "./data.js";

/**
 * Initialize the blog listing page with post previews
 */
export async function initBlogList() {
  const blogsContainer = document.getElementById("blog-grid");
  if (!blogsContainer) return;

  const posts = await DataManager.getBlogPosts();

  if (posts.length === 0) {
    blogsContainer.innerHTML = "<p>No blog posts available at the moment.</p>";
    return;
  }

  blogsContainer.innerHTML = posts
    .map(
      (post) => `
    <div class="blog-card">
      <div class="blog-header">
        <h3 class="blog-title">${post.title}</h3>
        <div class="blog-meta">
          <span class="blog-date"><i class="far fa-calendar-alt"></i> ${formatDate(
            post.date
          )}</span>
        </div>
      </div>
      <div class="blog-tags">
        ${post.tags
          .map((tag) => `<span class="blog-tag">${tag}</span>`)
          .join("")}
      </div>
      <div class="blog-summary">
        <p>${post.summary}</p>
      </div>
      <div class="blog-actions">
        <a href="/blog/post.html?id=${post.id}" class="blog-button">
          <i class="fas fa-book-open"></i> Read More
        </a>
      </div>
    </div>
  `
    )
    .join("");
}

/**
 * Initialize a single blog post page
 */
export async function initBlogPost() {
  const postContainer = document.getElementById("blog-post-content");
  if (!postContainer) return;

  // Get the post ID from the URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (!postId) {
    postContainer.innerHTML =
      "<p>Post ID not specified. Please go back to the blog listing.</p>";
    return;
  }

  // Load all blog posts
  const posts = await DataManager.getBlogPosts();

  // Find the requested post
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    postContainer.innerHTML =
      "<p>Blog post not found. It may have been removed or the URL is incorrect.</p>";
    return;
  }

  // Update page title
  document.title = `${post.title} | Jyotiraditya Panda`;

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", post.summary);
  }

  // Render the post
  const postHeader = document.getElementById("blog-post-title");
  if (postHeader) {
    postHeader.textContent = post.title;
  }

  // Update post metadata
  const postMeta = document.getElementById("blog-post-meta");
  if (postMeta) {
    postMeta.innerHTML = `
      <div class="post-date"><i class="far fa-calendar-alt"></i> ${formatDate(
        post.date
      )}</div>
      <div class="post-tags">
        ${post.tags
          .map((tag) => `<span class="post-tag">${tag}</span>`)
          .join("")}
      </div>
    `;
  }

  // Update post content
  postContainer.innerHTML = post.content;

  // Add syntax highlighting to any code blocks
  highlightCodeBlocks();
}

/**
 * Format a date string in a readable format
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {string} Formatted date
 */
function formatDate(dateString) {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

/**
 * Apply syntax highlighting to code blocks
 * This assumes you have a syntax highlighting library included
 */
function highlightCodeBlocks() {
  // If you're using a library like Prism.js or highlight.js
  if (typeof Prism !== "undefined") {
    Prism.highlightAll();
  }
}
