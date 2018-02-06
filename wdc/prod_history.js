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
            id: "good",
            alias: "good",
            dataType: tableau.dataTypeEnum.int
        }, {
            id: "scrap",
            alias: "scrap",
            dataType: tableau.dataTypeEnum.int
        }];

        var tableSchema = {
            id: "prodHistoryFeed",
            alias: "Production history",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        
        var url = "http://shoppingfirstclass.com:8080/hana/prod/history?fromDate={0}&toDate={1}";
        
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
                    "good": feat[i].good,
                    "scrap": feat[i].scrap
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
            tableau.connectionName = "Production History"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
