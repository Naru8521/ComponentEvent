# ComponentEvent

![GitHub Downloads (all assets, all releases)](https://img.shields.io/github/downloads/Naru8521/ComponentEvent/total) ![GitHub Downloads (all assets, latest release)](https://img.shields.io/github/downloads/Naru8521/ComponentEvent/latest/total?color=green) ![GitHub Release](https://img.shields.io/github/v/release/Naru8521/ComponentEvent)

custom_componentsのイベント登録を簡単に行うことができます。

アドオンのダウンロードは[コチラ](https://github.com/Naru8521/ComponentEvent/releases)

クラフターズコロニーは[コチラ](https://minecraft-mcworld.com/93430/)

# 質問
[ディスコードサーバー](https://discord.com/invite/Mfn8HRhUfm) で受け付けています

# 使い方
動画での説明は [コチラ](https://www.youtube.com/watch?v=AedxQAFsXsc)

まずは、アドオンをワールドにインポートしてください

__インポートができたら、``ベータAPI``をワールド設定からオンにしてください__

``/tag @s add op``を実行し、権限タグを付けます

``ce create``を実行し、チャット欄を閉じると、作成用のフォームが表示されます

![作成用フォーム](https://github.com/user-attachments/assets/cfadeae2-c7d3-4cc3-99bc-abd1cd122da5)

## タイプ設定
設定するカスタムコンポネントがitemまたはblockのどちらであるかを設定します。

## ID設定
登録するカスタムコンポネントのIDを設定します。

## イベントリスト
カスタムコンポネントに登録したいイベントを設定します。

これらの設定が完了して、作成したら、イベントをワールドに登録するために一度ワールドを再起動します。

## 編集について
``ce list``を実行し、チャット欄を閉じると、作成したカスタムコンポネントIDのリストが表示されます。

編集したいIDを押して、イベントなどを編集することができます。

これらは一度ワールドに登録しているため、``/reload``で設定を即座に反映することができます。

※もし反映されない場合は一度ワールドを再起動してください。

# コマンド一覧
| コマンド  | 説明 |
| ------------- | ------------- |
| ce create  | データ作成用のフォームを表示します |
| ce list | 作成されたデータリストを表示します |
