import { Injectable } from '@angular/core'
import * as CryptoJS from 'crypto-js'

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor() {}

  private readonly iterations = 1000 // subir esto a 10000+ en producción
  private readonly keySize = 256 / 32

  encrypt(data: string, passphrase: string): string {
    const salt = CryptoJS.lib.WordArray.random(128 / 8)
    const key = CryptoJS.PBKDF2(passphrase, salt, {
      keySize: this.keySize,
      iterations: this.iterations,
    })

    const iv = CryptoJS.lib.WordArray.random(128 / 8)

    const encrypted = CryptoJS.AES.encrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })

    // Serializar salt, iv y ciphertext en Base64
    const result = {
      salt: salt.toString(CryptoJS.enc.Hex),
      iv: iv.toString(CryptoJS.enc.Hex),
      ciphertext: encrypted.ciphertext.toString(CryptoJS.enc.Base64),
    }

    return JSON.stringify(result)
  }

  // 🔓 Desencriptar texto
  decrypt(encryptedJson: string, passphrase: string): string {
    const decoded = JSON.parse(encryptedJson)

    const salt = CryptoJS.enc.Hex.parse(decoded.salt)
    const iv = CryptoJS.enc.Hex.parse(decoded.iv)
    const ciphertext = CryptoJS.enc.Base64.parse(decoded.ciphertext)

    const key = CryptoJS.PBKDF2(passphrase, salt, {
      keySize: this.keySize,
      iterations: this.iterations,
    })

    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: ciphertext,
    })
    const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    })

    return decrypted.toString(CryptoJS.enc.Utf8)
  }
}
