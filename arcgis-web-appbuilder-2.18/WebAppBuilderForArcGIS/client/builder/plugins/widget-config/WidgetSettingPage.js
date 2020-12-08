// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:builder/plugins/widget-config/WidgetSettingPage.html":'\x3cdiv class\x3d"widget-setting-page"\x3e\r\n  \x3cdiv class\x3d"section common-setting" data-dojo-attach-point\x3d"commonSettingNode"\x3e\r\n    \x3cdiv class\x3d"basic"\x3e\r\n      \x3cdiv class\x3d"icon jimu-float-leading"\x3e\r\n        \x3cimg class\x3d"real-icon"  data-dojo-attach-point\x3d"iconNode"\x3e\r\n      \x3c/div\x3e\r\n      \x3cdiv class\x3d"right jimu-float-trailing jimu-leading-margin1"\x3e\r\n        \x3cinput data-dojo-type\x3d"dijit/form/ValidationTextBox" data-dojo-attach-point\x3d"labelNode" placeholder\x3d"${nls.widgetLabel}" required\x3d"true" class\x3d"widget-setting-input" tabindex\x3d"0"\x3e\r\n        \x3cdiv class\x3d"right-foot" data-dojo-attach-point\x3d"rightFooterNode"\x3e\r\n          \x3cdiv class\x3d"image-container"\x3e\r\n            \x3cdiv data-dojo-attach-point\x3d"imageChooserPlaceholder"\x3e\x3c/div\x3e\r\n            \x3c!-- \x3cspan nowrap class\x3d"change-icon" data-dojo-attach-point\x3d"changeNode"\x3e${nls.changeIcon}\x3c/span\x3e --\x3e\r\n            \x3ca class\x3d"help-link" target\x3d"_blank" data-dojo-attach-point\x3d"helpNode"\x3e${nls.more}\x3c/a\x3e\r\n          \x3c/div\x3e\r\n        \x3c/div\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n    \x3cdiv class\x3d"layout"\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"section widget-setting" data-dojo-attach-point\x3d"widgetSettingNode"\x3e\x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare dojo/_base/lang dojo/_base/html dojo/_base/array dojo/_base/config dojo/Deferred dojo/request dojo/topic dojo/aspect dojo/on dojo/mouse dojo/query dojo/string dojo/NodeList-dom dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/text!./WidgetSettingPage.html ./WidgetDefaultSettingPage jimu/utils jimu/WidgetManager jimu/portalUrlUtils jimu/portalUtils jimu/dijit/ViewStack jimu/dijit/ImageChooser jimu/dijit/LoadingIndicator jimu/dijit/Message dijit/form/CheckBox esri/request".split(" "),
function(u,b,d,I,q,v,k,w,J,r,K,L,x,M,y,z,A,B,C,m,t,n,D,N,g,E,F,O,G){var p="en de es fr ja ru zh-cn zh-tw zh-hk ar it ko pl pt-br pt-pt ro".split(" "),H=[],l=null;return u([y,z,A],{templateString:B,startup:function(){this.inherited(arguments);this.own(k("builder/widgethelp.json",{handleAs:"json"}).then(function(a){l=a},function(a){console.error(a)}).always(b.hitch(this,function(){this.domNode&&(this.own(r(window,"resize",b.hitch(this,this.resize))),this.init())})))},init:function(){this.loading=new E;
d.addClass(this.loading.domNode,"load-widget-setting");this.loading.placeAt(this.widgetSettingNode);this.initCommonAttr();this.initWidgetAttr();this.resize()},resize:function(){var a=d.getContentBox(this.domNode);d.setStyle(this.widgetSettingNode,{height:a.h-94+"px"})},onCancel:function(){this.onClose();this.popup.close()},onOk:function(){var a=this._checkLabelExist();if(a)return new F({message:a}),!1;this.imageChooser.imageData&&(this.setting.icon=this.imageChooser.imageData);this.setting.label=
m.sanitizeHTML(this.labelNode.get("value"));if(this.settingDijit){var c=this.settingDijit.getConfig(!0);if(!1===c)return!1;c&&"function"===typeof c.then?c.then(b.hitch(this,function(a){if(!1===a)return!1;var c=this.settingDijit.getDataSources();c&&"function"===typeof c.then?c.then(b.hitch(this,function(c){this.setting.config=a;this.setting.provideDataSources=c;this._closeSettingPopup()})):(this.setting.config=a,this.setting.provideDataSources=c,this._closeSettingPopup())})):(a=this.settingDijit.getDataSources())&&
"function"===typeof a.then?a.then(b.hitch(this,function(a){this.setting.config=c;this.setting.provideDataSources=a;this._closeSettingPopup()})):(this.setting.config=c,this.setting.provideDataSources=a,this._closeSettingPopup())}else this._closeSettingPopup()},_closeSettingPopup:function(){delete this.setting.isDefaultConfig;w.publish("widgetSettingPageOk",this.setting,this.fromNode);this.onClose();this.popup.close()},_checkLabelExist:function(){var a=0,c=this.labelNode.get("value");if(""===x.trim(c))return this.nls.labelRequired;
var f=m.getControllerWidgets(this.appConfig);this.appConfig.visitElement(b.hitch(this,function(b){this.setting.id!==b.id&&b.label===c&&(0<f.length?a++:b.isOnScreen&&a++)}));return 0<a?this.nls.labelExists:""},onClose:function(){this.popup&&this.popup.closeBtnNode&&this.popup.closeBtnNode.focus();this.settingViewStack?(this.settingDijitUI.destroy(),this.settingDijitJSON.destroy(),this.settingViewStack.destroy()):this.settingDijit&&this.settingDijit.destroy()},_isInSupportLanguages:function(){var a=
!1,c=q.locale.toLowerCase();if(-1<p.indexOf(c))a=!0;else for(var b=0;b<p.length;b++)if(c.split("-")[0]===p[b].split("-")[0]){a=!0;break}return a},_getHelpLink:function(a,c){var f=new v,e=null;a=a.toLowerCase();c="html"===(c||"html").toLowerCase()?"widgets2d":"widgets3d";if(window.isXT)k("/webappbuilder/help/exists",{handleAs:"json"}).then(b.hitch(this,function(h){h&&h.exists?k("/webappbuilder/help/cxhelp.js",{handleAs:"json"}).then(b.hitch(this,function(h){var d="#";e=b.getObject("dev."+c+"."+a,!1,
l);h&&h.m&&e&&h.m[e]?d="/webappbuilder/help/"+h.m[e]:e&&(d="/webappbuilder/help/"+e);f.resolve(d)}),b.hitch(this,function(a){console.warn(a);f.resolve("#")})):f.resolve("#")}),function(a){console.error(a);f.resolve("#")});else{var d=n.getPortalUrlFromLocation();if(-1<d.indexOf("arcgis.com")){var g="#",e=b.getObject("online."+c+"."+a,!1,l);"widgets3d"===c||-1<H.indexOf(a)||!this._isInSupportLanguages()?(e&&(g="http://"+(-1<d.indexOf("maps.arcgis.com")?"doc":"docdev")+".arcgis.com/en/web-appbuilder/create-apps/"+
e),f.resolve(g)):(d={url:n.getPortalSelfInfoUrl(d),content:{f:"json",culture:q.locale},handleAs:"json",callbackParamName:"callback",preventCache:!0},G(d).then(b.hitch(this,function(a){var c="#";if(a&&a.helpBase&&e)try{c=a.helpBase.split("/").slice(0,4).join("/")+"/web-appbuilder/create-apps/"+e}catch(P){c="http://doc.arcgis.com/en/web-appbuilder/create-apps/"+e}f.resolve(c)}),b.hitch(this,function(a){console.warn(a);f.resolve("#")})))}else e=b.getObject("portal."+c+"."+a,!1,l),k(d+"sharing/rest/portals/helpmap?f\x3djson",
{handleAs:"json"}).then(b.hitch(this,function(a){var c="#";a&&a.helpMap&&a.helpMap.m&&e&&a.helpMap.m[e]&&D.getPortal(window.portalUrl).loadSelfInfo().then(b.hitch(this,function(b){b=b.helpBase;c=-1<b.indexOf("enterprise.arcgis.com")?b+a.helpMap.m[e]:n.getPortalServerFromLocation()+b+a.helpMap.m[e];f.resolve(c)}))}),b.hitch(this,function(a){console.warn(a);f.resolve("#")}))}return f},initCommonAttr:function(){var a=m.processUrlInAppConfig(this.setting.icon);d.setAttr(this.iconNode,"src",a);window.isRTL&&
this.setting.mirrorIconForRTL&&d.addClass(this.iconNode,"jimu-flipx");this.labelNode.set("value",this.setting.label);this._getHelpLink(this.setting.name,b.getObject("manifest.platform",!1,this.setting)).then(b.hitch(this,function(a){"#"!==a&&(d.setStyle(this.helpNode,"display","block"),d.setAttr(this.helpNode,"href",a))}));this.imageChooser=new g({goldenWidth:24,goldenHeight:24,format:[g.GIF,g.JPEG,g.PNG],label:this.nls.changeIcon},this.imageChooserPlaceholder);!1===this.setting.inPanel&&!0===this.setting.isOnScreen&&
!0!==this.setting.closeable?(this.imageChooser.disableChooseImage(),d.setAttr(this.imageChooser.domNode,"title",this.nls.unableChangeIcon)):(this.imageChooser.enableChooseImage(),this.own(r(this.imageChooser,"imageChange",b.hitch(this,function(a){this.iconNode.src=a;this.setting.icon=a}))))},initWidgetAttr:function(){!1===this.setting.hasConfig?this.widgetSettingNode.innerHTML='\x3cdiv class\x3d"noconfig-info"\x3e'+this.nls.noConfig+"\x3c/div\x3e":t.getInstance().tryLoadWidgetConfig(this.setting).then(b.hitch(this,
function(a){this.setting.hasSettingPage?t.getInstance().loadWidgetSettingPage(this.setting).then(b.hitch(this,function(a){this.widgetSettingNode?(this.settingDijit=a,this.settingDijit.settingPagePopup=this.popup,d.place(this.settingDijit.domNode,this.widgetSettingNode),this.settingDijit.startup(),this.loading.destroy(),d.setAttr(this.widgetSettingNode,"data-widget-loaded","true")):a.destroy()})):this.widgetSettingNode&&(this.settingDijit=new C({config:this.setting.config}),d.place(this.settingDijit.domNode,
this.widgetSettingNode),this.settingDijit.settingPagePopup=this.popup,this.settingDijit.startup(),this.loading.destroy())}))},setAppConfig:function(a){this.appConfig=a}})});