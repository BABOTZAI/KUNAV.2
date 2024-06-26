const xpperlimit = 2
const handler = async (m, {
  conn,
  command,
  args
}) => {
  let user = db.data.users[m.sender]
  let count = command.replace(/^tomoney/i, '')
  count = count ? /all/i.test(count) ? Math.floor(db.data.users[m.sender].exp / xpperlimit) : parseInt(count) :
    args[0] ? parseInt(args[0]) : 1
  count = Math.max(1, count)
  if (db.data.users[m.sender].exp >= xpperlimit * count) {
    db.data.users[m.sender].exp -= xpperlimit * count
    db.data.users[m.sender].money += count
    conn.reply(m.chat, `Sukses menukarkan exp sebesar ${count} Exp ✨`, m)
  } else conn.reply(m.chat, `[❗] Exp anda tidak mencukupi untuk ditukar sebesar ${count} ✨`, m)
}
handler.help = ['tomoney <jumlah>']
handler.tags = ['xp']
handler.command = /^tomoney([0-9]+)|tomoney|tomoneyall$/i
export default handler
