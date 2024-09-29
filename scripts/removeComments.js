const fs = require('fs')
const path = require('path')

function removeCommentsFromFile(filePath) {
  const data = fs.readFileSync(filePath, 'utf8')

  // Regular expression to remove single-line and multi-line comments
  const result = data
    .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '') // Remove single-line and multi-line comments
    .replace(/\n\s*\n/g, '\n') // Remove empty lines

  fs.writeFileSync(filePath, result, 'utf8')
  console.log(`Comments removed from: ${filePath}`)
}

function removeCommentsFromDirectory(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      removeCommentsFromDirectory(filePath)
    } else if (filePath.endsWith('.js') || filePath.endsWith('.ts')) {
      removeCommentsFromFile(filePath)
    }
  })
}

// Replace 'your_directory_path' with the path of your project directory
removeCommentsFromDirectory('../')
