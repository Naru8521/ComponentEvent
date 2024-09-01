/// <reference path="./types.js"/>

/** @type {ItemCustomComponents} */
export const itemCustomComponents = [
    "onUse",
    "onUseOn",
    "onBeforeDurabilityDamage",
    "onCompleteUse",
    "onConsume",
    "onHitEntity",
    "onMineBlock"
];

/** @type {BlockCustomComponents} */
export const blockCustomComponents = [
    "onPlace",
    "onPlayerDestroy",
    "onPlayerInteract",
    "onEntityFallOn",
    "onRandomTick",
    "onStepOff",
    "onStepOn",
    "onTick"
];

export const hitAndAttackCommandsComponents = [
    "onHitEntity"
];

/** @type {DataTypes} */
export const dataTypes = [
    "item",
    "block"
];

/** @type {Data} */
export const data = {
    uuid: "",
    type: "item",
    id: "",
    events: [],
}