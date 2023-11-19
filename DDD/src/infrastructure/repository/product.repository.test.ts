import { afterEach, beforeEach, describe } from "bun:test";
import { Sequelize } from "sequelize-typescript";

describe("product repository test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });
        await sequelize.sync();
    });
    afterEach(async () => {
        await sequelize.close();
    });
});