import fg from 'api-dylux';
import { youtubedl, youtubedlv2 } from '@bochilteam/scraper';
import yts from 'yt-search';

export const searchYouTube = async (query) => {
  const res = await yts(query);
  return res.videos[0]; // Retorna el primer resultado
};

export const downloadYouTubeAudio = async (url, quality = '128kbps') => {
  try {
    return await fg.yta(url, quality);
  } catch {
    return await fg.ytmp3(url, quality); // Fallback
  }
};

export const downloadYouTubeVideo = async (url, quality = '360p') => {
  try {
    return await fg.ytv(url, quality);
  } catch {
    return await fg.ytmp4(url, quality); // Fallback
  }
};
