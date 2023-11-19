import { PrismaClient } from "@prisma/client";

export default class Repository {
    private _prisma: PrismaClient
    constructor() {
        this._prisma = new PrismaClient();;
    }
    get prisma() {
        return this._prisma;
    }
}