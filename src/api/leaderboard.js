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
        "project-B": 78,
      },
    },
    {
      userId: "coder123",
      totalEdits: 94,
      projects: {
        "project-A": 34,
        "project-C": 60,
      },
    },
    {
      userId: "devgirl",
      totalEdits: 72,
      projects: {
        "project-B": 25,
        "project-C": 47,
      },
    },
    {
      userId: "marinedev",
      totalEdits: 65,
      projects: {
        "project-A": 30,
        "project-B": 35,
      },
    },
    {
      userId: "translator99",
      totalEdits: 43,
      projects: {
        "project-C": 28,
        "project-A": 15,
      },
    },
    {
      userId: "scriptkid",
      totalEdits: 38,
      projects: {
        "project-B": 20,
        "project-C": 18,
      },
    },
    {
      userId: "bughunter",
      totalEdits: 29,
      projects: {
        "project-A": 10,
        "project-B": 19,
      },
    },
    {
      userId: "openSourceFan",
      totalEdits: 22,
      projects: {
        "project-C": 22,
      },
    },
    {
      userId: "techwriter",
      totalEdits: 18,
      projects: {
        "project-A": 8,
        "project-C": 10,
      },
    },
    {
      userId: "designguru",
      totalEdits: 15,
      projects: {
        "project-B": 15,
      },
    },
    {
      userId: "newbieDev",
      totalEdits: 10,
      projects: {
        "project-A": 5,
        "project-B": 5,
      },
    },
    {
      userId: "veteranCoder",
      totalEdits: 7,
      projects: {
        "project-C": 7,
      },
    },
  ],
};

/**
 * Simulate API delay for realistic loading behavior
 */
const simulateDelay = (ms = 1000) =>
  new Promise((resolve) => setTimeout(resolve, ms));

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
  return leaderboardData.map((entry) => ({
    userId: entry.userId,
    totalEdits: entry.totalEdits,
    topProject: Object.keys(entry.projects).reduce((a, b) =>
      entry.projects[a] > entry.projects[b] ? a : b
    ),
    topProjectEdits: Math.max(...Object.values(entry.projects)),
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
  leaderboardData.forEach((entry) => {
    Object.keys(entry.projects).forEach((project) => {
      allProjects.add(project);
    });
  });

  return Array.from(allProjects).map((project) => ({
    project,
    totalEdits: leaderboardData.reduce((sum, entry) => {
      return sum + (entry.projects[project] || 0);
    }, 0),
    contributors: leaderboardData.filter((entry) => entry.projects[project])
      .length,
  }));
};

/**
 * Filter leaderboard data for display (top 5 + current user if not in top 5)
 * @param {Array} sortedData - Leaderboard data sorted by total edits
 * @param {Object} currentUser - Current logged-in user (can be null)
 * @returns {Array} Filtered data for display
 */
export const filterLeaderboardForDisplay = (sortedData, currentUser = null) => {
  if (!sortedData || sortedData.length === 0) return [];
  
  const TOP_COUNT = 5;
  const topFive = sortedData.slice(0, TOP_COUNT);
  
  // If no user is logged in or we have 5 or fewer entries, just return the top entries
  if (!currentUser || sortedData.length <= TOP_COUNT) {
    return topFive;
  }
  
  // Check if current user is in top 5
  const userInTopFive = topFive.some(entry => entry.userId === currentUser.login);
  
  if (userInTopFive) {
    // User is already in top 5, return top 5
    return topFive;
  }
  
  // Find current user in the full list
  const currentUserIndex = sortedData.findIndex(entry => entry.userId === currentUser.login);
  
  if (currentUserIndex === -1) {
    // Current user not found in leaderboard, return top 5
    return topFive;
  }
  
  // Return top 5 + separator + current user
  const currentUserData = sortedData[currentUserIndex];
  return [
    ...topFive,
    { 
      userId: '...', 
      totalEdits: 0, 
      projects: {}, 
      isSeparator: true,
      separatorText: `... ${currentUserIndex - TOP_COUNT} more contributors ...`
    },
    { 
      ...currentUserData, 
      isCurrentUser: true,
      userRank: currentUserIndex + 1
    }
  ];
};

/**
 * Filter chart data based on filtered leaderboard data
 * @param {Array} filteredLeaderboardData - Filtered leaderboard data
 * @returns {Array} Formatted chart data excluding separators
 */
export const formatChartDataFromFiltered = (filteredLeaderboardData) => {
  return filteredLeaderboardData
    .filter(entry => !entry.isSeparator) // Remove separator entries
    .map(entry => ({
      userId: entry.userId,
      totalEdits: entry.totalEdits,
      topProject: entry.projects && Object.keys(entry.projects).length > 0 
        ? Object.keys(entry.projects).reduce((a, b) => 
            entry.projects[a] > entry.projects[b] ? a : b
          )
        : 'N/A',
      topProjectEdits: entry.projects && Object.keys(entry.projects).length > 0 
        ? Math.max(...Object.values(entry.projects))
        : 0,
      isCurrentUser: entry.isCurrentUser || false
    }));
};
