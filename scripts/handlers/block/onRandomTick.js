import { BlockComponentRandomTickEvent } from "@minecraft/server";

/**
 * @param {BlockComponentRandomTickEvent} ev 
 * @param {EventObject} event 
 */
export function run(ev, event) {
    const { dimension } = ev;
    const commands = event.commands;

    for (const command of commands) {
        dimension.runCommand(command);
    }
}