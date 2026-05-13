export interface User {
    id: number;

    firstName: string;
    lastName: string;

    maidenName?: string;

    age?: number;

    gender?: string;

    email: string;

    phone: string;

    image: string;

    username?: string;

    birthDate?: string;

    website?: string;

    company?: {
        name: string;
    };

    address?: {
        address: string;
        city: string;
        state?: string;
    };
}