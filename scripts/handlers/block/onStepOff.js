import { BlockComponentRandomTickEvent, BlockComponentStepOffEvent } from "@minecraft/server";

/**
 * @param {BlockComponentStepOffEvent} ev 
 * @param {EventObject} event 
 */
export function run(ev, event) {
    const { entity, dimension } = ev;
    const commands = event.commands;

    for (const command of commands) {
        if (entity) {
            entity.runCommand(command);
        } else {
            dimension.runCommand(command);
        }
    }
}