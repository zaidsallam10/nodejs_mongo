export abstract class RegistrationFunctions {

    abstract register(object: any): Promise<{}>;
    abstract login(object: any): Promise<{}>;
    abstract lastLogin(user_id: any, user_type: any): Promise<{}>;
    abstract fogotPassword(object: any): Promise<{}>;
    abstract resetPassword(object: any): Promise<{}>;
    abstract verify(object: any): Promise<{}>;
    abstract changePassword(object: any): Promise<{}>;
    abstract sendVerificationEmail(object: any): Promise<{}>;


}