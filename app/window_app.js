var app = angular.module('window_app', ['ngStorage']);

app.controller('windowCtrl', ['$scope', '$localStorage', function ($scope, $localStorage) {

    var v = gup("v", localStorage.getItem('url'));

    var preset = $localStorage.presets[$localStorage.activePreset];
    var width, height, private, version, vq = "", theme = "", autohide = "", controls = "", autoplay = "", loop = "", rel = "", showinfo = "", iv_load_policy= "", cc_load_policy = "", disablekb = "", modestbranding = "", fs = "";

    if(preset.selectSize == "select"){
        width = preset.customWidth;
        height = preset.customHeight;
    }else if(preset.selectSize == "auto"){
        width = "100%";
        height = "100%";
    }else {
        var selectSize = preset.selectSize.split(",");
        width = selectSize[0];
        height = selectSize[1];
    }

    private = preset.private;

    version = "version="+preset.version;

    if(preset.vq != "auto")
        vq = "&vq="+preset.vq;

    if(preset.theme == "light")
        theme = "&theme="+preset.theme;

    if(preset.autohide != "2")
        autohide = "&autohide="+preset.autohide;

    if(preset.controls != "1")
        controls = "&controls="+preset.controls;

    if(preset.autoplay != "0")
        autoplay = "&autoplay="+preset.autoplay;

    if(preset.loop != "0")
        loop = "&loop="+preset.loop;

    if(preset.rel != "0")
        rel = "&rel="+preset.rel;

    if(preset.showinfo != "1")
        showinfo = "&showinfo="+preset.showinfo;

    if(preset.iv_load_policy != "1")
        iv_load_policy = "&iv_load_policy="+preset.iv_load_policy;

    if(preset.cc_load_policy != "0")
        cc_load_policy = "&cc_load_policy="+preset.cc_load_policy;

    if(preset.disablekb != "0")
        disablekb = "&disablekb="+preset.disablekb;

    if(preset.modestbranding != "0")
        modestbranding = "&modestbranding="+preset.modestbranding;

    if(preset.fs != "1")
        fs = "&fs="+preset.fs;

    var param = version+vq+theme+autohide+controls+autoplay+loop+rel+showinfo+iv_load_policy+cc_load_policy+disablekb+modestbranding+fs;
    var tag;
    //html5처리안함

    if(preset.tagType == "iframe"){
        tag = '<iframe title="YouTube video player" class="youtube-player" type="text/html"  width="'+width+'" height="'+height+'" src="//'+private+'/embed/'+v+'?'+param+'" frameborder="0" allowfullscreen></iframe>';
    }else if(preset.tagType == "embed"){
        tag = '<object width="'+width+'" height="'+height+'"><param name="movie" value="http://'+private+'/v/'+v+'?'+param+'"><param name="allowFullScreen" value="true"><param name="allowscriptaccess" value="always"><embed src="'+private+'/v/'+v+'?'+param+'" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="'+width+'" height="'+height+'"></object>';

    }

    $scope.tag = tag;
}]);

function gup( name, url ) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}