import { Category } from "@prisma/client";
import { ICategoryCreate, ICategoryGetOne, ICategoryUpdate } from "~/features/category/interfaces/categories.interface";
import { prisma } from "~/prisma";
import { PaginatedResult, GetAllOptions } from '../../globals/interfaces/global.interface';

class CategoriesService {
    public async add (body:ICategoryCreate) : Promise<Category>{
        const {title , icon , slug , uniqueString} = body
        const category:Category = await prisma.category.create({
            data : {
                title , icon , status : true , slug,uniqueString
            }
        })
        return category
    }
    public async read(getAllOptions:GetAllOptions): Promise<PaginatedResult<Category>> {
        const {page , limit,sortBy,sortDir}= getAllOptions;
        const skip = (page - 1) * limit;
        const totalItems = await prisma.category.count();
        const categories: Category[] = await prisma.category.findMany({
          skip,
          take: limit,
          orderBy: {
            [sortBy]: sortDir,
          },
        });
        const totalPages = Math.ceil(totalItems / limit);  
        if (page > totalPages) {
            return {
                data: [],
                totalItems,
                totalPages,
                currentPage: page,
                limit,
            }
        }
        return {
          data: categories,
          totalItems,
          totalPages,
          currentPage: page,
          limit,
        };
      }
    public async readOne (param:ICategoryGetOne) : Promise<Category | null>{
            const {dkp} = param;
            const category = await prisma.category.findFirstOrThrow({
                where : {
                    uniqueString:dkp,
                    status : true
                }
            })
            return category 
    }
    public async update(body: ICategoryUpdate): Promise<Category | null> {
        const { dkp, title, icon } = body;
            const result = await prisma.category.update({
                where: { uniqueString:dkp },
                data: { title, icon },
            });
            return result;
    }
    public async delete (body:ICategoryGetOne) : Promise<Category | null>{
        const {dkp} = body;
        const result = await prisma.category.delete({
            where: {
                uniqueString:dkp,
            }
        });
        return result;
    }
}

export const categoriesService: CategoriesService = new CategoriesService();
