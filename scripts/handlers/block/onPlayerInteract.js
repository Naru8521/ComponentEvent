import { BlockComponentPlayerInteractEvent } from "@minecraft/server";

/**
 * @param {BlockComponentPlayerInteractEvent} ev 
 * @param {EventObject} event 
 */
export function run(ev, event) {
    const { player, dimension } = ev;
    const commands = event.commands;

    for (const command of commands) {
        if (player) {
            player.runCommand(command);
        } else {
            dimension.runCommand(command);
        }
    }
}