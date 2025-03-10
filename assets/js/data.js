/**
 * Data handling module for jyotiraditya.dev
 * Fetches and processes JSON data for dynamic content
 */

class DataManager {
  /**
   * Fetch JSON data from the specified path
   *
   * @param {string} path - Path to the JSON file
   * @returns {Promise<Array>} The parsed JSON data
   */
  async fetchData(path) {
    try {
      const response = await fetch(path);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch data from ${path}:`, error);
      return [];
    }
  }

  /**
   * Load projects data
   *
   * @returns {Promise<Array>} Projects data
   */
  async getProjects() {
    return await this.fetchData("assets/data/projects.json");
  }

  /**
   * Load friends data
   *
   * @returns {Promise<Array>} Friends data
   */
  async getFriends() {
    return await this.fetchData("assets/data/friends.json");
  }

  /**
   * Load contacts data
   *
   * @returns {Promise<Array>} Contacts data
   */
  async getContacts() {
    return await this.fetchData("assets/data/contacts.json");
  }
}

// Export as a singleton
export default new DataManager();
