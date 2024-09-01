import { ItemComponentUseOnEvent } from "@minecraft/server";

/**
 * @param {ItemComponentUseOnEvent} ev 
 * @param {EventObject} event 
 */
export function run(ev, event) {
    const { source } = ev;
    const commands = event.commands;

    for (const command of commands) {
        source.runCommand(command);
    }
}