export interface IApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    token?: string;
}

// login 
export interface ILoginRequestBody{
    email: string;
    password: string;
}
export interface ILoginResponseBody{
    user_id: number;
    user_name: string;
    email: string;
}

// register 
export interface IRegisterRequestBody{
    name: string;
    email: string;
    password: string;
}
export interface IRegisterResponseBody{
    user_id: number;
    user_name: string;
    email: string;
    created_at: Date;
}