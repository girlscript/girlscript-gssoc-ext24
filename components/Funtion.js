function customDecrypt(encryptedText) {
    let decryptedText = '';
    for (let i = 0; i < encryptedText.length; i++) {
        let char = encryptedText[i];
        
        if (char >= 'a' && char <= 'z') {
            decryptedText += String.fromCharCode('z'.charCodeAt(0) - (char.charCodeAt(0) - 'a'.charCodeAt(0))).toUpperCase();
        } else if (char >= 'A' && char <= 'Z') {
            decryptedText += String.fromCharCode('Z'.charCodeAt(0) - (char.charCodeAt(0) - 'A'.charCodeAt(0))).toLowerCase();
        } else {
            decryptedText += char;
        }
    }
    return decryptedText;
}

export {customDecrypt}
