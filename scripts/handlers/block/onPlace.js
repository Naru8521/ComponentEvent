import { BlockComponentOnPlaceEvent } from "@minecraft/server";

/**
 * @param {BlockComponentOnPlaceEvent} ev 
 * @param {EventObject} event 
 */
export function run(ev, event) {
    const { dimension } = ev;
    const commands = event.commands;

    for (const command of commands) {
        dimension.runCommand(command);
    }
}