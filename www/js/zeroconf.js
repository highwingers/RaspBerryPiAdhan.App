var discover = (function () {

    var services=[]


    function getServices(appendToDiv) {
        serviceScan(appendToDiv);
        //setInterval(function () {
        //    zeroconf.reInit();
        //    serviceScan(appendToDiv);
        //}, 2000)
    }

    function displayServices(div, service) {
        console.log(service)
        if (service.ipv4Addresses[0] != undefined) {
            if (!services.includes(service.name)) {
                div.innerHTML += '<p><a href="http://' + service.ipv4Addresses + ':' + service.port + '" class="btn btn-outline-success"> ' + service.name + '</a> </p>';
                services.push(service.name)
            }
        }
       
        
    }

    function serviceScan(appendToDiv) {

        var zeroconf = cordova.plugins.zeroconf;
        zeroconf.registerAddressFamily = 'ipv4';
        zeroconf.watchAddressFamily = 'ipv4';

        var div = document.getElementById(appendToDiv);

        zeroconf.watch('_http._tcp.', 'local.', function (result) {
            var action = result.action;
            var service = result.service;
            if (action == 'resolved') {
                console.log('service resolved', service);
                displayServices(div, service)
                //displayServices(div, service)
                /* service : {
                'domain' : 'local.',
                'type' : '_http._tcp.',
                'name': 'Becvert\'s iPad',
                'port' : 80,
                'hostname' : 'ipad-of-becvert.local',
                'ipv4Addresses' : [ '192.168.1.125' ],
                'ipv6Addresses' : [ '2001:0:5ef5:79fb:10cb:1dbf:3f57:feb0' ],
                'txtRecord' : {
                    'foo' : 'bar'
                } */
            }
            else {
                //erase(service)
            }
        });

        setTimeout(function () {
            zeroconf.close();
            serviceScan(appendToDiv)
        }, 6000)

        
    }

    return {
        getServices: getServices
    }

})();


//discover.getServices("display");

