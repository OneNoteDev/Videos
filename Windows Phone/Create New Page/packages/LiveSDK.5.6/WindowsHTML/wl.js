﻿(function(){if(!window.WL){var Hf="download",o="interface_method",Yd="WL.Internal.jsonp.",Ke=2000,gc="body",L="callback",hc="code",Xe="element",cc="error",Be="error_description",Sb="logging",nd="tracing",Tb="message",w="method",Ob="file_input",Wc="stream_input",T="file_name",S="file_output",p="overwrite",r="path",ud="pretty",ff="result",gf="status",Vc="return_ssl_resources",Pe="success",hf="error",Pc="suppress_redirects",zb="suppress_response_codes",u="x_http_live_library",dc=0,Jb=1,b="access_token",Lf="appstate",s="authentication_token",nc="client_id",Nf="display",Sd="code",k="error",Z="error_description",rc="expires",kc="expires_in",Pf="locale",bc="redirect_uri",td="response_type",yf="request_ts",I="scope",Kd="session",ef="secure_cookie",Pd="state",y="status",sf=[b,s,I,kc,rc],C="connected",zd="notConnected",If="unchecked",bb="unknown",Id="expiring",Of="expired",ec="live-sdk-upload",Vb="live-sdk-download",Qf="appId",Af="channelUrl",Mf="wl_auth",Bf="wl_upload",Hd="page",Cf="touch",D="none",jf="none",Zb="auth.login",Wb="auth.logout",hb="auth.sessionChange",Hb="auth.statusChange",uc="wl.log",A="access_denied",ne="connection_failed",Re="invalid_cookie",Mb="invalid_request",nb="request_canceled",h="request_failed",Dd="timed_out",lb="unknown_user",Le="user_canceled",ie="METHOD: Failed to get the required user permission to perform this operation.",je="The request could not be completed due to browser issues.",ke="The request could not be completed due to browser limitations.",mb="METHOD: The operation has been canceled.",fe="The 'wl_auth' cookie is not valid.",ee="The 'wl_auth' cookie has been modified incorrectly. Ensure that the redirect URI only modifies sub-keys for values received from the OAuth endpoint.",ae="The 'wl_auth' cookie has multiple values. Ensure that the redirect URI specifies a cookie domain and path when setting cookies.",Rc="METHOD: The input property 'PARAM' does not reference a valid DOM element.",Yc="METHOD: An exception was received for EVENT. Detail: MESSAGE",Sc="METHOD: The WL object must be initialized with WL.init() prior to invoking this method.",Nc="A connection to the server could not be established.",de="The user could not be identified.",oe="The pending login request has been canceled.",Bc="Logging out the user is not supported in current session because the user is logged in with a Microsoft account on this computer. To logout, the user may quit the app or log out from the computer.",Jc="METHOD: The input value for parameter/property 'PARAM' is not valid.",Kc="METHOD: The input parameter/property 'PARAM' must be included.",Cc="METHOD: The type of the provided value for the input parameter/property 'PARAM' is not valid.",eb="METHOD: There is a pending METHOD request, the current call will be ignored.",xb=eb.replace(/METHOD/g,"WL.login"),Wd=eb.replace(/METHOD/g,"WL.fileDialog"),Zd=eb.replace(/METHOD/g,"WL.upload"),ce="METHOD: The input property 'redirect_uri' is required if the value of the 'response_type' property is 'code'.",yc="WL.init: The redirect_uri value should be the same as the value of 'Redirect Domain' of your registered app. It must begin with 'http://' or 'https://'.",be="METHOD: The api call is not supported on this platform.",xc="WL.init: The response_type value 'code' is not supported on this platform.",Se="METHOD: The input property 'redirect_uri' must use https: to match the scheme of the current page.",le="The auth request is timed out.",qe="The popup is closed without receiving consent.",Ye=0,ge=1,me=2,Te=3,W="GET",wd="POST",Bd="PUT",kd="DELETE",kf="COPY",lf="MOVE",pe=30000,Ud="METHOD",f="onSuccess",g="onError",n="onProgress",Df="redirect_type",Ue="auth",Ee="upload",Ve="code",Me="token",sb="https:",vb="http:",E="wl.signin",tf="wl.skydrive",ve="wl.skydrive_update",Xb=/\s|,/,ab="boolean",Rf="dom",j="function",Jd="number",c="string",G="object",Rb="string_or_array",pb="undefined",Ff="name",of="element",vf="brand",Gf="type",we="sign_in_text",re="sign_out_text",wf="theme",Oe="onloggedin",Ge="onloggedout",pf="onerror",We="messenger",mf="hotmail",cf="skydrive",nf="windows",Fe="windowslive",Ef="none",Od="signin",Ae=Od,Je="login",se="connect",ze="custom",He="blue",ye="white",Ie="dark",xe="light",qf="id",xf="auth_server",df="apiservice_uri",rf="skydrive_uri",qc="sdk_root",Sf="wl_trace";window.WL={getSession:function(){try{return a.getSession()}catch(b){O(b.message)}},getLoginStatus:function(){try{return a.getLoginStatus({callback:Qb(arguments,j,2),internal:false},Qb(arguments,ab,2))}catch(d){return l("WL.getLoginStatus",d)}},logout:function(b){try{Y(b,z,"WL.logout");return a.logout({callback:b})}catch(c){return l("WL.logout",c)}},canLogout:function(){return a.canLogout()},api:function(){try{var b=Xc(arguments);M(b,[{name:r,type:c,optional:false},{name:w,type:c,optional:true},z],"WL.api");return a.api(b)}catch(f){return l("WL.api",f)}}};var lc=[Zb,Wb,hb,Hb,uc];WL.Event={subscribe:function(b,a){try{Y([b,a],[{name:"event",type:c,allowedValues:lc,caseSensitive:true,optional:false},Gc],"WL.Event.subscribe");d.subscribe(b,a)}catch(e){O(e.message)}},unsubscribe:function(b,a){try{Y([b,a],[{name:"event",type:c,allowedValues:lc,caseSensitive:true,optional:false},z],"WL.Event.unsubscribe");d.unsubscribe(b,a)}catch(e){O(e.message)}}};WL.Internal={};var d={subscribe:function(a,b){t("Subscribe "+a);var c=d.getHandlers(a);c.push(b)},unsubscribe:function(c,f){t("Unsubscribe "+c);var b=d.getHandlers(c),e=[];if(f!=null){var g=false;for(var a=0;a<b.length;a++)if(g||b[a]!=f)e.push(b[a]);else g=true}d._eHandlers[c]=e},getHandlers:function(b){if(!d._eHandlers)d._eHandlers={};var a=d._eHandlers[b];if(a==null)d._eHandlers[b]=a=[];return a},notify:function(c,e){t("Notify "+c);var b=d.getHandlers(c);for(var a=0;a<b.length;a++)b[a](e)}},a={_status:dc,_statusRequests:[],_rpsAuth:false};a.appInit=function(c){if(a._status==Jb){var e=a._session.getNormalStatus();return K("WL.init",true,c.callback,e)}var b=WL[qc];if(b){if(b.charAt(b.length-1)!=="/")b+="/";a[qc]=b}var d=c[Sb];if(d===false)a._logEnabled=d;if(a.testInit)a.testInit(c);a._status=Jb;return Mc(c)};a.onloadInit=function(){Cd();Fd()};function x(b){if(a._status===dc)throw new Error(Sc.replace("METHOD",b))}function wb(){return WL.Internal.tApp||a}a.api=function(a){x("WL.api");var c=a[gc];if(c){a=F(ob(c),a);delete a[gc]}var b=a[w];a[w]=(b!=null?H(b):W).toUpperCase();return (new sc(a)).execute()};var Zc=function(){var b=a.api.lastId,c;b=b===undefined?1:b+1;c="WLAPI_REQ_"+b+"_"+(new Date).getTime();a.api.lastId=b;return c},sc=function(b){var c=this;c._properties=b;c._completed=false;c._id=Zc();b[ud]=false;b[Vc]=a._isHttps;b[u]=a[u];var d=b[r];c._url=ac()+(d.charAt(0)==="/"?d.substring(1):d);c._promise=new e("WL.api",null,null)};sc.prototype={execute:function(){qd(this);return this._promise},onCompleted:function(a){if(this._completed)return;this._completed=true;m(this._properties.callback,a,true);if(a[k])this._promise[g](a);else this._promise[f](a)}};function ld(e,c,a,d){a=a?H(a):"";var b=a!==""?fc(a):null;if(b===null){b={};if(c/100!==2)b[cc]=pd(c,d)}e.onCompleted(b)}function pd(c,b){var a={};a[hc]=h;a[Tb]=b||Nc;return a}function Nb(){var d=null;if(!a._rpsAuth){var c=wb()._session.getStatus();if(c.status===Id||c.status===C)d=c.session[b]}return d}function ob(i){var c={};for(var b in i){var a=i[b],j=typeof a;if(a instanceof Array)for(var d=0;d<a.length;d++){var f=a[d],l=typeof f;if(j==G&&!(a instanceof Date)){var h=ob(f);for(var e in h)c[b+"."+d+"."+e]=h[e]}else c[b+"."+d]=f}else if(j==G&&!(a instanceof Date)){var k=ob(a);for(var g in k)c[b+"."+g]=k[g]}else c[b]=a}return c}function ad(c){if(!Qd())return false;var b=sd(c),a=new XMLHttpRequest;a.open(b.method,b.url,true);var d=c._properties[w];if(b.method!=W)a.setRequestHeader("Content-Type","application/x-www-form-urlencoded");a.onreadystatechange=function(){if(a.readyState==4)ld(c,a.status,a.responseText)};a.send(b.body);return true}function sd(e){var a=od(e._properties,null,[L,r,w]),f=e._properties[w],g=Pb(e._url,{"ts":(new Date).getTime()}),h=Nb(),d,c;a[Pc]="true";a[zb]="true";if(h!=null)a[b]=h;if(f===W||f===kd){d=null;c=W;g+="&"+kb(a)}else{d=kb(a);c=wd}g+="&method="+f;return {url:g,method:c,body:d}}a.download=function(a){Fc(a);x("WL.download");return (new U(a)).execute()};a.createDownload=function(b){b.create=true;return a.download(b)};function Kb(c,f){var d=f||{},g=ac();if(!qb(c))c=g+(c.charAt(0)==="/"?c.substring(1):c);var e=Nb();if(e)d[b]=e;d[u]=a[u];return Pb(c,d)}function Bb(a,b){b.downloadComplete(false,q(h,"WL.download: "+a))}var Ab="notStarted",jb="ready",cb="downloadCompleted",yb="downloadFailed",Cb="canceled",Ec="completed";function U(a){this._properties=a;this._status=Ab;this.started=a.started}U.prototype={attach:function(){var a=this;a._status=jb;return this.execute()},execute:function(){this._promise=new e("WL.download",this,null);this._process();return this._promise},cancel:function(){this._status=Cb;if(this._cancel)try{this._cancel()}catch(a){}else{this._result=q(nb,mb.replace("METHOD","WL.download"));this._process()}},downloadComplete:function(b,c){var a=this;a._result=c;a._status=b?cb:yb;a._process()},downloadProgress:function(a){this._promise[n](a)},_process:function(){switch(this._status){case Ab:this._start();break;case jb:this._download();break;case cb:case yb:case Cb:this._complete()}},_start:function(){var b=this;a.getLoginStatus({internal:true,callback:function(){b._status=jb;b._process()}})},_download:function(){var a=this;Ad(a)},_complete:function(){var a=this,c=a._result,d=a._status===cb?f:g;a._status=Ec;var b=a._properties[L];if(b)b(c);a._promise[d](c)}};a.login=function(b,d){x("WL.login");dd(b);if(!jd(d))return K("WL.login",false,null,q(h,xb));var c=a._session.tryGetResponse(b.normalizedScope);if(c!=null)return K("WL.login",true,b.callback,c);a._pendingLogin=id(b,Tc);return a._pendingLogin.execute()};function Tc(c,b){a._pendingLogin=null;var d=b[k];if(d)J("WL.login: "+b[Z]);else m(c.callback,b,true)}function ed(b){var a=b||"";if(a instanceof Array)a=a.join(" ");return H(a)}a.getSession=function(){x("WL.getSession");return a._session.getStatus()[Kd]};a.getLoginStatus=function(b,f){x("WL.getLoginStatus");b=b||{};if(!f){var d=a._session.tryGetResponse();if(d)return K("WL.getLoginStatus",true,b.callback,d)}t("wl_app:getLoginStatus");var e=a._statusRequests,c=null;if(!a._pendingStatusRequest){c=Ic(b,Hc);a._pendingStatusRequest=c}e.push(b);if(c!=null)c.execute();return a._pendingStatusRequest._promise};function Hc(h,b){var f=a._statusRequests;a._pendingStatusRequest=null;t("wl_app:onGetLoginStatusCompleted");var d=b[k],e=false;while(f.length>0){var c=f.shift(),g=F(b);if(!d||c.internal)m(c.callback,g,true);if(!c.internal)e=true}if(d)if(e&&d!==Dd)J("WL.getLoginStatus: "+b[Z]);else t("wl_app-onGetLoginStatusCompleted: "+b[Z])}a.logout=function(i){var b="WL.logout";x(b);var d=new e(b,null,null),c=function(c){ub(function(){var e,h=f;if(c){O(c.message);h=g;e=ib(b,b,c)}else e=a._session.getNormalStatus();m(i.callback,e,false);d[h](e)})},h=function(){var b=a._session;if(b.isSignedIn())if(a.canLogout()){b.updateStatus(bb);rd(c)}else c(new Error(Bc));else c()};if(a._pendingStatusRequest!=null)a.getLoginStatus({internal:true,callback:h},false);else h();return d};a.upload=function(a){var b=a[o];x(b);M(a,[{name:r,type:c,optional:false},z],b);Ac(a);Oc(a);return (new N(a)).execute()};a.createUpload=function(b){b.create=true;return a.upload(b)};function Oc(a){var b=a[Ob],c=a[T];if(b)a[T]=c||b.name}function Dc(a,h,i){var c=a.indexOf("?"),e=c!==-1,g="";if(e){g=a.substring(c+1);a=a.substring(0,c)}var f=typeof h!==pb,j=a.charAt(a.length-1)==="/";if(f&&!j)a+="/";var b=a,d={};if(f)b+=encodeURIComponent(h);if(i==="rename")d[p]="choosenewname";else d[p]=i;if(e)b=Ub(b,g);return gb(b,d)}function Nd(a){return /^(file|\/file)/.test(a.toLowerCase())}function gb(b,a){a=a||{};a[zb]="true";return Kb(b,a)}function Ac(a){if(p in a){var b=a[o],d=a[p],f=typeof d,h=f===ab,e=f===c;if(!(h||e))throw v(p,b);if(e){var g=/^(true|false|rename)$/i.test(d);if(!g)throw Fb(p,b)}}else a[p]=false}var Db=0,Eb=1,R=2,fb=3,P=4,Ib=5,Lc=6;function N(a){this._props=a;this._status=Db;this.started=a.started}N.prototype={attach:function(){var a=this;a._status=R;return this.execute()},execute:function(){var a=this;a._strategy=a._getStrategy(a._props);a._promise=new e(a._props[o],a,null);a._process();return a._promise},cancel:function(){var a=this;a._status=Ib;if(a._cancel)try{a._cancel()}catch(c){}else{var b=mb.replace(Ud,a._props[o]);a._result=q(nb,b);a._process()}},uploadProgress:function(a){this._promise[n](a)},uploadComplete:function(b,c){var a=this;a._result=c;a._status=b?fb:P;a._process()},onErr:function(c){var a=this._props[o]+":"+c,b=q(h,a);this.uploadComplete(false,b)},onResp:function(a){a=a?H(a):"";var b=a!==""?fc(a):null;b=b||{};this.uploadComplete(b.error==null,b)},setFileName:function(a){this._props[T]=a},_process:function(){switch(this._status){case Db:this._start();break;case Eb:this._getUploadPath();break;case R:this._upload();break;case fb:case P:case Ib:this._complete()}},_start:function(){var a=this;wb().getLoginStatus({internal:true,callback:function(){a._status=Eb;a._process()}})},_getUploadPath:function(){var a=this,c=a._props,b=c[r];if(qb(b)){a._uploadPath=gb(b);a._status=R;a._process();return}wb().api({path:b}).then(function(i){var d=i.upload_location;if(d){var e=yd(b);d=Ub(d,e);var f=c[T],g=c[p];if(Nd(b))a._uploadPath=gb(d);else a._uploadPath=Dc(d,f,g);a._status=R}else{a._result=q(h,"WL.upload: Failed to get upload_location of the resource.");a._status=P}a._process()},function(b){a._result=b;a._status=P;a._process()})},_upload:function(){this._strategy.upload(this._uploadPath)},_complete:function(){var a=this,c=a._result,d=a._status===fb?f:g;a._status=Lc;var b=a._props[L];if(b)b(c);a._promise[d](c)}};function H(a){return a.replace(/^\s+|\s+$/g,"")}function F(b,d){var c=d||{};if(b!=null)for(var a in b)c[a]=b[a];return c}function od(e,d,b){var c=F(e,d);for(var a=0;a<b.length;a++)delete c[b[a]];return c}function Ld(d,e){var c=[],b={},a=function(d){for(var a=0;a<d.length;a++){arrElm=d[a];if(arrElm!=""&&!b[arrElm]){b[arrElm]=true;c.push(arrElm)}}};a(d);a(e);return c}function tc(a){return Array.prototype.slice.call(a)}function X(b,a){return function(){if(typeof a===j)return a.apply(b,arguments)}}function wc(a,e){a="[WL]"+a;var b=window.console;if(b&&b.log)switch(e){case "warning":b.warn(a);break;case "error":b.error(a);break;default:b.log(a)}var d=window.opera;if(d)d.postError(a);var c=window.debugService;if(c)c.trace(a)}function qb(a){return a.indexOf("https://")===0||a.indexOf("http://")===0}function t(b){if(a._traceEnabled)wc(b)}function J(b,c){if(a._logEnabled||a._traceEnabled)wc(b,c);d.notify(uc,b)}if(window.WL&&WL.Internal){WL.Internal.trace=t;WL.Internal.log=J}function O(a){J(a,"error")}function jc(a){return document.getElementById(a)}function yd(b){var a=b.indexOf("?");if(a===-1)return "";var c=b.indexOf("#",a+1);if(c!==-1)return b.substring(a+1,c);return b.substring(a+1)}function Ub(a,b){if(typeof b===pb||b===null||b==="")return a;var c=a.indexOf("?");if(c===-1)return a+"?"+b;if(a.charAt(a.length-1)!=="&")a+="&";return a+b}function Vd(a){F(vc(a),this)}Vd.prototype={toString:function(){var a=this,b=(a.scheme!=""?a.scheme+"//":"")+a.host+(a.port!=""?":"+a.port:"")+a.path;return b},resolve:function(){var a=this;if(a.scheme==""){var b=window.location.port,c=window.location.host;a.scheme=window.location.protocol;a.host=c.split(":")[0];a.port=b!=null?b:"";if(a.path.charAt(0)!="/")a.path=fd(a.host,window.location.href,a.path)}}};function vc(c){var e=c.indexOf(sb)==0?sb:c.indexOf(vb)==0?vb:"",h="",i="",f;if(e!="")var b=c.substring(e.length+2),a=b.indexOf("/"),g=a>0?b.substring(0,a):b,d=g.split(":"),h=d[0],i=d.length>1?d[1]:"",f=a>0?b.substring(a):"";else f=c;return {scheme:e,host:h,port:i,path:f}}function Gd(a){return vc(a.toLowerCase()).host}function fd(e,b,h){var d=function(a,c){charIdx=b.indexOf(c);a=charIdx>0?a.substring(0,charIdx):a;return a};b=d(d(b,"?"),"#");var f=b.indexOf(e),a=b.substring(f+e.length),g=a.indexOf("/"),c=a.lastIndexOf("/");a=c>=0?a.substring(g,c):a;return a+"/"+h}function m(a,b,d,c){if(a!=null){if(c)b[Pd]=c;if(d)a(b);else ub(function(){a(b)})}}function fc(a){if(window.JSON)return JSON.parse(a);else return eval("("+a+")")}function Td(b,c){var d=b.length;for(var a=0;a<d;a++)c(b[a])}function V(c,b){var a={};a[k]=c;a[Z]=b;return a}function q(d,c){var a={},b={};a[hc]=d,a[Tb]=c;b[cc]=a;return b}function ib(a,b,c){return q(h,Yc.replace("METHOD",a).replace("EVENT",b).replace("MESSAGE",c.message))}function Uc(b){var a=b.split(".");return a[0]+"."+a[1]}function ub(a,b){if(window.wlUnitTests)wlUnitTests.delayInvoke(a);else window.setTimeout(a,b||1)}function Cd(){var b=Ed(navigator.userAgent,document.documentMode),c=a[u];a._browser=b;a[u]=c.replace("DEVICE",b.device)}function Ed(a,e){a=a.toLowerCase();var c="other",b={"firefox":/firefox/.test(a),"firefox1.5":/firefox\/1\.5/.test(a),"firefox2":/firefox\/2/.test(a),"firefox3":/firefox\/3/.test(a),"firefox4":/firefox\/4/.test(a),"ie":(/msie/.test(a)||/trident/.test(a))&&!/opera/.test(a),"ie6":false,"ie7":false,"ie8":false,"ie9":false,"ie10":false,"ie11":false,"opera":/opera/.test(a),"webkit":/webkit/.test(a),"chrome":/chrome/.test(a),"mobile":/mobile/.test(a)||/phone/.test(a)};if(b["ie"]){var d=0;if(e)d=e;else if(/msie 7/.test(a))d=7;d=Math.min(11,Math.max(d,6));c="ie"+d;b[c]=true}else if(b.firefox)c="firefox";else if(b.chrome)c="chrome";else if(b.webkit)c="webkit";else if(b.opera)c="opera";if(b.mobile)c+="mobile";b.device=c;return b}function kb(b){var a="";if(b!=null)for(var c in b){var d=a.length==0?"":"&",e=b[c];a+=d+encodeURIComponent(c)+"="+encodeURIComponent(gd(e))}return a}function gd(a){if(a instanceof Date){var b=function(a,b){switch(b){case 2:return a<10?"0"+a:a;case 3:return (a<10?"00":a<100?"0":"")+a}};return a.getUTCFullYear()+"-"+b(a.getUTCMonth()+1,2)+"-"+b(a.getUTCDate(),2)+"T"+b(a.getUTCHours(),2)+":"+b(a.getUTCMinutes(),2)+":"+b(a.getUTCSeconds(),2)+"."+b(a.getUTCMilliseconds(),3)+"Z"}return ""+a}function Pb(a,b){return a+(a.indexOf("?")<0?"?":"&")+kb(b)}var z={name:L,type:j,optional:true},Gc={name:L,type:j,optional:false};function Y(a,c,d){if(a instanceof Array)for(var b=0;b<a.length;b++)mc(a[b],c[b],d);else mc(a,c,d)}function mc(c,a,b){Yb(c,a,b);if(a.type==="properties")M(c,a.properties,b)}function Yb(f,e,b){var d=e.name,a=typeof f,g=e.type;if(a==="undefined"||f==null)if(e.optional)return;else throw Gb(d,b);switch(g){case "string":if(a!==c)throw v(d,b);if(!e.optional&&H(f)==="")throw Gb(d,b);break;case "properties":if(a!=G)throw v(d,b);break;case "function":if(a!=j)throw v(a,b);break;case "dom":if(a==c){if(jc(f)==null)throw new Error(Rc.replace("METHOD",b).replace("PARAM",d))}else if(a!=G)throw v(d,b);break;case "string_or_array":if(a!==c&&!(f instanceof Array))throw v(a,b);break;default:if(a!==g)throw v(d,b)}if(e.allowedValues!=null)bd(f,e.allowedValues,e.caseSensitive,d,b)}function M(g,c,f){var d=g||{};for(var b=0;b<c.length;b++){var a=c[b],e=d[a.name]||d[a.altName];Yb(e,a,f)}}function bd(d,a,e,f,h){var g=typeof a[0]===c;for(var b=0;b<a.length;b++)if(g&&!e){if(d.toLowerCase()===a[b].toLowerCase())return}else if(d===a[b])return;throw Fb(f,h)}function v(a,b){return new Error(Cc.replace("METHOD",b).replace("PARAM",a))}function Gb(a,b){return new Error(Kc.replace("METHOD",b).replace("PARAM",a))}function Fb(c,d,a){var b=Jc.replace("METHOD",d).replace("PARAM",c);if(typeof a!==pb)b+=" "+a;return new Error(b)}function Qb(b,d,c){if(b)for(var a=0;a<c&&a<b.length;a++)if(d===typeof b[a])return b[a];return undefined}function B(h,g){var e=tc(h),a=null,b=null;for(var d=0;d<e.length;d++){var c=e[d],f=typeof c;if(f===G&&a===null)a=F(c);else if(f===j&&b===null)b=c}a=a||{};if(b)a.callback=b;a[o]=g;return a}function Xc(e){var a=tc(e),d=null,b=null;if(typeof a[0]===c){d=a.shift();if(typeof a[0]===c)b=a.shift()}normalizedArgs=B(a);if(d!==null){normalizedArgs[r]=d;if(b!=null)normalizedArgs[w]=b}return normalizedArgs}function l(a,b){var c=ib(a,a,b);O(b.message);return K(a,false,null,c)}var e=function(b,c,a){this._name=b;this._op=c;this._uplinkPromise=a;this._isCompleted=false;this._listeners=[]};e.prototype={then:function(d,h,c){var b=new e(null,null,this),a={};a[f]=d;a[g]=h;a[n]=c;a.chainedPromise=b;this._listeners.push(a);return b},cancel:function(){if(this._isCompleted)return;if(this._uplinkPromise&&!this._uplinkPromise._isCompleted)this._uplinkPromise.cancel();else{var a=this._op?this._op.cancel:null;if(typeof a===j)this._op.cancel();else this.onError(q(nb,mb.replace("METHOD",this._getName())))}},_getName:function(){if(this._name)return this._name;if(this._op&&typeof this._op._getName===j)return this._op._getName();if(this._uplinkPromise)return this._uplinkPromise._getName();return ""},_onEvent:function(b,a){if(this._isCompleted)return;this._isCompleted=a!==n;this._notify(b,a)},_notify:function(b,a){var c=this;Td(this._listeners,function(i){var j=i[a],d=i.chainedPromise,h=a!==n;if(j)try{var e=j.apply(i,b);if(h&&e&&e.then){d._op=e;e.then(function(a){d[f](a)},function(a){d[g](a)},function(a){d[n](a)})}}catch(k){if(h)d.onError(ib(c._getName(),a,k))}else if(h)d[a].apply(d,b)})}};e.prototype[f]=function(){this._onEvent(arguments,f)};e.prototype[g]=function(){this._onEvent(arguments,g)};e.prototype[n]=function(){this._onEvent(arguments,n)};function K(h,d,b,i){var a=new e(h,null,null),c=d?f:g;if(typeof b===j)a.then(function(a){b(a)});ub(function(){a[c](i)});return a}var sf=[b,s,I,kc,rc],ic="apiservice_uri",oc="auth_server",Xd=-2147023579;WL.init=function(d){try{var b=F(d);Y(b,{name:"properties",type:"properties",optional:false,properties:[{name:I,type:Rb,optional:true},{name:bc,type:c,optional:true},{name:Sb,type:ab,optional:true}]},"WL.init");return a.appInit(b)}catch(e){return l("WL.init",e)}};WL.login=function(){try{var b=B(arguments);M(b,[{name:I,type:Rb,optional:true},z],"WL.login");return a.login(b)}catch(e){return l("WL.login",e)}};WL.backgroundDownload=function(){try{var b="WL.backgroundDownload",c=B(arguments,b);return a.download(c)}catch(f){return l(b,f)}};WL.createBackgroundDownload=function(){try{var b="WL.createBackgroundDownload",c=B(arguments,b);return a.createDownload(c)}catch(f){return l(b,f)}};WL.backgroundUpload=function(){try{var b="WL.backgroundUpload",c=B(arguments,b);return a.upload(c)}catch(f){return l(b,f)}};WL.createBackgroundUpload=function(){try{var b="WL.createBackgroundUpload",c=B(arguments,b);return a.createUpload(c)}catch(f){return l(b,f)}};WL.getCurrentBackgroundDownloads=function(){return a.getCurrentBackgroundDownloads()};WL.getCurrentBackgroundUploads=function(){return a.getCurrentBackgroundUploads()};function Mc(b){a._authScope=ed(b[I]);if(b[td]===Sd)throw new Error(xc);a._isHttps=true;a._authScope=Qc(a._authScope);if(b[nd])a._traceEnabled=true;a._domain=md(b);var d=Windows.Security.Authentication.Web.WebAuthenticationBroker.getCurrentApplicationCallbackUri().absoluteUri;b[nc]=d;a._session=new pc(d);var c=new e("WL.init");a.getLoginStatus({internal:true,callback:function(a){var b=!!a.error?g:f;c[b](a)}},true);return c}function md(c){var a=c[bc],b=null;if(a!=null)if(a.indexOf(vb)===0||a.indexOf(sb)===0)b=Gd(a);else throw new Error(yc);return b}function Fd(){a._logEnabled=true;a._traceEnabled=false;hd(function(){var a=window.wlAsyncInit;if(a&&typeof a===j)a.call()})}function Qc(a){a=a||E;if(a.indexOf(E)<0)a=a+" "+E;return H(a)}function jd(c){var b=a._pendingLogin;if(b!=null){if(!c)J(xb);return false}return true}function dd(d){var b=d[I]||[],e=a._authScope.split(Xb);if(typeof b===c)b=b.split(Xb);d.normalizedScope=Ld(e,b).join(" ")}function id(a,b){return new tb(Hd,a.normalizedScope,a,b)}function Ic(c,b){return new tb(D,a._authScope,c,b)}a.canLogout=function(){return Windows.Security.Authentication.OnlineId.OnlineIdAuthenticator().canSignOut};function rd(a){try{var c=Windows.Security.Authentication.OnlineId,b=new c.OnlineIdAuthenticator,d=b.signOutUserAsync().then(function(){a()},a)}catch(e){J(e);a(e)}}var tb=function(b,g,c,d){var a=this;a._display=b;a._completed=false;a._requestFired=false;a._properties=c;a._callback=d;a._scope=g;var f=b===D?"WL.login":"WL.getLoginStatus";a._promise=new e(f,null,null)};tb.prototype={execute:function(){return this._sendRequest(this._scope)},_sendRequest:function(b){var a=this,d=X(a,a._onResponse),c=Windows.Security.Authentication.OnlineId,e=a._display===D?c.CredentialPromptType.doNotPrompt:c.CredentialPromptType.promptIfNeeded;a._currentScope=b;vd(e,b,d);return a._promise},_onResponse:function(b){var a=this;if(a._display===D&&b[k]===A&&a._currentScope!==E)a._sendRequest(E);else a._onComplete(b)},_onComplete:function(c){var e=this;if(!e._completed){e._completed=true;if(e._display===D&&e._scope===E&&(c[k]===A||c[k]===lb)){var i=c[k]===A?zd:bb;a._session.updateStatus(i)}else a._session.onAuthResponse(c);var h=false,d=a._session.getStatus();if(this._display!==D)if(c[b]==null){h=true;d=c}else a._authScope=this._scope;else if(c[k])switch(c[k]){case lb:case A:break;default:h=true;d=c}this._callback(this._properties,d);if(h)this._promise[g](d);else this._promise[f](d)}}};function vd(g,n,c){var d="The authentication process failed with error: ",e=" To configure your app correctly, please follow the instructions on http://go.microsoft.com/fwlink/?LinkId=220871.",j=-2147023579,i=-2138701812,l=-2138701821,k=-2138701823;try{var f=a._authMethod?a._authMethod:xd;f(g,n,"DELEGATION").then(function(l){var j=l.tickets[0].value,i=null;if(j&&j!=="")if(a._domain)f(g,a._domain,"JWT").then(function(a){var d=a.tickets[0].value;i={};i[b]=j;i[s]=d;m(c,i,false)},function(a){var b=h,f=d+a.message;if(a.name==="WinRTError"&&a.number===k){b=Mb;f+=e}i=V(b,f);m(c,i,false)});else{i={};i[b]=j}else i=V(h,d+"Unable to get access token.");if(i)m(c,i,false)},function(b){var a=h,f=d+b.message;switch(b.name){case "Canceled":a=A;break;case "WinRTError":switch(b.number){case j:a=lb;break;case i:a=A;break;case l:a=Mb;f+=e;break;default:a=h}}var g=V(a,f);m(c,g,false)})}catch(p){var o=V(h,d+p.message);m(c,o,false)}}function xd(c,f,e){var a=Windows.Security.Authentication.OnlineId,b=new a.OnlineIdAuthenticator,d=new a.OnlineIdServiceTicketRequest(f,e);return b.authenticateUserAsync([d],c)}var pc=function(c){var a=this;a._state={};a._state[nc]=c;a._state[y]=bb;a._state[b]=null};pc.prototype={isSignedIn:function(){return this._state[y]===C},getStatus:function(){var a=null,c=this._state[y];if(c===C){a={};a[b]=this._state[b];a[s]=this._state[s]}return {status:c,session:a}},getNormalStatus:function(){return this.getStatus()},updateStatus:function(a){var c=this._state[y],e=this._state[b];if(c!=a){this._state[y]=a;this._stateDirty=true;this.onStatusChanged(c,a);if(e!=this._state[b])d.notify(hb,this.getNormalStatus())}},tryGetResponse:function(){return null},onAuthResponse:function(i){var g=false,a=this._state,h=a[y],c=i[b],e=i[s];if(c&&a[b]!=c||e&&a[s]!=e){a[b]=c;a[s]=e;g=true}var f=a[b]?C:bb;if(h!=f){this._statusChecked=true;a[y]=f;this.onStatusChanged(h,f)}if(g)d.notify(hb,this.getNormalStatus())},onStatusChanged:function(c,a){t("AuthSession: Auth status changed: "+c+"=>"+a);if(c!=a){var f=c==C,e=a==C;if(!e)if(this._state[b])delete this._state[b];if(c!=a)d.notify(Hb,this.getStatus());if(e!=f)if(e)d.notify(Zb,this.getStatus());else d.notify(Wb,this.getStatus())}}};function qd(b){var c=function(){ad(b)};a.getLoginStatus({internal:true,callback:c})}function Qd(){return true}function ac(){return a._settings[a._env][ic]}function Fc(a){var b=a[o];M(a,[{name:r,type:c,optional:false},{name:S,type:G,optional:true},z],b);if(a[S]&&!(a[S]instanceof Windows.Storage.StorageFile))throw new Error(b+": unsupported file_output object type")}function Ad(b){var a=b._properties,e=a[r],c=a[S],d=a.pendingOp;zc(e,c,b,a.create,d)}function zc(e,j,a,k,d){try{var b=null;if(d)if(a.started)b=d.attachAsync();else b=d.startAsync();else{var h=qb(e)?e:Kb(e),i=new Windows.Foundation.Uri(h),f=new Windows.Networking.BackgroundTransfer.BackgroundDownloader;f.group=Vb;var c=f.createDownload(i,j);if(k){a.downloadComplete(true,new Q(new U({pendingOp:c,started:false,interface_method:"BackgroundDownload.start"},c.guid)));return}b=c.startAsync()}var g=b.then(function(b){var c={content_type:b.getResponseInformation().headers.lookup("Content-Type"),stream:b.getResultStreamAt(0)};a.downloadComplete(true,c)},function(b){Bb(b.message,a)},function(d){var b=d.progress,c={bytesTransferred:b.bytesReceived,totalBytes:b.totalBytesToReceive,progressPercentage:b.totalBytesToReceive==0?0:b.bytesReceived/b.totalBytesToReceive*100};a.downloadProgress(c)});a._cancel=X(g,g.cancel)}catch(l){Bb(l.message,a)}}a.getCurrentBackgroundDownloads=function(){var a=new e("getCurrentBackgroundDownloads",null,null),b=Windows.Networking.BackgroundTransfer;b.BackgroundDownloader.getCurrentDownloadsAsync(Vb).then(function(b){var c=[];if(b&&b.size>0)for(i=0;i<b.size;i++)c.push(new Q(new U({pendingOp:b[i],started:true,interface_method:"BackgroundDownload.attach"}),b[i].guid));a[f](c)},function(b){a[g](b)});return a};function Q(a,b){this.guid=b;if(a.started)this.attach=function(){return a.attach()};else this.start=function(){return a.attach()}}N.prototype._getStrategy=function(a){var c=a[o],b=a[Ob],d=a[Wc],e=a.pendingOp;if(e)return new db(this,b,a.create,e);else if(b)if(b instanceof Windows.Storage.StorageFile)return new db(this,b,a.create,null);else throw new Error(c+": unsupported file_input object type");else if(d)return new db(this,d,a.create,null);else throw new Error(c+": file_input or stream_input must be specified.")};function db(a,b,d,c){this.upload=function(j){var g=function(f){var c="",d=f.getResultStreamAt(0);if(d){var b=new Windows.Storage.Streams.DataReader(d),e=function(d){if(d)c=b.readString(d);a.onResp(c);b.close()};b.loadAsync(100000).then(e,e)}else a.onResp(c)},i=function(b){a.uploadComplete(true,new Q(new N({pendingOp:b,started:false,interface_method:"BackgroundUpload.start"}),b.guid))},e=function(b){a.onErr(b.message)},f=function(d){var b=d.progress,c={bytesTransferred:b.bytesSent,totalBytes:b.totalBytesToSend,progressPercentage:b.totalBytesToSend==0?0:b.bytesSent/b.totalBytesToSend*100};a.uploadProgress(c)},h=function(b){try{b()}catch(c){a.onErr(c.message)}};h(function(){var k,l;if(c){if(a.started)l=c.attachAsync();else l=c.startAsync();k=l.then(g,e,f)}else{var n=new Windows.Foundation.Uri(j),m=new Windows.Networking.BackgroundTransfer.BackgroundUploader;m.group=ec;m.method=Bd;if(b instanceof Windows.Storage.StorageFile){l=m.createUpload(n,b);if(d){i(l);return}else k=l.startAsync().then(g,e,f)}else k=m.createUploadFromStreamAsync(n,b).then(function(b){h(function(){if(d){i(b);return}else{k=b.startAsync().then(g,e,f);a._cancel=X(k,k.cancel)}})},e);a._cancel=X(k,k.cancel)}})}}a.getCurrentBackgroundUploads=function(){var a=new e("getCurrentBackgroundUploads",null,null),b=Windows.Networking.BackgroundTransfer;b.BackgroundUploader.getCurrentUploadsAsync(ec).then(function(b){var c=[];if(b&&b.size>0)for(i=0;i<b.size;i++)c.push(new Q(new N({pendingOp:b[i],started:true,interface_method:"BackgroundUpload.attach"}),b[i].guid));a[f](c)},function(b){a[g](b)});return a};function hd(a){var b=document.readyState;if(b==="complete"||document.body!==null)a();else window.addEventListener("DOMContentLoaded",a,false)}a[u]="Windows/HTML8_"+Uc("5.6.3506.0411");if(!a._settings)a._settings={};var Rd=a._settings,rb={},Md="login.live.com";rb[ic]="https://apis.live.net/v5.0/";rb[oc]=Md;Rd["PROD"]=rb;a._env="PROD";a.onloadInit()}})();