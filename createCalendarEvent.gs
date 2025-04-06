function createCalendarEvent(e) {
  // スプレッドシートIDを設定
  var spreadsheetId = '1iSHNg_JGrNgrYg1mAryysA45mveU6A6fQapjsxPNkwg';

  // スプレッドシートを取得
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  var sheet = spreadsheet.getActiveSheet();
  
  // フォームの回答を取得
  var responses = e.response.getItemResponses();
  
  // タイムスタンプを取得（フォーム送信の時間）
  var timestamp = e.response.getTimestamp();
  var formattedTimestamp = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
  
  // スプレッドシートの最終行を取得
  var lastRow = sheet.getLastRow();
  
  // すでに処理済みかチェック（同じレスポンスIDがないか確認）
  var responseId = e.response.getId();
  var processedIds = sheet.getRange("K1:K" + lastRow).getValues();
  for (var i = 0; i < processedIds.length; i++) {
    if (processedIds[i][0] === responseId) {
      Logger.log("この回答は既に処理済みです: " + responseId);
      return; // 既に処理済みの場合は終了
    }
  }
  
  // イベントのタイトルを設定
  var title = '[予約] ' + responses[0].getResponse() + ' - ' + responses[4].getResponse();

  // イベントの開始日時を設定
  var startTime = new Date(responses[3].getResponse());

  // イベントの終了日時を設定（1時間後）
  var endTime = new Date(startTime.getTime() + 60 * 60 * 1000);

  // イベントの説明を設定
  var description = '氏名: ' + responses[0].getResponse() + '\n' +
                    'メールアドレス: ' + responses[1].getResponse() + '\n' +
                    '電話番号: ' + responses[2].getResponse() + '\n' +
                    '予約内容/目的: ' + responses[4].getResponse() + '\n' +
                    '備考: ' + responses[5].getResponse() + '\n' +
                    '送信日時: ' + formattedTimestamp;

  // カレンダーIDを設定
  var calendarId = 'marusho1266@gmail.com';

  // カレンダーを取得
  var calendar = CalendarApp.getCalendarById(calendarId);

  // イベントを作成
  try {
    var event = calendar.createEvent(title, startTime, endTime, {description: description});
    
    // 処理済みマークとしてレスポンスIDを保存（K列に）
    sheet.getRange(lastRow, 11).setValue(responseId);
    
    // イベントIDも保存しておく（L列に）
    sheet.getRange(lastRow, 12).setValue(event.getId());
    
    Logger.log("イベント作成成功: " + event.getId());
    
    // 修正: 正しいカレンダーリンクを生成
    var eventId = event.getId();
    
    // イベントIDからカレンダーIDとイベントIDを分離
    var parts = eventId.split('@');
    var calId = parts[1]; // カレンダーID部分
    var cleanEventId = parts[0].replace(/[^a-zA-Z0-9]/g, ''); // イベントID部分（特殊文字を除去）
    
    // Googleカレンダーに直接リンクするURLを生成（イベント詳細ページへ）
    var eventLink = "https://calendar.google.com/calendar/event?eid=" + Utilities.base64Encode(cleanEventId + " " + calId);
    
    // スプレッドシートにイベントのURLを書き込む
    sheet.getRange(lastRow, 9).setValue(eventLink);
    
  } catch (e) {
    Logger.log("エラー発生: " + e);
    // エラー情報を記録（M列に）
    sheet.getRange(lastRow, 13).setValue("エラー: " + e.toString());
  }
}
