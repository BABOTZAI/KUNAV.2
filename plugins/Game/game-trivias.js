import fetch from 'node-fetch'
let timeout = 120000
let poin = 4999
const handler = async (m, {
  conn,
  args,
  command,
  usedPrefix
}) => {
  let imgr = flaaa.getRandom()
  conn.trivias = conn.trivias ? conn.trivias : {}
  let id = m.chat
  if (id in conn.trivias) {
    conn.reply(m.chat, 'Masih ada soal belum terjawab di chat ini', conn.trivias[id][0])
    throw false
  }
  let res = ["easy", "medium", "hard"]
  let Reg = /(medium|easy|hard)/i
  let spas = "                "
  let listSections = []
  Object.keys(res).map((v, index) => {
    listSections.push(["[ " + res[v].toUpperCase() + " ]", [
      [spas + " Select...", usedPrefix + command + " " + res[v], ""]
    ]])
  })
  if (!args[0]) return conn.sendList(m.chat, htki + " 📺 L E V E L 🔎 " + htka,
    `⚡ Silakan pilih difficulty di tombol di bawah...`, author, "☂️ P I L I H ☂️", listSections, m)
  if (!args[0]?.match(Reg)) return m.reply("Tersedia:\n" + res.map(v => v).join('\n'))
  let src = await (await fetch('https://cooler-api.ay-gemuy.repl.co/game/trivia?amount=1&difficulty=' + args[0] +
    '&type=multiple')).json()
  let json = src.questions[0]
  let jawaban = await Tr(json.correctAnswer)
  let soal = await Tr(json.value)
  let caption = `*${command.toUpperCase()}*
${soal}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}htri untuk bantuan
Bonus: ${poin} XP
    `.trim()
  conn.trivias[id] = [
    conn.sendFile(m.chat, imgr + command, '', caption, m),
    json, poin,
    setTimeout(() => {
      if (conn.trivias[id]) conn.reply(m.chat, `Waktu habis!\nJawabannya adalah *${jawaban}*`, conn.trivias[id][
        0
      ])
      delete conn.trivias[id]
    }, timeout)
  ]
}
handler.help = ['trivia']
handler.tags = ['game']
handler.command = /^trivia/i
export default handler
const buttons = [
  ['Hint', '/htri'],
  ['Nyerah', 'menyerah']
]
async function Tr(teks) {
  let reis = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=id&dt=t&q=' +
    teks)
  let res = await reis.json()
  return res[0][0][0]
}
