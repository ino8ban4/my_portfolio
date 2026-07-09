import { test, expect } from '@playwright/test';

test('アイテム作成→一覧確認→削除', async ({ page }) => {
  const uniqueName = `テスト投稿-${Date.now()}`;

  // 1.トップページ遷移
  await page.goto('/');

  // 2.新規作成画面遷移
  await page.getByTestId('new-post-link').click();
  await expect(page).toHaveURL('/posts/new')

  // 3. 入力欄入力
  await page.getByLabel('タイトル').fill(uniqueName);
  await page.getByLabel('本文').fill('test content');
  
  // 4. 登録実行
  await page.getByTestId('submit-button').click();

  // 5. 遷移先確認
  await expect(page).toHaveURL('/')
  
  // 6. 一覧表示確認
  const itemLink = page.getByRole('link', { name: uniqueName});
  await expect(itemLink).toBeVisible();

  // 7. 詳細画面・削除機能
  await itemLink.click();
  await expect(page).toHaveURL(/\/posts\/\d+$/) //idどうやって取るの？？
  await page.getByTestId('delete-button').click();

  // 8. 削除後一覧確認
  await expect(page).toHaveURL('/')
  await expect(itemLink).not.toBeVisible();
});

