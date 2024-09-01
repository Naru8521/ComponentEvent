import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "./Menu";
/// <reference path="../types.js"/>

/**
 * @param {Player} player 
 * @param {ShowMode} showMode 
 * @param {Data} data
 */
export default async function CloseForm(player, showMode, data) {
    const form = new UI.ActionFormData();

    form.title("確認");
    form.body("このままフォームを閉じると、§c変更したデータが破棄されます。§f\nそれでもよろしいですか？");
    form.button("はい");
    form.button("いいえ");

    const { selection, canceled } = await form.show(player);

    if (canceled) return await CloseForm(player, showMode, data);
    if (selection === 0) return;
    if (selection === 1) return MenuForm(player, showMode, data);
}