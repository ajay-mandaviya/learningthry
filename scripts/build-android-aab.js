const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const env = 'prod'; // 🔒 LOCKED TO PROD

const envFile = path.resolve(__dirname, '../env/prod.env');
const targetEnv = path.resolve(__dirname, '../.env');

if (!fs.existsSync(envFile)) {
  console.error('❌ prod.env not found');
  process.exit(1);
}

// 1️⃣ Generate .env (for verification only)
fs.writeFileSync(
  targetEnv,
  `# AUTO-GENERATED FILE\n# ENV: PROD (AAB BUILD)\n\n` +
    fs.readFileSync(envFile, 'utf8')
);

console.log('✅ .env generated from prod.env');

// 2️⃣ Build AAB (Play Store format)
console.log('🚀 Building PROD AAB');

execSync(
  `cd android && ENVFILE=${envFile} ./gradlew bundleRelease`,
  { stdio: 'inherit' }
);

console.log('🎉 AAB generated successfully');
