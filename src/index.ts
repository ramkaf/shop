import express, { Application } from 'express'
import 'express-async-errors'
import { Server } from './server'
import { PrismaClient } from '@prisma/client'
class ShopApplication {
  private prisma: PrismaClient
  constructor() {
    this.prisma = new PrismaClient()
  }
  public run(): void {
    this.checkDatabaseConnection()
    const app: Application = express()
    const server: Server = new Server(app)
    server.start()
  }
  private async checkDatabaseConnection(): Promise<void> {
    try {
      await this.prisma.$connect()
      console.log('Database connection successful')
    } catch (error) {
      console.error('Database connection failed', error)
      process.exit(1)
    }
  }
}
const shopApplication: ShopApplication = new ShopApplication()
shopApplication.run()
