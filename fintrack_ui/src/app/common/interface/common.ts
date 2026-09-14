import { TAccountTypes } from "./type";

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

// accounts
export interface IGetAllAccountsRequestBody{
    account_id: number;
    name: string;
    type: TAccountTypes;
    opening_balance: number;
    current_balance: number;
    created_at: Date;
}
export interface IGetAllAccountsResponseBody{
    account_id: number;
    name: string;
    type: TAccountTypes;
    opening_balance: number;
    current_balance: number;
    created_at: Date;
}

export interface IUserAccount{
    account_id: number;
    name: string;
    type: TAccountTypes;
    opening_balance: number;
    current_balance: number;
}

export interface IAddNewAccountRequestBody{
    name: string;
    type: TAccountTypes;
    opening_balance: number;
    current_balance: number;
}
export interface IAddNewAccountResponseBody{
    account_id: number;
    name: string;
    type: TAccountTypes;
    opening_balance: number;
    current_balance: number;
    created_at: Date;
}