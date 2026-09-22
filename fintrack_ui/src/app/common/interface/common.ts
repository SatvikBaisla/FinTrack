import { TAccountTypes, TDebtType, TSubscriptionStatus } from "./type";

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

// user
export interface IUser{
    email: string;
    user_name: string;
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
    ref_number: string;
    type: TAccountTypes;
    opening_balance: number;
    current_balance: number;
    created_at: Date;
}

export interface IUserAccount{
    account_id: number;
    name: string;
    ref_number: string;
    type: TAccountTypes;
    opening_balance: number;
    current_balance: number;
    created_at: Date;
}

export interface IAddNewAccountRequestBody{
    name: string;
    type: TAccountTypes;
    opening_balance: number;
    current_balance: number;
}

// subscription
export interface IAddSubscriptionReqBody{
    name: string,
    account_id: number,
    sub_amount: number,
    sub_date: Date;
    start_date: Date;
    end_date: Date;
}
export interface ISubscription{
    subscription_id: number;
    account_id: number;
    account_name: string;
    ref_number: string;
    account_type: TAccountTypes;
    name: string,
    sub_amount: number,
    sub_date: Date;
    start_date: Date;
    end_date: Date;
    status: TSubscriptionStatus;
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

// savings 
export interface IUserSaving{
    saving_id: number;
    account_id: number;
    account_name: string;
    account_type: TAccountTypes;
    saving_amount: number;
    current_balance: number;
    created_at: Date;
}
export interface IAddSavingReqBody{
    account_id: number;
    amount: number;
}