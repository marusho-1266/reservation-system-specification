function writeDataToSpreadsheet(e) {
  // スプレッドシートIDを設定
  var spreadsheetId = '1iSHNg_JGrNgrYg1mAryysA45mveU6A6fQapjsxPNkwg';

  // スプレッドシートを取得
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getActiveSheet();

  // フォームの回答を取得
  var responses = e.response.getItemResponses();

  // データを配列に格納
  var data = [
    Utilities.getUuid(), // 予約ID
    new Date(), // 予約日時
    responses[0].getResponse(), // 氏名
    responses[1].getResponse(), // メールアドレス
    responses[2].getResponse(), // 電話番号
    responses[4].getResponse(), // 予約内容/目的
    responses[5].getResponse() // 備考
  ];

  // スプレッドシートにデータを書き込む
  sheet.appendRow(data);
}