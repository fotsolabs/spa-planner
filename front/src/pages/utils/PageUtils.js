import ServiceApi from "../../api/ServiceApi";

class PageUtils {
  constructor() {
    if (PageUtils.instance) return PageUtils.instance;
    
    // Use a regular property instead of private field
    this._services = null;
    PageUtils.instance = this;
  }

  async getServices() {
    if (!this._services) {
      try {
        const response = await ServiceApi.getAllServices();
        this._services = response.services || response;
      } catch (error) {
        console.error("Error fetching services:", error);
        this._services = [];
      }
    }
    return this._services;
  }

  async refreshServices() {
    try {
      const response = await ServiceApi.getAllServices();
      this._services = response.services || response;
    } catch (error) {
      console.error("Error refreshing services:", error);
      this._services = [];
    }
    return this._services;
  }
}

// Export a singleton instance
const instance = new PageUtils();
export default instance;