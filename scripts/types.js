/**
 * @typedef {"onUse" | "onUseOn" | "onBeforeDurabilityDamage" | "onCompleteUse" | "onConsume" | "onHitEntity" | "onMineBlock"} ItemCustomComponent
 */

/**
 * @typedef {ItemCustomComponent[]} ItemCustomComponents
 */

/**
 * @typedef {"onPlace" | "onPlayerDestroy" | "onPlayerInteract" | "onEntityFallOn" | "onRandomTick" | "onStepOff" | "onStepOn" | "onTick"} BlockCustomComponent
 */

/**
 * @typedef {BlockCustomComponent[]} BlockCustomComponents
 */

/**
 * @typedef {"item" | "block"} DataType 
 */

/**
 * @typedef {DataType[]} DataTypes 
 */

/**
 * @typedef {"create" | "edit"} ShowMode
 */

/**
 * @typedef {Object} Data 
 * @property {string} uuid
 * @property {DataType} type 
 * @property {string} id
 * @property {EventObject[]} events
 */

/**
 * @typedef {Object} EventObject
 * @property {ItemCustomComponent | BlockCustomComponent} type
 * @property {string[]} commands
 * @property {string[]} attackingCommands
 * @property {string[]} hitCommands
 */