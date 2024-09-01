import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import EventListForm from "./EventList";
import EventTypeForm from "./EventType";
import CommandListForm from "../Command/CommandList";
import EventDeleteCheckForm from "./EventDeleteCheck";
/// <reference path="../../types.js"/>

/**
 * @param {Player} player 
 * @param {ShowMode} showMode 
 * @param {Data} data
 * @param {number} i
 */
export default async function EventEditForm(player, showMode, data, i) {
    const form = new UI.ActionFormData();

    form.title("イベント編集");
    form.body([
        `§lイベントタイプ: §r§b${data.events[i].type}`,
        `§lコマンド数: §r§b${data.events[i].commands.length + data.events[i].attackingCommands.length + data.events[i].hitCommands.length}`
    ].join("§r\n"));
    form.button("§lイベントタイプ");
    form.button("§lコマンドリスト");
    form.button("§l§c削除");
    form.button("§l§a保存");

    const { selection, canceled } = await form.show(player);

    if (canceled) return await EventListForm(player, showMode, data);
    if (selection === 0) return await EventTypeForm(player, showMode, data, i, EventEditForm);
    if (selection === 1) return await CommandListForm(player, showMode, data, i, EventEditForm);
    if (selection === 2) return await EventDeleteCheckForm(player, showMode, data, i, EventEditForm);
    if (selection === 3) await EventListForm(player, showMode, data);
}