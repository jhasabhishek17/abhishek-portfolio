const axios = require('axios')

// GET /api/leetcode/:username
exports.getStats = async (req, res) => {
  const { username } = req.params

  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        submitStats: submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
        profile {
          ranking
          reputation
        }
      }
    }
  `

  try {
    const { data } = await axios.post(
      'https://leetcode.com/graphql',
      { query, variables: { username } },
      {
        headers: {
          'Content-Type': 'application/json',
          Referer: 'https://leetcode.com',
        },
        timeout: 8000,
      }
    )

    const user = data?.data?.matchedUser
    if (!user) return res.status(404).json({ error: 'LeetCode user not found' })

    const acStats = user.submitStats?.acSubmissionNum || []
    const getCount = (diff) => acStats.find(s => s.difficulty === diff)?.count || 0

    res.json({
      username,
      ranking: user.profile?.ranking,
      totalSolved: getCount('All'),
      easySolved: getCount('Easy'),
      mediumSolved: getCount('Medium'),
      hardSolved: getCount('Hard'),
    })
  } catch (err) {
    console.error('LeetCode error:', err.message)
    res.status(502).json({ error: 'Failed to fetch LeetCode stats' })
  }
}
