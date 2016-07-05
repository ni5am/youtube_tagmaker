var app = angular.module('window_app', ['ngStorage']);

app.controller('windowCtrl', ['$scope', '$localStorage', function ($scope, $localStorage) {

    var presets = $localStorage.presets;

    $scope.presets = presets;

    var activePreset = presets[$localStorage.activePreset];
    activePreset.start = "";
    activePreset.end = "";

    var url = localStorage.getItem('url');

    var re = new RegExp("(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch(?:\.php)?\?.*v=([a-zA-Z0-9\-_]+)");
    if (re.test(url)) {
        $scope.tag = makeTag(url, activePreset);
        $scope.noShow = true;
    } else {
        $scope.noShow = false;
    }

    $scope.select = function(index) {
        if($localStorage.activePreset != null)
            $scope.presets[$localStorage.activePreset].active = "";

        $scope.presets[index].active = "active";

        $localStorage.activePreset = index;

        activePreset = presets[index];

        $scope.updateStart();
        $scope.updateEnd();

        $scope.tag = makeTag(localStorage.getItem('url'), activePreset);
    };


    $scope.updateStart = function() {

        var startTime = $scope.start;

        if(startTime != null)
            activePreset.start = time2int(startTime);

        $scope.tag = makeTag(localStorage.getItem('url'), activePreset);
    };

    $scope.updateEnd = function() {

        var endTime = $scope.end;

        if(endTime != null)
            activePreset.end = time2int(endTime);

        $scope.tag = makeTag(localStorage.getItem('url'), activePreset);
    };


}]);

function time2int(time){

    var timeSplited = [];

    if(time > 0){ // 숫자 필터로 넣었는데.. 흠
        return time*60;
    }else{
        timeSplited = time.split(":");

        var min = timeSplited[0]*60;
        var sec = timeSplited[1]*1;

        var time = min + sec;

        return time;
    }


}

function makeTag(url, preset){
    var width, height, private, version, vq = "", theme = "", autohide = "", controls = "", autoplay = "", loop = "", rel = "", showinfo = "", iv_load_policy= "", cc_load_policy = "", disablekb = "", modestbranding = "", fs = "", start = "", end = "";

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

    if(preset.loop == "1") // 반복재생이 있을경우 playlist가 필요하다.
        loop += "&playlist=1";

    if(preset.rel != "1")
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

    if(preset.start != "" && isNaN(preset.start) != true )
        start = "&start="+preset.start;

    if(preset.end != "" && isNaN(preset.end) != true )
        end = "&end="+preset.end;

    var param = version+vq+theme+autohide+controls+autoplay+loop+rel+showinfo+iv_load_policy+cc_load_policy+disablekb+modestbranding+fs+start+end;
    var tag;
    //html5처리안함

    var v = gup("v", url);

    if(preset.tagType == "iframe"){
        tag = '<iframe title="YouTube video player" class="youtube-player" type="text/html"  width="'+width+'" height="'+height+'" src="//'+private+'/embed/'+v+'?'+param+'" frameborder="0" allowfullscreen></iframe>';
    }else if(preset.tagType == "embed"){
        tag = '<object width="'+width+'" height="'+height+'"><param name="movie" value="//'+private+'/v/'+v+'?'+param+'"><param name="allowFullScreen" value="true"><param name="allowscriptaccess" value="always"><embed src="//'+private+'/v/'+v+'?'+param+'" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="'+width+'" height="'+height+'"></object>';

    }

    return tag;
}

function gup( name, url ) {
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( url );
    return results == null ? null : results[1];
}

