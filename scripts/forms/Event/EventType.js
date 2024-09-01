import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import * as config from "../../config";
import { util } from "../../util";

/**
 * @param {Player} player 
 * @param {ShowMode} showMode 
 * @param {Data} data
 * @param {number} i
 * @param {Promise<UI.ActionFormData | UI.ModalFormData | UI.MessageFormData>} backForm
 */
export default async function EventTypeForm(player, showMode, data, i, backForm) {
    const type = data.events[i].type;
    let components = data.type === "item"
        ? util.deepCopyObject(config.itemCustomComponents)
        : util.deepCopyObject(config.blockCustomComponents);

    for (const event of data.events) {
        if (event.type === type) continue;

        components.splice(components.indexOf(event.type), 1);
    }

    const form = new UI.ModalFormData();

    form.title("イベントタイプ");
    form.dropdown("タイプ", components, components.indexOf(type));
    form.submitButton("設定");

    const { formValues, canceled } = await form.show(player);

    if (canceled) return await backForm(player, showMode, data, i);

    const newType = components[formValues[0]];

    if (newType === type) return await backForm(player, showMode, data, i);

    data.events[i].type = newType;
    data.events[i].commands = [];
    data.events[i].attackingCommands = [];
    data.events[i].hitCommands = [];
    await backForm(player, showMode, data, i);
}