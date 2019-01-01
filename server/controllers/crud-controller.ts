export abstract class CRUDController {

    abstract create(object: any): Promise<{}>;
    abstract delete(id: number): Promise<{}>;
    abstract update(object: any): Promise<{}>;
    abstract getById(id: number): Promise<{}>;
    abstract getAll(): Promise<{}>;

}