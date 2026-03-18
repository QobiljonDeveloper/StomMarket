const fs = require('fs');
const { execSync } = require('child_process');

try {
    execSync('npm run build', { stdio: 'pipe' });
    fs.writeFileSync('build-err.txt', 'Success');
} catch (e) {
    fs.writeFileSync('build-err.txt', e.stdout.toString() + '\\n' + e.stderr.toString());
}
