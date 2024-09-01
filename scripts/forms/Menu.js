import { Player, world } from "@minecraft/server";
import * as UI from "@minecraft/server-ui";
import { util } from "../util";
import CloseForm from "./Close";
import IdSettingForm from "./IdSetting";
import TypeSettingForm from "./TypeSetting";
import EventListForm from "./Event/EventList";
import DeleteCheckForm from "./DeleteCheck";
/// <reference path="../types.js"/>

/**
 * @param {Player} player 
 * @param {ShowMode} showMode 
 * @param {Data} data
 */
export default async function MenuForm(player, showMode, data) {
    const form = new UI.ActionFormData();

    form.title("データを" + (showMode === "create" ? "作成" : "編集"));
    form.body([
        `§lタイプ: §r§b${data.type}`,
        `§lID: §r§b${data.id}`,
        `§lイベント数: §r§b${data.events.length}`
    ].join("§r\n"));
    form.button("§lタイプ設定");
    form.button("§lID設定");
    form.button("§lイベントリスト");

    if (showMode === "edit") {
        form.button("§l§c削除");
    }

    form.button(showMode === "create" ? "§l§b作成" : "§l§a保存");

    const { selection, canceled } = await util.formBusy(player, form);

    if (canceled) return await CloseForm(player, showMode, data);
    if (selection === 0) return await TypeSettingForm(player, showMode, data);
    if (selection === 1) return await IdSettingForm(player, showMode, data);
    if (selection === 2) return await EventListForm(player, showMode, data);
    if (selection === 3 && showMode === "create") {
        world.setDynamicProperty(data.uuid, JSON.stringify(data));
        player.sendMessage(`§b${data.id} §aの設定を作成しました`);
        return;
    }
    if (selection === 3 && showMode === "edit") return await DeleteCheckForm(player, showMode, data);
    if (selection === 4 && showMode === "edit") {
        world.setDynamicProperty(data.uuid, JSON.stringify(data));
        player.sendMessage(`§b${data.id} §aの設定を作成しました`);
        return;
    }
}