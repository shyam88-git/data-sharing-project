interface LoginPayload {
    status: number;
    Success: string;
    data: {
        refresh: string;
        access: string;
    };
    user: User;
}

interface User {
    id: string;
    username: string;
    email: string;
    mobile_number: string;
    first_name: string;
    middle_name?: any;
    last_name: string;
}

interface AuthPayloadError {
    status: number;
    data: {
        errors: Error[];
    };
}
interface Error {
    message: string;
    field: string;
}

interface SignupPayload {
    username: string;
    email: string;
    last_name: string;
    first_name: string;
    mobile_number: string;
    password: string;
    confirm_password: string;
}

interface SignupSuccessPayload {
    id: string;
    username: string;
    email: string;
    mobile_number: string;
    first_name: string;
    last_name: string;
    date_joined: string;
}


interface VerifyUserPayload {
    user: User;
}
