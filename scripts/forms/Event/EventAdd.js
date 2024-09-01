import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import EventListForm from "./EventList";
import EventTypeForm from "./EventType";
import CommandListForm from "../Command/CommandList";
/// <reference path="../../types.js"/>

/**
 * @param {Player} player 
 * @param {ShowMode} showMode 
 * @param {Data} data
 * @param {number} i
 */
export default async function EventAddForm(player, showMode, data, i) {
    const form = new UI.ActionFormData();

    form.title("イベント追加");
    form.body([
        `§lイベントタイプ: §r§b${data.events[i].type}`,
        `§lコマンド数: §r§b${data.events[i].commands.length + data.events[i].attackingCommands.length + data.events[i].hitCommands.length}`
    ].join("§r\n"));
    form.button("§lイベントタイプ");
    form.button("§lコマンドリスト");
    form.button("§l§b追加");

    const { selection, canceled } = await form.show(player);

    if (canceled) {
        data.events.splice(i, 1);
        await EventListForm(player, showMode, data);
        return;
    }
    if (selection === 0) return await EventTypeForm(player, showMode, data, i, EventAddForm);
    if (selection === 1) return await CommandListForm(player, showMode, data, i, EventAddForm);
    if (selection === 2) return await EventListForm(player, showMode, data);
}