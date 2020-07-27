export default data => `
// npm install @microlink/cli --global
// microlink-api ${data.url}&audio&video&iframe\n
${JSON.stringify(data, null, 2)}
`
