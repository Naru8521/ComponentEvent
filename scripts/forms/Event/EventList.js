import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "../Menu";
import { util } from "../../util";
import * as config from "../../config";
import EventAddForm from "./EventAdd";
import EventEditForm from "./EventEdit";
/// <reference path="../../types.js"/>

/**
 * @param {Player} player 
 * @param {ShowMode} showMode 
 * @param {Data} data
 */
export default async function EventListForm(player, showMode, data) {
    const events = data.events;
    const form = new UI.ActionFormData();

    form.title("イベントリスト");
    form.button("§l§c戻る");
    form.button("§l§b追加");

    for (const event of events) {
        form.button(event.type);
    }

    const { selection, canceled } = await form.show(player);

    if (canceled) return await MenuForm(player, showMode, data);
    if (selection === 0) return await MenuForm(player, showMode, data);
    if (selection === 1) {
        let components = data.type === "item"
            ? util.deepCopyObject(config.itemCustomComponents)
            : util.deepCopyObject(config.blockCustomComponents);

        for (const event of data.events) {
            components.splice(components.indexOf(event.type), 1);
        }

        const i = data.events.length;

        data.events.push({
            type: components[0],
            commands: [],
            hitCommands: [],
            attackingCommands: []
        });
        await EventAddForm(player, showMode, data, i);
        return;
    }

    const i = selection - 2;

    await EventEditForm(player, showMode, data, i);
}