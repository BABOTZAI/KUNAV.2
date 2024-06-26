import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
const handler = async (m, {
  conn,
  command,
  usedPrefix
}) => {
  let imgr = flaaa.getRandom()
  conn.tebaktebakan = conn.tebaktebakan ? conn.tebaktebakan : {}
  let id = m.chat
  if (id in conn.tebaktebakan) {
    conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.tebaktebakan[id][0])
    throw false
  }
  let src = await (await fetch(
    'https://raw.githubusercontent.com/BochilTeam/database/master/games/tebaktebakan.json')).json()
  let json = src[Math.floor(Math.random() * src.length)]
  let caption = `*${command.toUpperCase()}*
  ${json.soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}hteb untuk bantuan
Bonus: ${poin} XP
    `.trim()
  conn.tebaktebakan[id] = [
    conn.sendFile(m.chat, imgr + command, '', caption, m),
    json, poin,
    setTimeout(() => {
      if (conn.tebaktebakan[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${json.jawaban}*`, conn
        .tebaktebakan[id][0])
      delete conn.tebaktebakan[id]
    }, timeout)
  ]
}
handler.help = ['tebaktebakan']
handler.tags = ['game']
handler.command = /^tebaktebakan/i
export default handler
const buttons = [
  ['Hint', '/hteb'],
  ['Nyerah', 'menyerah']
]
