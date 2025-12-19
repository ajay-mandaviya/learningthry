const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const env = process.argv[2]; // stage | prod

if (!env) {
  console.error('❌ Usage: yarn stage-release | yarn prod-release');
  process.exit(1);
}

const envFile = path.resolve(__dirname, `../env/${env}.env`);
const targetEnv = path.resolve(__dirname, '../.env');

if (!fs.existsSync(envFile)) {
  console.error(`❌ Env file not found: ${envFile}`);
  process.exit(1);
}

// 1️⃣ Generate .env for visibility
fs.writeFileSync(
  targetEnv,
  `# AUTO-GENERATED FILE - DO NOT EDIT\n# ENV: ${env.toUpperCase()}\n\n` +
    fs.readFileSync(envFile, 'utf8')
);

console.log(`✅ .env generated from ${env}.env`);

// 2️⃣ Build release APK
console.log(`🚀 Building RELEASE APK with ${env.toUpperCase()} env`);

execSync(
  `cd android && ENVFILE=${envFile} ./gradlew assembleRelease`,
  { stdio: 'inherit' }
);

console.log('🎉 Release APK generated successfully');
