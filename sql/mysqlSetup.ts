import fs from 'fs'
import path from 'path'
import { prisma } from '~/prisma'

async function runTriggersFromFolder(folderPath: string) {
  const triggersDir = path.join(__dirname, folderPath)

  try {
    const files = fs.readdirSync(triggersDir)

    for (const file of files) {
      if (file.endsWith('.sql')) {
        const filePath = path.join(triggersDir, file)
        const sqlScript = fs.readFileSync(filePath, 'utf-8')

        try {
          await prisma.$executeRawUnsafe(sqlScript)
          console.log(`Executed trigger script: ${file}`)
        } catch (execError) {
          console.error(`Error executing trigger script ${file}:`, execError)
        }
      }
    }
  } catch (error) {
    console.error('Error reading trigger files:', error)
  } finally {
    await prisma.$disconnect()
  }
}

// Usage
runTriggersFromFolder('trigger')
