const handler = async (m, {
  participants
}) => {
  // if (participants.map(v=>v.jid).includes(conn.user.jid)) {
  db.data.chats[m.chat].isBanned = true
  m.reply('Done!')
  // } else m.reply('Ada nomor host disini...')
}
handler.help = ['banchat']
handler.tags = ['owner']
handler.command = /^banchat$/i
handler.owner = true
export default handler
