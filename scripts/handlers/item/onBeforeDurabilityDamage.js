import { ItemComponentBeforeDurabilityDamageEvent } from "@minecraft/server";

/**
 * @param {ItemComponentBeforeDurabilityDamageEvent} ev 
 * @param {EventObject} event 
 */
export function run(ev, event) {
    const { hitEntity, attackingEntity } = ev;
    const hitCommands = event.hitCommands;
    const attackingCommands = event.attackingCommands;

    for (const command of hitCommands) {
        hitEntity.runCommand(command);
    }

    for (const command of attackingCommands) {
        attackingEntity.runCommand(command);
    }
}