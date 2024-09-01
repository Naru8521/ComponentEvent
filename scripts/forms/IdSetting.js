import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "./Menu";
/// <reference path="../types.js"/>

/**
 * @param {Player} player 
 * @param {ShowMode} showMode 
 * @param {Data} data
 */
export default async function IdSettingForm(player, showMode, data) {
    const form = new UI.ModalFormData();

    form.title("ID設定");
    form.textField("ID", "test:test", data.id);
    form.submitButton("設定");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await MenuForm(player, showMode, data);

    const id = formValues[0];

    data.id = id;
    await MenuForm(player, showMode, data);
}