import fetch from "node-fetch"
import {
  createHash
} from "crypto"
const handler = async (m, {
  conn,
  args,
  usedPrefix,
  command
}) => {
  let text
  if (args.length >= 1) {
    text = args.slice(0).join(" ")
  } else if (m.quoted && m.quoted?.text) {
    text = m.quoted?.text
  } else throw "Input Teks"
  try {
    m.react(wait)
    let res = await ChatGpt(text)
    m.reply(res)
  } catch (e) {
    m.react(eror)
  }
}
handler.help = ["ibengai"]
handler.tags = ["internet"]
handler.command = /^ibengai$/i
export default handler
/* New Line */
const API = "https://api.ibeng.tech/api/info/openai?text=";
const KEY = "&apikey=tamvan";
async function ChatGpt(input) {
  const response = await fetch(API + input + KEY);
  const data = await response.json();
  return data.data.data;
}
