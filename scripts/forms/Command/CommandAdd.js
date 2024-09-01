import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import * as config from "../../config";
import CommandListForm from "./CommandList";
/// <reference path="../../types.js"/>

/**
 * @param {Player} player 
 * @param {ShowMode} showMode 
 * @param {Data} data
 * @param {number} i
 * @param {Promise<UI.ActionFormData | UI.ModalFormData | UI.MessageFormData>} backForm
 */
export default async function CommandAddForm(player, showMode, data, i, backForm) {
    let event = data.events[i];
    const type = event.type;
    const form = new UI.ModalFormData();
    const types = ["hitCommands", "attackingCommands"];

    form.title("コマンド追加");
    form.textField("コマンド", "", "");

    if (config.hitAndAttackCommandsComponents.includes(type)) {
        form.dropdown("タイプ", types);
    }

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await CommandListForm(player, showMode, data, i, backForm);

    const command = formValues[0].replace("/", "");

    if (config.hitAndAttackCommandsComponents.includes(type)) {
        event[types[formValues[1]]].push(command);
        await CommandListForm(player, showMode, data, i, backForm);
        return;
    }

    event.commands.push(command);
    await CommandListForm(player, showMode, data, i, backForm);
}