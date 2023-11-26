import { describe, expect, it } from "bun:test";

describe("EventDispatcher", () => {
    it("should dispatch events to listeners", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        eventHandler.register("product.created", eventHandler);
        expect(eventHandler.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventHandler.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
    });
});