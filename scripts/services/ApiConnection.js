var Connection = function () {
    this.apiBaseUrl = AUTH_CONNECTION_API;
    this.authHeader = 'Bearer ' + AUTH_TOKEN;
};

Connection.prototype._request = function(method, url, data, onComplete, onError){
    var self = this;
	$.ajax({
        url: url,
        type: method,
        data: JSON.stringify(data),
        contentType: 'application/json',
        beforeSend : function(xhr) {
            xhr.setRequestHeader("Authorization", self.authHeader);
    }.bind(this)})
    .done(onComplete)
    .fail(onError);
}

Connection.prototype.getAll = function (callback, errorCallback) {
    this._request("GET", this.apiBaseUrl + "?strategy=oauth2", null, callback, errorCallback);
};

Connection.prototype.get = function(name, callback, errorCallback){
    this._request("GET", this.apiBaseUrl + "/" + name, null, callback, errorCallback);
}

Connection.prototype.create = function (data, callback, errorCallback) {
    this._request("POST", this.apiBaseUrl, data, callback, errorCallback);
};

Connection.prototype.update = function (data, callback, errorCallback) {
    this._request("PATCH", this.apiBaseUrl + "/" + data.id, data, callback, errorCallback);        
};

Connection.prototype.delete = function (name, callback, errorCallback) {
    this._request("DELETE", this.apiBaseUrl + "/" + name, null, callback, errorCallback);    
};