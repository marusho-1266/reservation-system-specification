function deleteCalendarEvent(bookingId) {
  // スプレッドシートIDを設定
  var spreadsheetId = '1iSHNg_JGrNgrYg1mAryysA45mveU6A6fQapjsxPNkwg';

  // スプレッドシートを取得
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getActiveSheet();

  // カレンダーIDを設定
  var calendarId = 'marusho1266@gmail.com';

  // カレンダーを取得
  var calendar = CalendarApp.getCalendarById(calendarId);

  // 予約データを検索
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var bookingIdValue = row[0];
    var eventId = row[11];

    if (bookingIdValue == bookingId) {
      // イベントを削除
      try {
        var event = calendar.getEventById(eventId);
        event.deleteEvent();
        Logger.log('イベントを削除しました。eventId: ' + eventId);
      } catch (e) {
        Logger.log('イベントの削除に失敗しました。eventId: ' + eventId + ' ' + e);
      }
      return;
    }
  }

  // 予約データが見つからない場合
  Logger.log('予約データが見つかりませんでした。');
}
