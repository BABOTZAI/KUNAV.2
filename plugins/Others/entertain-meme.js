import fetch from 'node-fetch'
const handler = async (m, {
  conn,
  usedPrefix,
  command
}) => {
  try {
    let anu = await fetch('https://candaan-api.vercel.app/api/image')
    let json = await anu.json()
    let fimg = await fetch(json.data[Math.floor(Math.random() * json.data.length)].url)
    let fimgb = Buffer.from(await fimg.arrayBuffer())
    if (Buffer.byteLength(fimgb) < 22000) throw new e()
    conn.sendFile(m.chat, fimgb, "", '[ RANDOM - ' + command.toUpperCase() + ' ]', m)
  } catch (e) {
    try {
      let anu = await fetch('https://candaan-api.vercel.app/api/image/random')
      let json = await anu.json()
      let fimg = await fetch(json.data.url)
      let fimgb = Buffer.from(await fimg.arrayBuffer())
      if (Buffer.byteLength(fimgb) < 22000) throw new e()
      conn.sendFile(m.chat, fimgb, "", '[ RANDOM - ' + command.toUpperCase() + ' ]', m)
    } catch (e) {
      try {
        let fimg = await fetch('https://api.lolhuman.xyz/api/meme/memeindo?apikey=' + lolkey)
        let fimgb = Buffer.from(await fimg.arrayBuffer())
        if (Buffer.byteLength(fimgb) < 22000) throw new e()
        conn.sendFile(m.chat, fimgb, "", '[ RANDOM - ' + command.toUpperCase() + ' ]', m)
      } catch (e) {
        m.reply(`Terjadi kesalahan, coba lagi nanti.`)
      }
    }
  }
}
handler.help = ['meme']
handler.tags = ['entertainment']
handler.command = /^((random)?meme)$/i
handler.premium = false
handler.limit = true
export default handler
