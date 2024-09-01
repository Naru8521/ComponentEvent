import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import * as config from "../../config";
import CommandAddForm from "./CommandAdd";
import CommandEditForm from "./CommandEdit";
/// <reference path="../../types.js"/>

/**
 * @param {Player} player 
 * @param {ShowMode} showMode 
 * @param {Data} data
 * @param {number} i
 * @param {Promise<UI.ActionFormData | UI.ModalFormData | UI.MessageFormData>} backForm
 */
export default async function CommandListForm(player, showMode, data, i, backForm) {
    let event = data.events[i];
    const type = event.type;
    const form = new UI.ActionFormData();

    form.title("コマンドリスト");
    form.body([
        `§lコマンド数: §r§b${data.events[i].commands.length + data.events[i].attackingCommands.length + data.events[i].hitCommands.length}`
    ].join("§r\n"));
    form.button("§l§c戻る");
    form.button("§l§b追加");

    if (config.hitAndAttackCommandsComponents.includes(type)) {
        for (const command of event.hitCommands) {
            form.button(command);
        }
        for (const command of event.attackingCommands) {
            form.button(command);
        }
    } else {
        for (const command of event.commands) {
            form.button(command);
        }
    }

    const { selection, canceled } = await form.show(player);

    if (canceled) return await backForm(player, showMode, data, i);
    if (selection === 0) return await backForm(player, showMode, data, i);
    if (selection === 1) return await CommandAddForm(player, showMode, data, i, backForm);

    const select = selection - 2;

    await CommandEditForm(player, showMode, data, i, select, backForm);
}