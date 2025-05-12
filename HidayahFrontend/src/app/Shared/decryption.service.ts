import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DecryptionService {
  public privateKey!: CryptoKey;

  constructor() {
    // You need to import or load your private key first
    this.importPrivateKey();
  }
  async importPrivateKey(): Promise<void> {
    const privateKeyPem = `-----BEGIN RSA PRIVATE KEY-----
      MIICXgIBAAKBgQDQZ0YVolLtPXXSowc6CopEXzGI/Tvri6hYT3KZ45G97DQn8ocydBQXSZfRR92MpiZHQn1zydpVBOCj7tUnSh1QoSN9aISG+tuLggYWdav6XlW2JAlduHkMbbyug9aoWIyaZjXXzyV+0e3hjwQhfTeQj9DLuGssWNX3YuYgf/e5LQIDAQAB
      -----END RSA PRIVATE KEY-----`;

    // Decode the private key and import it
    const pem = privateKeyPem.replace('-----BEGIN RSA PRIVATE KEY-----', '').replace('-----END RSA PRIVATE KEY-----', '');
    const binaryDer = this.pemToDer(pem);
    this.privateKey = await window.crypto.subtle.importKey(
      'pkcs8',
      binaryDer,
      {
        name: 'RSA-OAEP',
        hash: 'SHA-256',
      },
      false,
      ['decrypt']
    );
  }

  async decryptWithPrivateKey(encryptedBase64: string): Promise<string> {
    const encryptedBytes = this.base64ToArrayBuffer(encryptedBase64);
    const decryptedBytes = await window.crypto.subtle.decrypt(
      { name: 'RSA-OAEP' },
      this.privateKey,
      encryptedBytes
    );
    return new TextDecoder().decode(decryptedBytes);
  }

   base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  private pemToDer(pem: string): ArrayBuffer {
    const binaryPem = window.atob(pem);
    const binaryLength = binaryPem.length;
    const bytes = new Uint8Array(binaryLength);
    for (let i = 0; i < binaryLength; i++) {
      bytes[i] = binaryPem.charCodeAt(i);
    }
    return bytes.buffer;
  }
}
