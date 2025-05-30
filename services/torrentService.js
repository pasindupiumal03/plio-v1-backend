export async function getTorrentDetails(torrent) {
  const title = torrent.title;
  const size = torrent.size;
  const source = torrent.provider;
  const desc = torrent.desc;

  return { title, size, source, desc };
}
