import { Entity } from "@/domain/entity";
import { Interactor } from "@domain/interactor";

export default interface Repository {
    execute?: (command: string) => Promise<void>;

    query?: (command: string) => Promise<any>;

    read?: (path: string) => Promise<any>;

    create: (object: Entity | Interactor.Data) => Promise<any>;

    update: (object: Entity | Interactor.Data, param?: any) => Promise<any>;

    delete?: (object: Entity | Interactor.Data) => Promise<any>;

    findAll: (param?: any) => Promise<Array<any>>;

    findOne: (lambda: any) => Promise<any>;
}
