const messages = [`hello`, `bro`]

export const greet = (name: string) => {
  const greeting = Array.from(messages)
  if (name) greeting[1] = name
  const date = new Date()
  return { timestamp: date, message: greeting[date.getSeconds() % 2] }
}
