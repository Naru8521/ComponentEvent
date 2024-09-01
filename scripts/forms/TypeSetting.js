import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import * as config from "../config";
import MenuForm from "./Menu";
/// <reference path="../types.js"/>

/**
 * @param {Player} player 
 * @param {ShowMode} showMode 
 * @param {Data} data
 */
export default async function TypeSettingForm(player, showMode, data) {
    const form = new UI.ModalFormData();

    form.title("タイプ設定");
    form.dropdown("タイプ", config.dataTypes, config.dataTypes.indexOf(data.type));
    form.submitButton("設定");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await MenuForm(player, showMode, data);

    const type = config.dataTypes[formValues[0]];

    data.type = type;
    await MenuForm(player, showMode, data);
}