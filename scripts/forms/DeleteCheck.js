import { Player, world } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { util } from "../util";
import MenuForm from "./Menu";
/// <reference path="../types.js"/>

/**
 * @param {Player} player 
 * @param {ShowMode} showMode 
 * @param {Data} data
 */
export default async function DeleteCheckForm(player, showMode, data) {
    const form = new UI.ActionFormData();

    form.title("確認");
    form.body("削除すると、元に戻すことはできませんが、削除しますか？");
    form.button("はい");
    form.button("いいえ");

    const { selection, canceled } = await form.show(player);

    if (canceled) return await MenuForm(player, showMode, data);
    if (selection === 0) {
        world.setDynamicProperty(data.uuid, undefined);
        player.sendMessage(`§b${data.id} §aの設定を§c削除§aしました`);
        return;
    }
    if (selection === 1) return await MenuForm(player, showMode, data);
}