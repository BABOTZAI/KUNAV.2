import wibusoft from "wibusoft"
import fetch from "node-fetch"
const handler = async (m, {
  conn,
  text
}) => {
  if (!text) throw "Input Query"
  m.react(wait)
  try {
    const wallpaperURL = await fetchWallpaper(text);
    conn.sendFile(m.chat, wallpaperURL, "Wallpaper Default", "Ini adalah wallpaper default.", m);
  } catch (e) {
    m.react(eror);
  }
}
handler.help = ["wallpaper"]
handler.tags = ["tools"]
handler.command = /^wall(paper)?q?$/i
handler.limit = true
export default handler
async function fetchWallpaper(input) {
  const keywords = input.split(/[\W_]+/); // Memisahkan input dengan semua simbol sebagai pemisah
  const keyword = keywords[keywords.length - 1]
.toLowerCase(); // Mengambil kata kunci terakhir dan mengubahnya menjadi huruf kecil
  let url;
  if (keyword === "desktop") {
    url = "https://api.wer.plus/api/pcwal";
  } else {
    const json = await wibusoft.anime.animeWallpaper(input);
    const img = json[Math.floor(Math.random() * json.length)];
    return img;
  }
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch wallpaper.");
  }
  const data = await response.json();
  if (data.code === "200" && data.data && data.data.img_url) {
    return data.data.img_url;
  } else {
    throw new Error("Invalid response data.");
  }
}
