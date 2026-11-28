import { isIP } from 'node:net'

// The hosted gateway must overwrite CF-Connecting-IP. Incoming forwarding
// chains aren't suitable for a quota. Reject unavailable gateway metadata.
export function gatewayAddress(headers: Headers): string | null {
  const value = headers.get('cf-connecting-ip')
  if (!value || value.includes('%')) return null
  const family = isIP(value)
  if (family === 4) return value
  return family === 6 ? new URL('http://[' + value + ']').hostname : null
}

export function requestIdentity(headers: Headers, publicKeys: ReadonlySet<string>) {
  const auth = headers.get('authorization')
  if (auth === null) return publicKeys.has(headers.get('apikey') ?? '')
    ? { kind: 'guest' } as const : { kind: 'invalid' } as const
  const token = /^Bearer ([^\s]+)$/i.exec(auth)?.[1]
  if (!token) return { kind: 'invalid' } as const
  if (publicKeys.has(token)) return { kind: 'guest' } as const
  return { kind: 'verify', token } as const
}
