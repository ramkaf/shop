import bcrypt from 'bcrypt'
class PasswordService {
  public async checkPassword(password: string, hash: string): Promise<Boolean> {
    return await bcrypt.compare(password, hash)
  }
  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10)
  }
}
export const passwordService = new PasswordService()
