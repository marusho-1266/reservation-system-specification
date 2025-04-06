function showCancelForm() {
  var html = HtmlService.createHtmlOutputFromFile('cancelForm');
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp.
      .showModalDialog(html, '予約キャンセル');
}

function cancelBooking(form) {
  var bookingId = form.bookingId;
  var email = form.email;
  var reason = form.reason;

  // スプレッドシートIDを設定
  var spreadsheetId = '1iSHNg_JGrNgrYg1mAryysA45mveU6A6fQapjsxPNkwg';

  // スプレッドシートを取得
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getActiveSheet();

  // 予約データを検索
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var bookingIdValue = row[0];
    var emailValue = row[2];

   if (bookingIdValue == bookingId || emailValue == email) {
      // 予約データをキャンセル
      sheet.getRange(i + 1, 8).setValue('キャンセル');

      // キャンセル理由を記録
      sheet.getRange(i + 1, 7).setValue(reason);

      // カレンダーからイベントを削除
      deleteCalendarEvent(bookingIdValue);

      // キャンセル確認メールを送信
      sendCancelConfirmationEmail(emailValue, bookingIdValue, reason);

      return;
    }
  }

  // 予約データが見つからない場合
  Logger.log('予約データが見つかりませんでした。');
}
