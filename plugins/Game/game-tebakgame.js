import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  let imgr = flaaa.getRandom()
  conn.tebakgame = conn.tebakgame ? conn.tebakgame : {}
  let id = m.chat
  if (id in conn.tebakgame) {
    conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebakgame[id][0])
    throw false
  }
  let src = await (await fetch('https://raw.githubusercontent.com/qisyana/scrape/main/tebakgame.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
  let caption = `*${command.toUpperCase()}*
Logo apakah ini?

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hgame untuk bantuan
Bonus: ${poin} XP
    `.trim()
  conn.tebakgame[id] = [
    conn.sendFile(m.chat, json.img, '', caption, m),
    json, poin,
    setTimeout(() => {
      if (conn.tebakgame[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn
        .tebakgame[id][0])
      delete conn.tebakgame[id]
    }, timeout)
  ]
}
handler.help = ['tebakgame']
handler.tags = ['game']
handler.command = /^tebakgame/i
export default handler
const buttons = [
  ['Hint', '/hgame'],
  ['Nyerah', 'menyerah']
]
