import { Router } from 'express';
import TorrentSearchApi from 'torrent-search-api';
import { getTorrentDetails } from '../services/torrentService.js';

const router = Router();

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

// Initialize providers when the server starts
initializeProviders();

// Search endpoint
router.get('/', async (req, res) => {
  const query = req.query.q;
  const category = req.query.type || 'all';
  const limit = parseInt(req.query.limit) || 30;

  if (!query) {
    return res.status(400).json({ 
      success: false,
      error: "Missing required query parameter 'q'" 
    });
  }

  try {
    const torrents = await TorrentSearchApi.search(query, category, limit);
    const results = await Promise.all(torrents.map(getTorrentDetails));
    
    return res.status(200).json({
      success: true,
      count: results.length,
      results
    });
  } catch (error) {
    console.error("Search error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to search torrents",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;
