echo "start installing..."
npm install
echo "install completed"
echo "start building..."
npm run build
echo "build completed"
# 复制package.json到dist目录
cp package.json dist/