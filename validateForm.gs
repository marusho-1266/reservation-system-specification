function validateForm(e) {
  if (!e || !e.response) {
    Logger.log('validateForm: イベントオブジェクトが無効です。');
    return false;
  }
  // 日時の入力形式チェック
  var dateTime = e.response.getItemResponses()[3].getResponse();
  if (!isValidDateTime(dateTime)) {
    return false;
  }

  // 営業時間内かどうかの検証
  if (!isWithinBusinessHours(dateTime)) {
    return false;
  }

  // 既存予約との重複チェック
  if (isDuplicateBooking(dateTime)) {
    return false;
  }

  return true;
}

function isValidDateTime(dateTime) {
  // 日時の入力形式をチェックする処理を記述
  // 例：正規表現でYYYY/MM/DD HH:MM形式をチェック
  var regex = /^\d{4}\/\d{2}\/\d{2} \d{2}:\d{2}$/;
  return regex.test(dateTime);
}

function isWithinBusinessHours(dateTime) {
  // 営業時間内かどうかを検証する処理を記述
  // 例：9:00〜18:00の間かどうかをチェック
  var hour = new Date(dateTime).getHours();
  return hour >= 9 && hour < 18;
}

function isDuplicateBooking(dateTime) {
  // 既存予約との重複をチェックする処理を記述
  // 例：スプレッドシートに予約データが存在するかどうかをチェック
  // スプレッドシートのIDとシート名を設定
  var spreadsheetId = 'YOUR_SPREADSHEET_ID';
  var sheetName = '予約データ';

  // スプレッドシートを取得
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getSheetByName(sheetName);

  // 予約データを取得
  var data = sheet.getDataRange().getValues();

  // 予約データと重複がないかチェック
  for (var i = 1; i < data.length; i++) {
    var bookingDateTime = data[i][1]; // 予約日時の列
    if (bookingDateTime == dateTime) {
      return true; // 重複あり
    }
  }

  return false; // 重複なし
}
