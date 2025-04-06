function createForm() {
  // フォームを作成
  var form = FormApp.create('予約フォーム');

  // フォームに質問を追加
  form.addTextItem().setTitle('氏名').setRequired(true);
  form.addTextItem().setTitle('メールアドレス').setRequired(true);
  form.addTextItem().setTitle('電話番号').setRequired(true);
  form.addDateTimeItem().setTitle('希望日時').setRequired(true);
  form.addTextItem().setTitle('予約内容/目的').setRequired(true);
  form.addTextItem().setTitle('備考');

  // フォームのURLを取得
  var formUrl = form.getPublishedUrl();

  // ログにフォームのURLを出力
  Logger.log('フォームのURL: ' + formUrl);
}
