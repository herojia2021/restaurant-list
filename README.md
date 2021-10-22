# 餐廳清單

餐廳書籤服務, 附有帳號機制, 可以搜集喜歡的餐廳清單

## 功能列表

- 帳號密碼登入
- Facebook 登入
- 雜湊加密密碼
- 新增餐廳資料
- 刪除餐廳資料
- 修改餐廳資料
- 查看餐廳列表
- 查看餐廳的詳細資料
- 以店名查詢餐廳
- 以類別查詢餐廳
- 以不同排序檢視

### 需求

- Node.js & npm
- port 3000
- MongoDB
- Facebook Application ID、SecretID

### 安裝

1.在本地目錄 clone repo 或 [download](https://github.com/herojia2021/restaurant-list/archive/refs/heads/master.zip)

```
git clone https://github.com/herojia2021/restaurant-list.git
```

2.安裝相依套件

```
cd restaurant-list
```

```
npm install
```

3.匯入種子資料

```
npm run seed
```

4.開啟程式

```
npm run start
```

- 終端顯示 `Express is running on http://localhost:3000` 即啟動完成，
- 用瀏覽器開啟 [http://localhost:3000](http://localhost:3000) 使用程式

## 運行截圖

![首頁](/public/img/index.jpg)

## 主要套件

- [Express](https://www.npmjs.com/package/express) - Framework
- [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - Template Engine
- [Mongoose](https://www.npmjs.com/package/mongoose) - ODM
