function setSpreadsheetHeader() {
  // スプレッドシートIDを設定
  var spreadsheetId = '1iSHNg_JGrNgrYg1mAryysA45mveU6A6fQapjsxPNkwg';

  // スプレッドシートを取得
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getActiveSheet();

  // ヘッダーを設定
  var header = [
    '予約ID',
    '予約日時',
    '氏名',
    'メールアドレス',
    '電話番号',
    '予約内容/目的',
    '備考',
    '状態',
    'Googleカレンダーイベントリンク',
    '確認メール送信状況',
    'リマインダー送信状況'
  ];

  // ヘッダーを書き込む
  sheet.appendRow(header);
}
