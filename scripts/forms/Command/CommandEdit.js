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
 * @param {number} select
 * @param {Promise<UI.ActionFormData | UI.ModalFormData | UI.MessageFormData>} backForm
 */
export default async function CommandEditForm(player, showMode, data, i, select, backForm) {
    let event = data.events[i];
    const type = event.type;
    const form = new UI.ModalFormData();
    const types = ["hitCommands", "attackingCommands"];

    form.title("コマンド編集");

    if (config.hitAndAttackCommandsComponents.includes(type)) {
        if (event.hitCommands.length - 1 >= select) {
            form.textField("コマンド", "", event.hitCommands[select]);
        } else if ((event.hitCommands.length - 1) + (event.attackingCommands.length - 1) >= select) {
            form.textField("コマンド", "", event.attackingCommands[select - (event.hitCommands.length - 1)]);
        }

        form.dropdown("タイプ", types);
    } else {
        form.textField("コマンド", "", event.commands[select]);
    }

    form.toggle("削除");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await CommandListForm(player, showMode, data, i, backForm);

    const command = formValues[0].replace("/", "");

    if (config.hitAndAttackCommandsComponents.includes(type)) {
        if (event.hitCommands.length - 1 >= select) {
            if (formValues[2]) {
                event.hitCommands.splice(select, 1);
                await CommandListForm(player, showMode, data, i, backForm);
                return;
            }
            
            if (types[formValues[1]] === "hitCommands") {
                event.hitCommands[select] = command;
            } else {
                event.hitCommands.splice(select, 1);
                event.attackingCommands.push(command);
            }
        } else if ((event.hitCommands.length - 1) + (event.attackingCommands.length - 1) >= select) {
            if (formValues[2]) {
                event.attackingCommands.splice(select - (event.hitCommands.length - 1), 1);
                await CommandListForm(player, showMode, data, i, backForm);
                return;
            }
            
            if (types[formValues[1]] === "attackingCommands") {
                event.attackingCommands[select - (event.hitCommands.length - 1)] = command;
            } else {
                event.attackingCommands.splice(select, 1);
                event.hitCommands.push(command);
            }
        }

        await CommandListForm(player, showMode, data, i, backForm);
        return;
    }

    if (formValues[1]) {
        event.commands.splice(select, 1);
        await CommandListForm(player, showMode, data, i, backForm);
        return;
    }

    event.commands[select] = command;
    await CommandListForm(player, showMode, data, i, backForm);
}