function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // スプレッドシートのメニューに「変更」を追加
  ui.createMenu('予約')
      .addItem('予約変更', 'showEditForm')
      .addItem('予約キャンセル', 'showCancelForm')
      .addToUi();
}
