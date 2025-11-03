'use strict';

const logoutButton = new LogoutButton();

logoutButton.action = function () {
    ApiConnector.logout(response => {  
        if (response.success) {
            location.reload();
        }
    });
};

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data); 
    }
});

const ratesBoard = new RatesBoard();

function stocks() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);  
        }
    });
}

stocks();
setInterval(stocks, 60000);  

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function (data) {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);  
            moneyManager.setMessage(true, 'Баланс успешно пополнен');  
        } else {
            moneyManager.setMessage(false, response.error);  
        }
    });
};

moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);  
            moneyManager.setMessage(true, 'Конвертация валюты прошла успешно');  
        } else {
            moneyManager.setMessage(false, response.error);  
        }
    });
};

moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);  
            moneyManager.setMessage(true, 'Перевод валюты выполнен успешно');  
        } else {
            moneyManager.setMessage(false, response.error);  
        }
    });
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);  
        moneyManager.updateUsersList(response.data); 
    }
});

favoritesWidget.addUserCallback = function(data) {
    ApiConnector.addUserToFavorites(data, response => {  
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);  
            moneyManager.updateUsersList(response.data);  
            favoritesWidget.setMessage(true, 'Пользователь успешно добавлен');  
        } else {
            favoritesWidget.setMessage(false, response.error);  
        }
    });
};

favoritesWidget.removeUserCallback = function(data) {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);  
            moneyManager.updateUsersList(response.data);  
            favoritesWidget.setMessage(true, 'Пользователь успешно удален');  
        } else {
            favoritesWidget.setMessage(false, response.error);  
        }
    });
};