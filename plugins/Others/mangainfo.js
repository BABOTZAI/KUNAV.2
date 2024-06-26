import fetch from 'node-fetch'
const handler = async (m, {
  conn,
  text
}) => {
  if (!text) throw `Masukkan query!`
  let res = await fetch(API('https://api.jikan.moe', '/v4/manga', {
    q: text
  }))
  if (!res.ok) throw await res.text()
  let json = await res.json()
  let {
    title,
    synopsis,
    chapters,
    url,
    volumes,
    score,
    image_url
  } = json.data[0]
  let mangaingfo = `*Title:* ${title}
*Chapters:* ${chapters}
*Volumes:* ${volumes}
*Score:* ${score}
*Synopsis:* ${synopsis}
*Link*: ${url}`
  conn.sendFile(m.chat, image_url, '', mangaingfo, m)
}
handler.help = ['manga <judul>']
handler.tags = ['animsearch']
handler.command = /^(manga)$/i
//udah di maapin kan?
export default handler
