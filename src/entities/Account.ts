export interface Account {
    accountId: number;
    staffId: number | null;
    password: string;
    status: boolean | null;
}