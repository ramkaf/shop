import fs from 'fs'
import path from 'path'
import { PrismaClient } from '@prisma/client'
import { log } from 'console'

// Initialize Prisma Client
const prisma = new PrismaClient()

// Function to read and execute SQL from a file
async function executeSQLFromFile(fileName: string): Promise<void> {
  try {
    // Construct the file path
    const filePath = path.join(__dirname, fileName)

    // Read the SQL file
    const sql = fs.readFileSync(filePath, 'utf8')

    // Execute the SQL command
    await prisma.$executeRawUnsafe(sql)
    console.log(`Successfully executed SQL from ${fileName}`)
  } catch (error) {
    console.error(`Error executing SQL from ${fileName}:`, error)
  }
}

// Function to execute multiple SQL files
async function executeMultipleSQLFiles(fileNames: string[]): Promise<void> {
  for (const fileName of fileNames) {
    await executeSQLFromFile(fileName)
  }
}

// Example usage
const triggerFileNames: string[] = [
  'productPrice.sql',
  'productQuantity.sql',
  'categoryProductQuantity.sql',
  'olderCart.sql'
]
console.log('ram')

executeMultipleSQLFiles(triggerFileNames)
  .catch((error) => {
    console.error('Failed to execute SQL scripts:', error)
  })
  .finally(() => {
    prisma.$disconnect()
  })
