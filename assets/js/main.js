import DataManager from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  // Initialize all dynamic sections
  initProjects();
  initFriends();
  initContacts();
});

/**
 * Initialize the projects section with dynamic data
 */
async function initProjects() {
  const projectsContainer = document.getElementById("projects-grid");
  if (!projectsContainer) return;

  const projects = await DataManager.getProjects();

  if (projects.length === 0) {
    projectsContainer.innerHTML = "<p>No projects available at the moment.</p>";
    return;
  }

  projectsContainer.innerHTML = projects
    .map(
      (project) => `
    <div class="project-card">
      <div class="project-header">
        <div class="project-identity">
          <h3>${project.name}</h3>
          <div class="project-tag">
            <i class="${project.tagIcon}"></i> ${project.tagText}
          </div>
        </div>
      </div>
      <div class="project-body">
        <p>${project.description}</p>
      </div>
      <div class="project-actions">
        <a href="${project.repo}" target="_blank" rel="noopener noreferrer" class="project-button">
          <i class="fab fa-github"></i> Repository
        </a>
        <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="project-button">
          <i class="fas fa-external-link-alt"></i> View Project
        </a>
      </div>
    </div>
  `
    )
    .join("");
}

/**
 * Initialize the friends section with dynamic data
 */
async function initFriends() {
  const friendsContainer = document.getElementById("friends-grid");
  if (!friendsContainer) return;

  const friends = await DataManager.getFriends();

  if (friends.length === 0) {
    friendsContainer.innerHTML = "<p>No friends listed at the moment.</p>";
    return;
  }

  friendsContainer.innerHTML = friends
    .map(
      (friend) => `
    <div class="friend-card">
      <div class="friend-header">
        <div class="friend-avatar">
          <img src="${friend.avatar}" alt="${friend.name}" loading="lazy" />
        </div>
        <div class="friend-identity">
          <h3>${friend.name}</h3>
          ${friend.tags
            .map(
              (tag) => `
            <div class="friend-tag">
              <i class="${tag.icon} tag-icon"></i> ${tag.text}
            </div>
          `
            )
            .join("")}
        </div>
      </div>
      <div class="friend-actions">
        <a href="${
          friend.website
        }" target="_blank" rel="noopener noreferrer" class="friend-button">
          <i class="fas fa-globe"></i> Website
        </a>
        <a href="${
          friend.github
        }" target="_blank" rel="noopener noreferrer" class="friend-button">
          <i class="fab fa-github"></i> GitHub
        </a>
      </div>
    </div>
  `
    )
    .join("");
}

/**
 * Initialize the contacts section with dynamic data
 */
async function initContacts() {
  const contactsContainer = document.getElementById("contact-links");
  if (!contactsContainer) return;

  const contacts = await DataManager.getContacts();

  if (contacts.length === 0) {
    contactsContainer.innerHTML =
      "<p>No contact information available at the moment.</p>";
    return;
  }

  contactsContainer.innerHTML = contacts
    .map(
      (contact) => `
    <a href="${contact.url}" ${
        !contact.url.startsWith("mailto:")
          ? 'target="_blank" rel="noopener noreferrer"'
          : ""
      } class="contact-item">
      <div class="contact-icon">
        <i class="${contact.icon}"></i>
      </div>
      <div class="contact-info">
        <div class="contact-name">${contact.platform}</div>
        <div class="contact-username">${contact.username}</div>
      </div>
    </a>
  `
    )
    .join("");
}
