# CriptoV2
A recent project of symmetric cryptography, it uses basic methods for encription and it's not recommended for real work.

## Usage

## Direct cryptography >
node criptov2 <encrypt/decrypt> "<any character that matches config.ini characters list>" <numbers only password>

### Encryption example:
node criptov2 encrypt "Hello!" 2958
Returns> "!?Ajt|"

### Decryption example:
node criptov2 decrypt "!?Ajt|" 2958
Returns> "Hello!"


## File cryptography >

node criptov2 <encrypt/decrypt> "file<<>FILEPATH" <numbers only password>

### Encryption example:
node criptov2 encrypt "file<<>C:/Users/PC/Desktop/file.txt" 2958923123591
Returns> "Sucessfully encrypted file! Saved to PATH: file<<>C:/Users/PC/Desktop/file.txt"

# (Important Note): The way that files and plain text are encrypted is different from each other, so if you encrypt plain text and try to decrypt it using file decryption it won't work.
