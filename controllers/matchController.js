const LostItem = require("../models/LostItem");
const FoundItem = require("../models/FoundItem");

// SIMPLE TEXT MATCH FUNCTION
const textMatch = (a, b) => {
  if (!a || !b) return 0;
  return a.toLowerCase() === b.toLowerCase() ? 1 : 0;
};

// DATE DIFFERENCE MATCH
const dateMatch = (d1, d2) => {
  const diff = Math.abs(new Date(d1) - new Date(d2));
  const days = diff / (1000 * 60 * 60 * 24);

  if (days <= 1) return 1;
  if (days <= 3) return 0.5;
  return 0;
};

// LOCATION MATCH (basic)
const locationMatch = (a, b) => {
  if (!a || !b) return 0;
  return a.toLowerCase().includes(b.toLowerCase()) ||
    b.toLowerCase().includes(a.toLowerCase())
    ? 1
    : 0;
};

exports.getMatches = async (req, res) => {
  try {
    // Get all lost items for the authenticated user
    const userId = req.user.id;
    const lostItems = await LostItem.find({ userId });

    if (!lostItems || lostItems.length === 0) {
      return res.json([]);
    }

    const foundItems = await FoundItem.find();
    const allMatches = [];

    // For each lost item, calculate matches
    lostItems.forEach((lostItem) => {
      const results = foundItems.map((item) => {
        let score = 0;

        // NAME → 30%
        score += textMatch(lostItem.itemName, item.itemName) * 30;

        // COLOR → 20%
        score += textMatch(lostItem.color, item.color) * 20;

        // LOCATION → 20%
        score += locationMatch(lostItem.locationLost, item.locationFound) * 20;

        // DATE → 10%
        score += dateMatch(lostItem.dateLost, item.dateFound) * 10;

        // DESCRIPTION → 20%
        score += textMatch(lostItem.description, item.description) * 20;

        return {
          lostItem: lostItem,
          foundItem: item,
          matchScore: score,
        };
      });

      allMatches.push(...results);
    });

    // SORT DESCENDING BY SCORE
    allMatches.sort((a, b) => b.matchScore - a.matchScore);

    res.json(allMatches);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
