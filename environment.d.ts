declare namespace NodeJS {
    export interface ProcessEnv {
        PORT?: number,
        DB_HOST?: string,
        DB_PORT?: number,
        DB_USERNAME?: string,
        DB_PASSWORD?: string,
        DB_NAME?: string,
        COOKIE_SECRET?: string,
        JWT_SECRET?: string,
    }
}