import { ChatSendBeforeEvent, ScriptEventCommandMessageAfterEvent } from "@minecraft/server";

/**
 * @typedef {Object} CommandData
 * @property {string} prefix
 * @property {string} id
 * @property {string[]} tags
 */

/** @type {CommandData} */
const commandData = {
    prefix: "ce", // チャット実行時の最初に付ける文字
    id: "c:e", // scripteventコマンドのID
    tags: ["op"] // 実行権限
};

export class Command {
    /**
     * @param {ChatSendBeforeEvent} ev
     * @param {boolean} sound
     * @returns {Promise<boolean>}
     */
    static async chatCheck(ev, sound) {
        const { sender, message } = ev;

        if (message.startsWith(commandData.prefix)) {
            let hasPermission = true;
            ev.cancel = true;

            if (commandData.tags.length > 0) {
                const tags = sender.getTags();

                hasPermission = tags.some(tag => commandData.tags.includes(tag));
            }
    
            if (hasPermission) {
                const command = message.slice(commandData.prefix.length).trim();
                const [commandName, ...args] = command.split(' ');
    
                try {
                    const module = await import(`./data/${commandName}`);

                    module.run(sender, args);
                    return true;
                } catch (e) {
                    console.warn(e);
                    
                    if (sound) {
                        sender.playSound("note.bass");
                    }
                    
                    sender.sendMessage(`§cエラー: ${message}。そのコマンドは存在しません`);
                }
            } else {
                if (sound) {
                    sender.playSound("note.bass");
                }
                
                sender.sendMessage(`§cエラー: コマンドの実行権限がありません`);
            }
        }

        return false;
    }

    /**
     * @param {ScriptEventCommandMessageAfterEvent} ev
     * @param {boolean} sound
     * @returns {Promise<boolean>}
     */
    static async scriptCheck(ev, sound) {
        const { id, message, sourceEntity } = ev;

        if (commandData.id === id) {
            const [commandName, ...args] = message.split(' ');

            try {
                const module = await import(`./data/${commandName}`);
    
                module.run(sourceEntity, args);
                return true;
            } catch (e) {
                if (sourceEntity) {
                    if (sound) {
                        sourceEntity.playSound("note.bass");
                    }
                    
                    sourceEntity.sendMessage(`§cエラー: ${message}。そのコマンドは存在しません`);
                }
            }
        }

        return false;
    }
}