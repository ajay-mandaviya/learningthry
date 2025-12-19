const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const env = process.argv[2]; // stage | prod

if (!env) {
  console.error('❌ Please specify env: stage | prod');
  process.exit(1);
}

const sourceEnvPath = path.join(__dirname, `../env/${env}.env`);
const targetEnvPath = path.join(__dirname, '../.env');

if (!fs.existsSync(sourceEnvPath)) {
  console.error(`❌ Env file not found: ${sourceEnvPath}`);
  process.exit(1);
}

// 1️⃣ Copy env → .env (for developer visibility)
fs.copyFileSync(sourceEnvPath, targetEnvPath);
console.log(`✅ .env generated from ${env}.env`);

// // 2️⃣ Run React Native build using ENVFILE
// execSync(
//   `ENVFILE=env/${env}.env npx react-native run-android`,
//   { stdio: 'inherit' }
// );
