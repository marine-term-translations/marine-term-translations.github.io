import axios from 'axios';

// Backend API base URL - adjust as needed
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

/**
 * Centralized API service for all backend calls
 */
class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get headers with authorization
  getHeaders(token) {
    return {
      'Authorization': token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };
  }

  // GitHub Authentication APIs
  async getOAuthLink() {
    const response = await axios.get(`${this.baseURL}/github/oauth/link`);
    return response.data;
  }

  async exchangeCodeForToken(code) {
    const response = await axios.post(`${this.baseURL}/github/token`, { code });
    return response.data;
  }

  async getUserInfo(token) {
    const response = await axios.get(`${this.baseURL}/github/user`, {
      headers: this.getHeaders(token)
    });
    return response.data;
  }

  // Organization Management APIs
  async getOrganizationMembers(token) {
    const response = await axios.get(`${this.baseURL}/github/org/members`, {
      headers: this.getHeaders(token)
    });
    return response.data;
  }

  async getOrganizationTeams(token) {
    const response = await axios.get(`${this.baseURL}/github/org/teams`, {
      headers: this.getHeaders(token)
    });
    return response.data;
  }

  async getTeamMembers(token, teamSlug) {
    const response = await axios.get(`${this.baseURL}/github/org/teams/${teamSlug}/members`, {
      headers: this.getHeaders(token)
    });
    return response.data;
  }

  async addUserToTeam(token, teamSlug, username) {
    const response = await axios.put(`${this.baseURL}/github/org/teams/${teamSlug}/members/${username}`, {}, {
      headers: this.getHeaders(token)
    });
    return response.data;
  }

  async removeUserFromTeam(token, teamSlug, username) {
    const response = await axios.delete(`${this.baseURL}/github/org/teams/${teamSlug}/members/${username}`, {
      headers: this.getHeaders(token)
    });
    return response.status === 204;
  }

  async inviteUserToOrganization(token, username) {
    const response = await axios.put(`${this.baseURL}/github/org/members/${username}`, {}, {
      headers: this.getHeaders(token)
    });
    return response.data;
  }

  async removeUserFromOrganization(token, username) {
    const response = await axios.delete(`${this.baseURL}/github/org/members/${username}`, {
      headers: this.getHeaders(token)
    });
    return response.status === 204;
  }

  // Repository APIs
  async getRepositoryBranches(token, repo) {
    const response = await axios.get(`${this.baseURL}/github/branches`, {
      headers: this.getHeaders(token),
      params: { repo }
    });
    return response.data;
  }

  async getRepositoryTree(token, repo, branch) {
    const response = await axios.get(`${this.baseURL}/github/tree`, {
      headers: this.getHeaders(token),
      params: { repo, branch }
    });
    return response.data;
  }

  async getFileContent(token, repo, path, branch) {
    const response = await axios.get(`${this.baseURL}/github/content`, {
      headers: this.getHeaders(token),
      params: { repo, path, branch }
    });
    return response.data;
  }

  async getReviewers(token, repo) {
    const response = await axios.get(`${this.baseURL}/github/reviewers`, {
      headers: this.getHeaders(token),
      params: { repo }
    });
    return response.data;
  }

  async getCommits(token, repo, branch, since) {
    const response = await axios.get(`${this.baseURL}/github/commits`, {
      headers: this.getHeaders(token),
      params: { repo, branch, since }
    });
    return response.data;
  }

  async getDetailedDiff(token, repo, branch) {
    const response = await axios.get(`${this.baseURL}/github/diff`, {
      headers: this.getHeaders(token),
      params: { repo, branch }
    });
    return response.data;
  }

  async checkConflicts(token, repo, branch) {
    const response = await axios.get(`${this.baseURL}/github/conflicts`, {
      headers: this.getHeaders(token),
      params: { repo, branch }
    });
    return response.data;
  }

  async updateFileWithTranslations(token, repo, translations, branch, filename) {
    const response = await axios.put(`${this.baseURL}/github/update`, {
      repo,
      translations,
      branch,
      filename
    }, {
      headers: this.getHeaders(token)
    });
    return response.data;
  }

  async mergeBranch(token, repo, branch) {
    const response = await axios.put(`${this.baseURL}/github/merge`, {
      repo,
      branch
    }, {
      headers: this.getHeaders(token)
    });
    return response.data;
  }

  async getPRComments(token, repo, prNumber) {
    const response = await axios.get(`${this.baseURL}/github/pr/comments`, {
      headers: this.getHeaders(token),
      params: { repo, prNumber }
    });
    return response.data;
  }

  async getChangedFiles(token, repo, branch) {
    const response = await axios.get(`${this.baseURL}/github/changed`, {
      headers: this.getHeaders(token),
      params: { repo, branch }
    });
    return response.data;
  }

  async checkFileApproval(token, repo, prNumber, filePath, branch) {
    const response = await axios.get(`${this.baseURL}/github/pr/${prNumber}/file/${encodeURIComponent(filePath)}/approved`, {
      headers: this.getHeaders(token),
      params: { repo, branch }
    });
    return response.data;
  }

  async approveFile(token, repo, prNumber, filePath, sha, lang, labelName) {
    const response = await axios.post(`${this.baseURL}/github/pr/${prNumber}/file/${encodeURIComponent(filePath)}/approve`, {
      repo,
      sha,
      lang,
      label_name: labelName
    }, {
      headers: this.getHeaders(token)
    });
    return response.data;
  }

  async createPRComment(token, repo, pullNumber, comment, sha, path, line, side) {
    const response = await axios.post(`${this.baseURL}/github/comment`, {
      token,
      pull_number: pullNumber,
      repo,
      comment,
      path,
      sha,
      line,
      side
    }, {
      headers: this.getHeaders(token)
    });
    return response.data;
  }
}

// Export a singleton instance
const apiService = new ApiService();
export default apiService;