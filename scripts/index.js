import { BlockComponentRegistry, ItemComponentRegistry, world } from "@minecraft/server";
import { Command } from "./commands/Command";

world.beforeEvents.worldInitialize.subscribe(ev => {
    const { blockComponentRegistry, itemComponentRegistry } = ev;

    registry(itemComponentRegistry, blockComponentRegistry);
});

world.beforeEvents.chatSend.subscribe(async ev => {
    const isCommand = await Command.chatCheck(ev, true);

    if (isCommand) return;
});

/**
 * @param {ItemComponentRegistry} itemRegistry 
 * @param {BlockComponentRegistry} blockRegistry
 */
function registry(itemRegistry, blockRegistry) {
    const ids = world.getDynamicPropertyIds();

    /** @type {Data[]} */
    const datas = ids.map(id => JSON.parse(world.getDynamicProperty(id)));

    for (const data of datas) {
        const type = data.type;
        const newEvents = {};

        for (const event of data.events) {
            const eventType = event.type;
    
            newEvents[eventType] = async (ev) => {
                const module = await import(`./handlers/${type}/${eventType}`);
    
                module.run(ev, event);
            };
        }
    
        switch (type) {
            case "item":
                itemRegistry.registerCustomComponent(data.id, newEvents);
                console.warn(`${data.id} has been initialized`);
                break;
    
            case "block":
                blockRegistry.registerCustomComponent(data.id, newEvents);
                console.warn(`${data.id} has been initialized`);
                break;
        }
    }
}