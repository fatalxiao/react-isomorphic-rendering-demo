/**
 * @file zip.js
 */

const fs = require('fs');

// Vendors
const archiver = require('archiver');
const crypto = require('crypto');
const logger = require('fancy-node-logger');

const zipPath = './unify-platform-user.zip';

const output = fs.createWriteStream(zipPath);
output.on('close', () => {
    const rs = fs.createReadStream(zipPath);
    const hash = crypto.createHash('sha256');
    rs.on('data', hash.update.bind(hash));
    rs.on('end', () => logger.done(
        `Zip complete\n       SHA-256 Hash: ${hash.digest('hex')}`
    ));
});

const archive = archiver('zip', {zlib: {level: 9}});
archive.pipe(output);
archive.directory('./dist', false);
archive.finalize();
