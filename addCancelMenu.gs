function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // スプレッドシートのメニューに「キャンセル」を追加
  ui.createMenu('キャンセル')
      .addItem('予約キャンセル', 'showCancelForm')
      .addToUi();
}
