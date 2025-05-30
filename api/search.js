const TorrentSearchApi = require("torrent-search-api");
const { getTorrentDetails } = require("../services/torrentService");

const providersToEnable = [
  "1337x",
  "ThePirateBay",
  "YTS",
  "EZTV",
  "LimeTorrents",
  "Torrentz2",
  "KickassTorrents",
  "TorrentProject",
];

let initialized = false;
function initializeProviders() {
  if (!initialized) {
    for (const provider of providersToEnable) {
      try {
        TorrentSearchApi.enableProvider(provider);
      } catch (error) {
        console.warn(`Failed to enable provider ${provider}: ${error.message}`);
      }
    }
    initialized = true;
  }
}

module.exports = async (req, res) => {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const query = req.query.q;
  const category = req.query.type;
  const limit = 30;

  if (!query) {
    return res.status(400).json({ error: "Missing query parameter 'q'" });
  }

  try {
    initializeProviders();
    const torrents = await TorrentSearchApi.search(query, category, limit);
    const results = await Promise.all(torrents.map(getTorrentDetails));
    return res.status(200).json({ results });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({ error: "Failed to search torrents." });
  }
};
