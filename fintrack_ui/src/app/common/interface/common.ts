export interface IApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    token?: string;
}

export interface ILoginRequestBody{
    email: string;
    password: string;
}