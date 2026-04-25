import crypto from "node:crypto"

const key = Buffer.from(process.env.KEY, 'hex')

const encryptfunc = (token) =>{
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    const encrypted = Buffer.concat([cipher.update(token), cipher.final()])
    return iv.toString('hex') + ':' + encrypted.toString('hex') // hash
}

const decryptfunc = (hash) =>{
     const [iv, encrypted] = hash.split(':')
    const decipher = crypto.createDecipheriv('aes-256-cbc', key,
        Buffer.from(iv, 'hex'))
    return Buffer.concat([
        decipher.update(Buffer.from(encrypted, 'hex')),
        decipher.final()
    ]).toString() // token
}

export {encryptfunc, decryptfunc}