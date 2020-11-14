# 老爸的私房帳戶 v2.0 Beta

本應用供提供新增帳目修改以及刪除功能
可以計算每個月份的開支總金額
並提供類型及月分搜尋開支
使用前需登入


DEMO:


https://fathers-private-account.herokuapp.com/


帳號:


imfather@example.tw


密碼:


8888



## 2.0新增功能

- 使用者必須登入使用
- 可根據開支類型﹑月份做交叉篩選


## 現有功能

- 列出所有開銷訊息
- 可以依照開銷類型篩選
- 可任意新增刪改開銷資訊
- 不輸入任何資訊也可以新增開支



## 使用工具

- mongoDB: 4.2.9
- mongoose: 5.10.2
- Node.js: 13.0.1
- Express: 4.17.1
- Express-Handlebars: 5.1.0
- nodemon: 2.0.4
- body-parser: 6.12.0
- method-override: 3.0,

- jquery: 3.3.1
- bootstrap: 4.2.1
- fontawesome: 5.14
- AOS: 2.3.1
- popper: 1.14.6


## 安裝

0.電腦需安裝mongoDB

1.開啟終端機(Terminal) cd 到存放專案本機位置並執行:

```
git clone https://github.com/windsailg/ac_restaurant_list-crud.git
``````

2.cd 至 ac_restaurant_list-crud 資料夾


3.初始化安裝套件

```
npm i   //安裝套件
```

```
npm run seed  //導入預設開支資訊
```

```
npm run seed2  //導入分類訊息
```


4.終端機顯示以下資訊代表成功與資料庫連接
mongoDB connected
done.

```
npm run dev  //啟動程式
```

5.終端機顯示以下資訊代表啟動成功
Express is running on http://localhost:3000
mongoDB connected

伺服器已經成功連線並運作於 http://localhost:3000




