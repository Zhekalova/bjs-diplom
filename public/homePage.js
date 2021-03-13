'use strict'

let button = new LogoutButton();
button.action = () => {ApiConnector.logout((response) => {
        if (response.success) {
            location.reload();
        } else {
            console.log(response.error);
        };
    });
}

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    } else {
        console.log(response.error);
    };
});

let rates = new RatesBoard();
function refreshBoard() {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            rates.clearTable();
            rates.fillTable(response.data);
        } else {
            console.log(response.error);
        };
    });
}

refreshBoard();
setInterval(refreshBoard, 60000);

let manager = new MoneyManager();
manager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            manager.setMessage(true, "Деньги успешно зачислены");
        } else {
            manager.setMessage(false, "Ошибка транзакции: " + response.error);
        };
    });
}

manager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            manager.setMessage(true, "Деньги успешно сконвертированы");
        } else {
            manager.setMessage(false, "Ошибка конвертации: " + response.error);
        };
    });
}

manager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            manager.setMessage(true, "Деньги успешно отправлены");
        } else {
            manager.setMessage(false, "Ошибка перевода: " + response.error);
        };
    });
}

let favorites = new FavoritesWidget();
function refreshFavorites(data) {
    favorites.clearTable();
    favorites.fillTable(data);
    manager.updateUsersList(data);
}

ApiConnector.getFavorites((response) => {
    if (response.success) {
        refreshFavorites(response.data);
    } else {
        console.log(response.error);
    };
});

favorites.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            refreshFavorites(response.data);
            favorites.setMessage(true, "Избранный контакт добавлен");
        } else {
            favorites.setMessage(false, "Ошибка добавления в избранное: " + response.error);
        };
    });
}

favorites.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            refreshFavorites(response.data);
            favorites.setMessage(true, "Избранный контакт удален");
        } else {
            favorites.setMessage(false, "Ошибка удаления контакта из избранного: " + response.error);
        };
    });
}