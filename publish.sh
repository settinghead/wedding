git checkout master
gulp
git checkout gh-pages
cp -r ./dist/ ./
git add -A .
git commit -m "update"
git push
git checkout master
