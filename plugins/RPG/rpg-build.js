//Harga Build
let rumahsakit = 500
let benteng = 700
let camptroops = 900
let pertanian = 700
let pertambangan = 600
const handler = async (m, {
  conn,
  command,
  args,
  usedPrefix,
  DevMode
}) => {
  let type = (args[0] || '').toLowerCase()
  let upgrade = (args[0] || '').toLowerCase()
  let user = db.data.users[m.sender]
  const list = `
╭──『 Facility 』
│⬡ typing command↓
│   ${usedPrefix + command} benteng
│
│⬡ 🏯 *Benteng*
│⬡ 🌾 *Pertanian*
│⬡ 🏕️ *Camptroop*
│⬡ ⚒️ *Pertambangan*
│⬡ 🏥 *Rumah Sakit*
╰───────────────
`.trim();
  //
  try {
    if (/build|bangun/i.test(command)) {
      const count = args[1] && args[1].length > 0 ? Math.min(99999999, Math.max(parseInt(args[1]), 1)) : !args[1] ||
        args.length < 3 ? 1 : Math.min(1, count)
      switch (type) {
        case 'benteng':
        case 'fortress':
          if (db.data.users[m.sender].batu > benteng * count) {
            db.data.users[m.sender].batu >= benteng * count
            db.data.users[m.sender].fortress += count * 1
            db.data.users[m.sender].kayu -= benteng * count
            db.data.users[m.sender].batu -= benteng * count
            m.reply(`berhasil membangun benteng`)
          } else m.reply(
            `Sda Kamu tidak cukup untuk membangun benteng yg senilai ${benteng * count }Kayu ${benteng * count}batu`
            )
          break
        case 'pertanian':
          if (user.batu > pertanian * count) {
            user.batu >= pertanian * count
            user.pertanian += count * 1
            user.kayu -= pertanian * count
            user.batu -= pertanian * count
          } else m.reply(
            `Sda Kamu tidak cukup untuk membangun pertanian yg senilai ${pertanian * count }Kayu ${pertanian * count}batu`
            )
          break
        case 'camptroops':
        case 'camptroop':
          if (user.batu > camptroops * count) {
            user.batu >= camptroops * count
            user.camptroops += count * 1
            user.kayu -= camptroops * count
            user.batu -= camptroops * count
          } else m.reply(
            `Sda Kamu tidak cukup untuk membangun kamp pasukan yg senilai ${camptroops * count }Kayu ${camptroops * count}batu`
            )
          break
        case 'pertambangan':
          if (user.tambang > pertambangan * count) {
            user.batu >= pertambangan * count
            user.tambang += count * 1
            user.kayu -= pertambangan * count
            user.batu -= pertambangan * count
          } else m.reply(
            `Sda Kamu tidak cukup untuk membangun pertanian yg senilai ${pertambangan * count }Kayu ${pertambangan * count}batu`
            )
          break
        case 'rumahsakit':
        case 'hospital':
          if (user.rumahsakit > rumahsakit * count) {
            user.rumahsakit += count * 1
            user.kayu -= rumahsakit * count
            user.batu -= rumahsakit * count
          } else m.reply(
            `Sda Kamu tidak cukup untuk membangun pertanian yg senilai ${rumahsakit * count }Kayu ${rumahsakit * count}batu`
            )
          break
        default:
          return conn.reply(m.chat, list, m)
      }
    }
  } catch (e) {
    conn.reply(m.chat, 'Error', m)
    console.log(e)
    if (DevMode) {
      for (let jid of owner.map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').filter(v => v != conn.user
        .jid)) {
        conn.reply(jid, 'shop.js error\nNo: *' + m.sender.split('@')[0] + '*\nCommand: *' + m.text + '*\n\n*' + e +
          '*', m)
      }
    }
  }
}
handler.help = ['build <args>', 'upgrade <sell|buy> <args>']
handler.tags = ['rpg']
handler.owner = false
handler.command = /^(build|bangun|upgrade|upgd)$/i
export default handler
