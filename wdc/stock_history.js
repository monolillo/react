(function() {
    
    $.urlParam = function(name){
            var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
            return results[1] || 0;
    }    
    
    // Create the connector object
    var myConnector = tableau.makeConnector();

    // Define the schema
    myConnector.getSchema = function(schemaCallback) {
        var cols = [{
            id: "timestamp",
            dataType: tableau.dataTypeEnum.datetime
        }, {
            id: "stock1",
            alias: "stock1",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "stock2",
            alias: "stock2",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "stock3",
            alias: "stock3",
            dataType: tableau.dataTypeEnum.int
        }];

        var tableSchema = {
            id: "stockHistoryFeed",
            alias: "Stock history",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        
        var url = "http://shoppingfirstclass.com:8080/hana/stock/history?fromDate={0}&toDate={1}";
        
        url = url.replace("{0}", $.urlParam('fromDate'));
        url = url.replace("{1}", $.urlParam('toDate'));
        
        $.getJSON(url, function(resp) {
            var feat = resp.history,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    //Tableau ignores standards
                    //So we change 2017-04-27T19:31:30.883000 to look like 2017-04-27 19:31:30.883
                    "timestamp": feat[i].timestamp.replace(/T/g,' ').slice(0, -3),
                    "stock1": feat[i].stock1,
                    "stock2": feat[i].stock2,
                    "stock3": feat[i].stock3
                });
            }

            table.appendRows(tableData);
            doneCallback();
        });
    };

    tableau.registerConnector(myConnector);

    // Create event listeners for when the user submits the form
    $(document).ready(function() {
        $("#submitButton").click(function() {
            tableau.connectionName = "Stock History"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
