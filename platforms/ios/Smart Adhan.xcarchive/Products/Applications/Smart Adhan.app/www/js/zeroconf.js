var discover = (function () {

    var _obj = {
        services: [],
        divAppended:0
    }




    function getServices(appendToDiv) {
        serviceScan(appendToDiv);

    }

    function displayServices(div, service) {



        if (service.ipv4Addresses[0] != undefined) {
            if ((!_obj.services.includes(service.name)) && service.name.toLowerCase().indexOf("adhan") >= 0) {
                div.innerHTML += '<p><a href="http://' + service.ipv4Addresses + ':' + service.port + '" class="btn btn-warning btn-rounded btn-block btn-lg"> <span class="glyphicon glyphicon-home"></span>' + service.name + '</a> </p>';
                _obj.services.push(service.name)
                document.getElementById("search-devices").style.display = "none";
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

        //if (_obj.services.length>0) {
        //    if (_obj.divAppended==0) {
        //        devicesFound(div)
        //        _obj.divAppended = 1;
        //    }
        //}


        setTimeout(function () {
            zeroconf.close();
            serviceScan(appendToDiv)
        }, 3000)

        
    }

    function devicesFound(d) {

        document.getElementById("search-devices").style.display = "none";
        var node = document.createElement("DIV");                 // Create a <li> node
        var textnode = document.createTextNode("Device(s) Found.");
        node.appendChild(textnode)
        d.append(node);


    }

    return {
        getServices: getServices
    }

})();


//discover.getServices("display");

