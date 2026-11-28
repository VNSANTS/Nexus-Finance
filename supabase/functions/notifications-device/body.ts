const MAX_BYTES = 4096

export async function lerCadastro(req: Request): Promise<string | null> {
  if (!req.body || Number(req.headers.get('content-length')) > MAX_BYTES) return null
  const reader = req.body.getReader()
  const bytes = new Uint8Array(MAX_BYTES)
  let total = 0
  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) return new TextDecoder().decode(bytes.subarray(0, total))
      if (value.byteLength > MAX_BYTES - total) {
        await reader.cancel()
        return null
      }
      bytes.set(value, total)
      total += value.byteLength
    }
  } finally {
    reader.releaseLock()
  }
}
