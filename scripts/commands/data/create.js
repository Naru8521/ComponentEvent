import { Player } from "@minecraft/server";
import MenuForm from "../../forms/Menu";
import * as config from "../../config";
import { util } from "../../util";

/**
 * @param {Player} player 
 * @param {string[]} args 
 */
export async function run(player, args) {
    const newData = util.deepCopyObject(config.data);

    newData.uuid = util.generateUUIDv4();
    await MenuForm(player, "create", newData);
}