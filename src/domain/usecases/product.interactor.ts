import Interactor from "@domain/interactor";
import Product from "@/domain/entities/product";
import Repository from "@/data/repository";

export default class ProductInteractor implements Interactor {
    constructor(private readonly repository: Repository) {}

    async findAll(param?: object): Promise<Array<Product>> {
        return this.repository.findAll(param);
    }

    async findOne(param: any): Promise<Product | undefined> {
        const Product: Product = await this.repository.findOne(param);

        return Product;
    }

    async store(product: Product): Promise<any> {
        if (product.id) {
            return this.repository.update(product, {
                where: { id: product.id },
            });
        } else {
            return this.repository.create(product);
        }
    }

    async delete(param?: object): Promise<void> {
        return this.repository.update({ _deleted: true }, param);
    }
}
