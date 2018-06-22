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
            id: "metric",
            alias: "metric",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "min",
            alias: "min",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "peak",
            alias: "peak",
            dataType: tableau.dataTypeEnum.float
        }, {
            id: "avg",
            alias: "avg",
            dataType: tableau.dataTypeEnum.float
        }];

        var tableSchema = {
            id: "metricHistoryFeed",
            alias: "Metric history",
            columns: cols
        };

        schemaCallback([tableSchema]);
    };

    // Download the data
    myConnector.getData = function(table, doneCallback) {
        
        var url = "http://shoppingfirstclass.com:8080/thing/{0}/history?metric={1}&minutes={2}";
        
        url = url.replace("{0}", $.urlParam('thingId'));
        url = url.replace("{1}", $.urlParam('metric'));
        url = url.replace("{2}", $.urlParam('minutes'));
        
        $.getJSON(url, function(resp) {
            var feat = resp,
                tableData = [];

            // Iterate over the JSON object
            for (var i = 0, len = feat.length; i < len; i++) {
                tableData.push({
                    //Tableau ignores standards
                    //So we change 2017-04-27T19:31:30.883000 to look like 2017-04-27 19:31:30.883
                    "timestamp": feat[i].keyAsString.replace(/T/g,' ').replace(/Z/g,' '),
                    "metric": feat[i].metric,
                    "min": feat[i].min,
                    "peak": feat[i].peak,
                    "avg": feat[i].avg
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
            tableau.connectionName = "Metric History"; // This will be the data source name in Tableau
            tableau.submit(); // This sends the connector object to Tableau
        });
    });
})();
