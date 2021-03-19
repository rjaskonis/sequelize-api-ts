import { Entity } from "@/domain/entity";
import { Interactor } from "@domain/interactor";

export default interface Repository {
    execute?: (command: string) => Promise<void>;

    query?: (command: string) => Promise<any>;

    read?: (path: string) => Promise<any>;

    store?: (param: Entity | Interactor.Data) => Promise<any>;

    delete?: (param: Entity | Interactor.Data) => Promise<any>;

    findAll?: () => Promise<Array<any>>;

    findOne?: (lambda: any) => Promise<any>;
}
