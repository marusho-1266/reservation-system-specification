function sendCancelConfirmationEmail(emailAddress, bookingId, reason) {
  // 件名を設定
  var subject = '【予約キャンセル確認】';

  // 本文を設定
  var body = '予約ID: ' + bookingId + 'の予約をキャンセルしました。\n\n' +
             'キャンセル理由: ' + reason + '\n\n' +
             'お問い合わせ先: example@example.com';

  // メールを送信
  MailApp.sendEmail(emailAddress, subject, body);
}
