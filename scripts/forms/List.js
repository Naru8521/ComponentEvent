import { Player, world } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import MenuForm from "./Menu";
import { util } from "../util";
/// <reference path="../types.js"/>

/**
 * @param {Player} player 
 */
export default async function ListForm(player) {
    const ids = world.getDynamicPropertyIds();

    /** @type {Data[]} */
    const datas = ids.map(id => JSON.parse(world.getDynamicProperty(id)));
    const form = new UI.ActionFormData();

    form.title("プリセットリスト");

    if (datas.length > 0) {
        for (const data of datas) {
            form.button(data.id);
        }
    } else {
        form.button("閉じる");
    }

    const { selection, canceled } = await util.formBusy(player, form);

    if (canceled) return;
    if (datas.length > 0) {
        const data = datas[selection];

        await MenuForm(player, "edit", data);
    }
}