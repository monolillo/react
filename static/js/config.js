
//var BACKEND_URI = 'http://localhost:8080/rest'
var BACKEND_URI = 'http://neorisrest.us-east-1.elasticbeanstalk.com'
var WEBSOCKET_ENDPOINT = BACKEND_URI + "/chat";    
var WEBSOCKET_TOPIC = '/topic/assets';    

layerInfoList = [
    {
        type : "person",
        name : "Workers",
        warningName : "Skill Mismatch",
        dotColor: [66, 133, 244],   //Blue
        warningDotColor: [226, 119, 40],
        icon : "/static/BlueIconFixed.png",
        warningIcon : "/static/RedPersonIcon.png",
        template : "<div> \
                    <div class='leftColumn'> \
                        <img style='max-width: 100%' src='${asset.imageUrl}' /> \
                    </div> \
                    <div class='rightColumn'> \
                        <p class='medText'> ${asset.name} </p> \
                        <p class='niceText'>${asset.role}<br> \
                            Current Task: ${asset.task}<br> \
                            ${asset.status}<br> \
                            Vibration: <br>\
                            &nbsp;&nbsp;&nbsp;&nbsp;PkX: <span id='pkX'>${pkX}</span><br> \
                            &nbsp;&nbsp;&nbsp;&nbsp;PkY: <span id='pkY'>${pkY}</span><br> \
                            &nbsp;&nbsp;&nbsp;&nbsp;PkZ: <span id='pkZ'>${pkZ}</span><br> \
                            Longitude: ${asset.location.longitude}<br> \
                            Latitude: ${asset.location.latitude}<br> \
                            Mode: ${asset.location.mode} / Accuracy: ${asset.location.accuracy} \
                        </p> \
                    </div> \
                </div>"
    },
    {
        type : "machine",
        name : "Machinery",
        warningName : "Emergency",
        dotColor: [6, 158, 45],     //Green
        warningDotColor: [226, 119, 40],
        icon : "/static/IconLiftFixed.png",
        warningIcon : "/static/IconWarningFixed.png",
        template : "<div id='popup_${asset.id}'> \
                    <div class='leftColumn'> \
                        <img style='max-width: 100%' src='${asset.imageUrl}' /> \
                    </div><div class='rightColumn'> \
                        <p class='niceText'> ${asset.name} </p> \
                        <div class='smallText'> \
                            Last Command: <span style='font-weight: bold'></span><br> \
                            Temperature: <span id='temp' style='font-weight: bold'> 18&deg;C</span><br> \
                            Vibration: \
                            <div style='font-weight: bold; margin-left: 3em'> \
                                TOTAL: <span id='vibration'></span><br> \
                                PkX: <span id='pkX'>${pkX}</span><br> \
                                PkY: <span id='pkY'>${pkY}</span><br> \
                                PkZ: <span id='pkZ'>${pkZ}</span><br> \
                            </div> \
                            Status: <span id='running' style='font-weight: bold'>RUNNING</span> <br> \
                            Longitude: ${asset.location.longitude}<br> \
                            Latitude: ${asset.location.latitude}<br> \
                            Id: ${asset.id}<br> \
                            Mode: / Accuracy: \
                        </div> \
                        <div onClick=\"javascript:clearAlert(${asset.id})\" class='button'>Clear Alert</div> \
                    </div> \
                </div>"
    },
    {
        type : "tool",
        name : "Tools",
        dotColor: [153, 109, 181],  //Purple
        icon : "/static/IconWrenchFixed.png",
        template : "<div id='popup_${asset.id}'> \
                    <div class='leftColumn'> \
                        <img style='max-width: 100%' src='${asset.imageUrl}' /> \
                    </div><div class='rightColumn'> \
                        <p class='niceText'> ${asset.name} </p> \
                        <div class='smallText'> \
                            Temperature: <span id='temp' style='font-weight: bold'>15&deg;C</span><br> \
                            Longitude: ${asset.location.longitude}<br> \
                            Latitude: ${asset.location.latitude}<br> \
                            Id: ${asset.id}<br> \
                            Mode: <span id='temp' style='font-weight: bold'>PLS</span> / Accuracy: <span id='temp' style='font-weight: bold'>5 meters</bold>\
                        </div> \
                        <div onClick=\"javascript:clearAlert(${asset.id})\" class='button'>Clear Alert</div> \
                    </div> \
                </div>"
    },
    {
        type : "truck",
        name : "Trucks",
        dotColor: [4, 108, 31],  //Dark Green
        icon : "/static/IconTruckFixed.png",
        template : "<div id='popup_${asset.id}'> \
                    <div class='leftColumn'> \
                        <img style='max-width: 100%' src='${asset.imageUrl}' /> \
                    </div><div class='rightColumn'> \
                        <p class='niceText'> ${asset.name} </p> \
                        <div class='smallText'> \
                            Temperature: <span id='temp' style='font-weight: bold'> ${asset.sensors.temp}&deg;C</span><br> \
                            From: <span style='font-weight: bold'>Kinston, NC</span> To: <span style='font-weight: bold'>Mooresville, NC</span><br> \
                            Longitude: ${asset.location.longitude}<br> \
                            Latitude: ${asset.location.latitude}<br> \
                            Id: ${asset.id}<br> \
                            Mode: ${asset.location.mode} / Accuracy: ${asset.location.accuracy} \
                        </div> \
                        <div onClick=\"javascript:clearAlert(${asset.id})\" class='button'>Clear Alert</div> \
                    </div> \
                </div>"
    }      
]

summaryLayerInfo = {

    icon : "/static/EluxLogo.png",
    template : "<div class='leftColumn'> \
                  <img style='max-width: 100%' src='${place.imageUrl}' /> \
                  </div> \
                  <div class='rightColumn'> \
                    <p class='medText' style='padding-top: 5px; padding-bottom: 10px'> ${place.name} </p> \
                    <table class='niceText'> \
                        <tr><td><img src='/static/BlueIcon.png' width='25px' /></td> \
                            <td class='labels'>OnLine Workers:</td> \
                            <td>${placeStats.active}</td></tr> \
                        <tr><td><img src='/static/IconWarningBlue.png' width='25px' /></td> \
                            <td class='labels'>Mismatches:</td> \
                            <td>${placeStats.mismatch}</td></tr> \
                        <tr><td><img src='/static/IconWarning.png' width='25px' /></td> \
                            <td class='labels'>Emergencies:</td> \
                            <td>${placeStats.emergencies}</td></tr> \
                    </table> \
                  </div>"

}

pathLayerInfo = {

    template : "<div class='leftColumn'> \
                  <img style='max-width: 100%' src='${asset.imageUrl}' /> \
                  </div> \
                  <div class='rightColumn'> \
                    <p class='medText' style='padding-top: 5px; padding-bottom: 10px'> At this location </p> \
                    <table class='niceText'> \
                        <tr><td>At  </td> \
                            <td class='labels'>${time}</td> \
                            <td></td></tr> \
                    </table> \
                  </div>"

}
