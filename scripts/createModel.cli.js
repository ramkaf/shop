const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

const modelName = process.argv[2]

if (!modelName) {
  console.error('Please provide a model name.')
  process.exit(1)
}

const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1)

const pluralizeModelName = (name) => {
  if (name.endsWith('y')) {
    return name.slice(0, -1) + 'ies'
  }
  return name + 's'
}

const pluralModelName = pluralizeModelName(modelName)
const capitalizedModelName = capitalizeFirstLetter(modelName)
const capitalizedPluralModelName = capitalizeFirstLetter(pluralModelName)

const featuresDir = path.join(__dirname, '../src/features')
const servicesDir = path.join(__dirname, '../src/services/db')
const modelDir = path.join(featuresDir, modelName)
const controllerDir = path.join(modelDir, 'controllers')
const interfaceDir = path.join(modelDir, 'interfaces')
const routeDir = path.join(modelDir, 'routes')
const schemaDir = path.join(modelDir, 'schemas')

mkdirp.sync(controllerDir)
mkdirp.sync(interfaceDir)
mkdirp.sync(routeDir)
mkdirp.sync(schemaDir)
mkdirp.sync(servicesDir)

const controllerContent = `
import { NextFunction, Request, Response } from "express";
import { prisma } from "~/prisma";

class ${capitalizedPluralModelName}Controller {
    public async getAll(req: Request, res: Response, next: NextFunction) {}
    public async getById(req: Request, res: Response, next: NextFunction) {}
    public async create(req: Request, res: Response, next: NextFunction) {}
    public async update(req: Request, res: Response, next: NextFunction) {}
    public async delete(req: Request, res: Response, next: NextFunction) {}
}

export const ${pluralModelName}Controller: ${capitalizedPluralModelName}Controller = new ${capitalizedPluralModelName}Controller();
`

const interfaceContent = `
export interface I${capitalizedModelName}Create {
}

export interface I${capitalizedModelName}Update {
}
`

const routeContent = `
import express from 'express';
import { ${pluralModelName}Controller } from '../controllers/${pluralModelName}.controller'; // Adjust path as necessary

const ${pluralModelName}Router = express.Router();

${pluralModelName}Router.get('/', ${pluralModelName}Controller.getAll);
${pluralModelName}Router.get('/:id', ${pluralModelName}Controller.getById);
${pluralModelName}Router.post('/', ${pluralModelName}Controller.create);
${pluralModelName}Router.put('/:id', ${pluralModelName}Controller.update);
${pluralModelName}Router.delete('/:id', ${pluralModelName}Controller.delete);

export default ${pluralModelName}Router;
`

const schemaContent = `
import Joi from 'joi';

const create${capitalizedModelName}Schema = Joi.object({
});

const update${capitalizedModelName}Schema = Joi.object({
});

export { create${capitalizedModelName}Schema, update${capitalizedModelName}Schema };
`

const serviceContent = `
class ${capitalizedPluralModelName}Service {
}

export const ${pluralModelName}Service: ${capitalizedPluralModelName}Service = new ${capitalizedPluralModelName}Service();
`

const controllerPath = path.join(controllerDir, `${pluralModelName}.controller.ts`)
const interfacePath = path.join(interfaceDir, `${pluralModelName}.interface.ts`)
const routePath = path.join(routeDir, `${pluralModelName}.routes.ts`) // Updated route file name
const schemaPath = path.join(schemaDir, `${pluralModelName}.schema.ts`)
const servicePath = path.join(servicesDir, `${pluralModelName}.service.ts`)

// Write files
fs.writeFileSync(controllerPath, controllerContent)
fs.writeFileSync(interfacePath, interfaceContent)
fs.writeFileSync(routePath, routeContent)
fs.writeFileSync(schemaPath, schemaContent)
fs.writeFileSync(servicePath, serviceContent)

// Append to schema.prisma
const prismaSchemaPath = path.join(__dirname, '../prisma/schema.prisma')
const newModelDefinition = `
model ${capitalizeFirstLetter(modelName)} {
  id Int @id @default(autoincrement())
}
`

fs.appendFileSync(prismaSchemaPath, newModelDefinition)

console.log(`Model ${modelName} created successfully and added to schema.prisma!`)
