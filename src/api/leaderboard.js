// API layer for leaderboard data
// This will be replaced with actual API calls when the backend is ready

// Mock data for demonstration
const mockLeaderboardData = {
  leaderboard: [
    {
      userId: "octocat",
      totalEdits: 128,
      projects: {
        "project-A": 50,
        "project-B": 78
      }
    },
    {
      userId: "coder123",
      totalEdits: 94,
      projects: {
        "project-A": 34,
        "project-C": 60
      }
    },
    {
      userId: "devgirl",
      totalEdits: 72,
      projects: {
        "project-B": 25,
        "project-C": 47
      }
    },
    {
      userId: "marinedev",
      totalEdits: 65,
      projects: {
        "project-A": 30,
        "project-B": 35
      }
    },
    {
      userId: "translator99",
      totalEdits: 43,
      projects: {
        "project-C": 28,
        "project-A": 15
      }
    }
  ]
};

/**
 * Simulate API delay for realistic loading behavior
 */
const simulateDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetch leaderboard data
 * @returns {Promise<Array>} Array of leaderboard entries
 */
export const fetchLeaderboard = async () => {
  // Simulate API call delay
  await simulateDelay(1500);
  
  // TODO: Replace with actual API call when backend is ready
  // const response = await axios.get(`${API_BASE}/leaderboard`);
  // return response.data;
  
  return mockLeaderboardData.leaderboard;
};

/**
 * Get chart data formatted for visualization
 * @param {Array} leaderboardData - Raw leaderboard data
 * @returns {Array} Formatted data for charts
 */
export const formatChartData = (leaderboardData) => {
  return leaderboardData.map(entry => ({
    userId: entry.userId,
    totalEdits: entry.totalEdits,
    topProject: Object.keys(entry.projects).reduce((a, b) => 
      entry.projects[a] > entry.projects[b] ? a : b
    ),
    topProjectEdits: Math.max(...Object.values(entry.projects))
  }));
};

/**
 * Get project breakdown data for detailed charts
 * @param {Array} leaderboardData - Raw leaderboard data
 * @returns {Array} Project breakdown data
 */
export const getProjectBreakdown = (leaderboardData) => {
  const allProjects = new Set();
  
  // Collect all unique projects
  leaderboardData.forEach(entry => {
    Object.keys(entry.projects).forEach(project => {
      allProjects.add(project);
    });
  });
  
  return Array.from(allProjects).map(project => ({
    project,
    totalEdits: leaderboardData.reduce((sum, entry) => {
      return sum + (entry.projects[project] || 0);
    }, 0),
    contributors: leaderboardData.filter(entry => entry.projects[project]).length
  }));
};