function showEditForm() {
  var html = HtmlService.createHtmlOutputFromFile('editForm');
  SpreadsheetApp.getUi() // Or DocumentApp or SlidesApp.
      .showModalDialog(html, '予約変更');
}

function editBooking(form) {
  var bookingId = form.bookingId;
  var email = form.email;
  var newDateTime = form.newDateTime;
  var newContent = form.newContent;

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
    var emailValue = row[3];

    if (bookingIdValue == bookingId && emailValue == email) {
      // 予約データを変更
      if (newDateTime) {
        sheet.getRange(i + 1, 2).setValue(newDateTime);
      }
      if (newContent) {
        sheet.getRange(i + 1, 6).setValue(newContent);
      }

      // 変更確認メールを送信
      try {
        sendEditConfirmationEmail(emailValue, bookingIdValue, newDateTime, newContent);
      } catch (e) {
        Logger.log('変更確認メールの送信に失敗しました。' + e);
      }

      return;
    }
  }

  // 予約データが見つからない場合
  Logger.log('予約データが見つかりませんでした。');
}
