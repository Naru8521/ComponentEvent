import { Player } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import EventListForm from "./EventList";
/// <reference path="../../types.js"/>

/**
 * @param {Player} player 
 * @param {ShowMode} showMode 
 * @param {Data} data
 */
export default async function EventDeleteCheckForm(player, showMode, data, i, backForm) {
    const form = new UI.ActionFormData();

    form.title("確認");
    form.body("削除すると、元に戻すことはできませんが、よろしいですか？");
    form.button("はい");
    form.button("いいえ");

    const { selection, canceled } = await form.show(player);

    if (canceled) return await backForm(player, showMode, data, i);
    if (selection === 0) {
        data.events.splice(i, 1);
        await EventListForm(player, showMode, data);
        return;
    }
    if (selection === 1) return await backForm(player, showMode, data, i);
}