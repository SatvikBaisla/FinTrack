import { TAccountTypes, TDebtType } from "./type";

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

// subscription
export interface IAddSubscriptionReqBody{
    name: string,
    sub_amount: number,
    sub_date: Date;
    start_date: Date;
    end_date: Date;
}
export interface IAddSubscriptionResBody{
    subscription_id: number;
    name: string,
    sub_amount: number,
    sub_date: Date;
    start_date: Date;
    end_date: Date;
}

// debts
export interface IUserDebt{
    debt_id: number;
    person_name: number;
    type: TDebtType;
    amount: number;
    date: Date;
    end_date: Date;
}
export interface IUserDebtReqBody{
    person_name: number;
    type: TDebtType;
    amount: number;
    date: Date;
    end_date: Date;
}