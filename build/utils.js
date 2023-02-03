/**
 * @file utils.js
 */

const fs = require('fs');
const path = require('path');
const ChildProcess = require('child_process');

// Statics
const config = require('./config.js');

// Vendors
const crypto = require('crypto');

function resolveRootPath(p) {
    return path.join(__dirname, '..', p);
}

function getAssetsPath(p, env = 'production') {
    return path.posix.join(config.assetsDirectory, p);
}

function getAssetsSubPath(p) {
    return path.posix.join(config.assetsSubDirectory, p);
}

function getAssetsVendorsAbsolutePath(p, env = 'production') {
    return path.posix.join(config.assetsRoot, getAssetsSubPath(`vendors/${p}`));
}

function fsExistsSync(path) {
    try {
        fs.accessSync(path, (fs.constants && fs.constants.F_OK) || fs.F_OK);
    } catch (e) {
        return false;
    }
    return true;
}

function copyRecursionSync(src, dist, excludes) {

    const paths = fs.readdirSync(src);

    for (let path of paths) {

        if (excludes && excludes.findIndex(item => path.includes(item)) > -1) {
            continue;
        }

        const srcPath = src + '/' + path,
            distPath = dist + '/' + path,

            stat = fs.statSync(srcPath);

        if (stat.isDirectory()) {

            if (!fsExistsSync(distPath)) {
                fs.mkdirSync(distPath);
            }

            copyRecursionSync(srcPath, distPath, excludes);

        } else {
            fs.copyFileSync(srcPath, distPath);
        }

    }

}

function rmRecursionSync(p) {

    const paths = fs.readdirSync(p);

    for (let path of paths) {

        const rmPath = p + '/' + path,
            stat = fs.statSync(rmPath);

        if (stat.isDirectory()) {
            rmRecursionSync(rmPath);
            if (fsExistsSync(rmPath)) {
                fs.rmdirSync(rmPath);
            }
        } else {
            if (fsExistsSync(rmPath)) {
                fs.unlinkSync(rmPath);
            }
        }

    }

    if (fsExistsSync(p)) {
        fs.rmdirSync(p);
    }

}

function calculateSHA256(filePath, callback) {
    const rs = fs.createReadStream(filePath),
        hash = crypto.createHash('sha256');
    rs.on('data', hash.update.bind(hash));
    rs.on('end', function () {
        console.log('SHA-256 Hash: ', hash.digest('hex'), '\n');
        callback && callback();
    });
}

function installDependencies(path) {
    return new Promise((resolve, reject) => {
        const childProcess = ChildProcess.exec('npm i --legacy-peer-deps', {
            cwd: path
        }, error => {
            error && reject(error);
        }).on('close', () => {
            resolve();
        });
        childProcess.stdout.pipe(process.stdout);
        childProcess.stderr.pipe(process.stderr);
    });
}

function makeTapeAchive(path, name) {
    return new Promise((resolve, reject) => {
        ChildProcess.exec(`tar -czf ${name}.tar.gz ${path}`, {
            cwd: path
        }, error => {
            error && reject(error);
        }).on('close', () => {
            resolve();
        });
    });
}

exports.resolveRootPath = resolveRootPath;
exports.getAssetsPath = getAssetsPath;
exports.getAssetsSubPath = getAssetsSubPath;
exports.getAssetsVendorsAbsolutePath = getAssetsVendorsAbsolutePath;
exports.fsExistsSync = fsExistsSync;
exports.copyRecursionSync = copyRecursionSync;
exports.rmRecursionSync = rmRecursionSync;
exports.calculateSHA256 = calculateSHA256;
exports.installDependencies = installDependencies;
exports.makeTapeAchive = makeTapeAchive;
