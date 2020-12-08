// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:builder/plugins/app-list/AppCatalogPage.html":'\x3cdiv\x3e\r\n  \x3cdiv class\x3d"app-content" data-dojo-attach-point\x3d"appContent"\x3e\r\n    \x3cdiv class\x3d"list-section" id\x3d"list-section" data-dojo-attach-point\x3d"listSection"\x3e\r\n      \x3cdiv class\x3d"list-section-body-content" id\x3d"list-section-body-content" data-dojo-attach-point\x3d"listSectionBodyContent"\x3e\r\n        \x3ctable class\x3d"list-table" data-dojo-attach-point\x3d"listTable"\x3e\r\n          \x3ctbody data-dojo-attach-point\x3d"listTableBody"\x3e\x3c/tbody\x3e\r\n        \x3c/table\x3e\r\n      \x3c/div\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3c!--iframe style\x3d"display:none" name\x3d"downloadTargetFrame"\x3e\x3c/iframe--\x3e\r\n\x3c/div\x3e\r\n'}});
define("dojo/_base/declare dojo/_base/html dojo/dom-style dojo/dom dojo/_base/array dojo/on dojo/_base/lang dojo/query dojo/dom-attr dojo/topic dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/text!./AppCatalogPage.html jimu/utils ./AppOperMenu".split(" "),function(n,c,r,t,l,k,h,u,v,p,w,x,y,z,m,A){return n([w,x,y],{baseClass:"app-catalog-page",templateString:z,_defaultStyleColor:"#31aacd",loading:null,folderUrl:null,appListWidget:null,_eventHandles:null,_appOperMenus:null,
postMixInProperties:function(){this.inherited(arguments);this.nls=this.appListWidget.nls;this.loading=this.appListWidget.loading;this.folderUrl=this.appListWidget.folderUrl},constructor:function(){this._appOperMenus=[];this._eventHandles=[]},startup:function(){this.inherited(arguments)},refresh:function(a){this.createAppList(a);c.setSelectable(this.appContent,!1)},createAppList:function(a){var b;this.cleanAppList();c.setStyle(this.listSectionBodyContent,"display","block");if(0<a.length)for(b=0;b<
a.length;b++)this.createAppNode(a[b],b);else this.appListWidget._addEmptyDescription(this.listTableBody)},cleanAppList:function(){c.empty(this.listTableBody);l.forEach(this._appOperMenus,function(a){a.destroy()});this._appOperMenus=[];l.forEach(this._eventHandles,function(a){a.remove()});this._eventHandles=[]},createAppNode:function(a,b){return this._createItem(a,b)},_createItem:function(a,b){b=c.create("tr",{"class":"app-catalogs list-table-item"+(b%2?" list-table-item-add ":" "),"data-app-id":a.id,
"data-app-name":a.name},this.listTableBody);var d=c.create("td",{"class":"item-td"},b),d=c.create("div",{"class":"catalog"},d),e=c.create("div",{"class":"content-theme jimu-float-leading"},d),f=c.create("div",{"class":"content-theme-icon "+(a._defaultIconClass?a._defaultIconClass:""),title:this.nls.launch},e);a.thumbnail&&r.set(f,"backgroundImage","url("+a.thumbnail+"?date\x3d"+this.appListWidget.getRefreshImageFlag()+")");c.create("div",{"class":"content-theme-flagImg content-theme-flagImg-"+this._getType(a.appType)},
f);var f=c.create("div",{"class":"content-opers jimu-float-trailing"},d),g=c.create("div",{"class":"content-opers-btns"},f),f=c.create("div",{"class":"content-opers-btn content-opers-btns-edit",title:this.nls.configApp},g),l=c.create("div",{"class":"content-opers-btn content-opers-btns-launch",title:this.nls.launch},g),n=c.create("div",{"class":"content-opers-btn content-opers-btns-download",title:this.nls.download},g),g=c.create("div",{"class":"content-opers-btn content-opers-btns-more","data-appid":a.id},
g),q=(new A({app:a,posNode:g,appListWidget:this.appListWidget,nls:this.nls,isTemplate:!1,appContentNode:this.appContent,height:122,offset:{top:42,left:-16,right:-16}})).placeAt(g);this._appOperMenus.push(q);this._eventHandles.push(k(e,"click",h.hitch(this,this._onAppLaunchClick,a)));this._eventHandles.push(k(n,"click",h.hitch(this,this._onAppDownloadClick,a)));this._eventHandles.push(k(f,"click",h.hitch(this,this._onAppEditClick,a)));this._eventHandles.push(k(l,"click",h.hitch(this,this._onAppLaunchClick,
a)));this._eventHandles.push(k(g,"click",h.hitch(this,this._onAppMoreClick,a,q,g)));d=c.create("div",{"class":"catalog-content"},d);e=c.create("div",{"class":"catalog-content-head"},d);c.create("p",{"class":"catalog-content-appname long-text-ellipsis",innerHTML:m.sanitizeHTML(a.name),title:a.name},e);e=c.create("p",{"class":"catalog-content-appinfo long-text-ellipsis jimu-float-trailing"},e);c.create("span",{"class":"catalog-content-appinfo-time jimu-float-leading",innerHTML:m.sanitizeHTML(this.appListWidget._getLocaleDateTime(a.lastUpdated))},
e);c.create("span",{"class":"catalog-content-appinfo-owner jimu-float-leading",innerHTML:"\x3cp class\x3d'catalog-content-appinfo-owner-name long-text-ellipsis'title\x3d'"+a.creator+"'\x3e"+m.sanitizeHTML(a.creator)+"\x3c/p\x3e"},e);c.create("p",{"class":"catalog-content-dis "+(a.description?"":"place-holder-class"),innerHTML:a.description?m.sanitizeHTML(a.description):this.nls.defaultDesc,title:a.description},d);this._eventHandles.push(k(t.byId("content-box"),"click",h.hitch(this,this.resetStatus)));
this._eventHandles.push(k(this.ownerDocument,"click",h.hitch(this,this.resetStatus)));this._eventHandles.push(p.subscribe("menuAll/hide",h.hitch(this,this.resetStatus)));return b},_getType:function(a){var b="";switch(a){case "HTML":b="2D";break;case "HTML3D":b="3D";break;default:console.error("AppCatalogPage Error _getType")}return b},resetStatus:function(a){this._hideAllAppOperMenus(a);this._hideBtnsSelect(a)},_hideAllAppOperMenus:function(a){l.forEach(this._appOperMenus,function(b){!b.isShow||"undefined"!==
typeof a&&"undefined"!==typeof a.itemId&&a.itemId===b.app.id||b.hide()})},_hideBtnsSelect:function(a){for(var b=u(".content-opers-btns-more"),d=0,e=b.length;d<e;d++){var f=b[d];"undefined"!==typeof a&&"undefined"!==typeof a.itemId&&a.itemId===parseInt(v.get(f,"data-appid"),10)||c.removeClass(f,"content-opers-btns-more-selected")}},_onAppDownloadClick:function(a){window.open(a.downloadUrl,"downloadTargetFrame")},_onAppEditClick:function(a){this.appListWidget.pluginManager.getPluginByName("startup").switchToAppConfig(a)},
_onAppLaunchClick:function(a){window.open(a.appUrl,"_blank")},_onAppMoreClick:function(a,b,d,e){e&&(e.itemId=a.id);b.isShow?b.hide():(p.publish("menuAll/hide"),b.set("app",a),b.show(),c.addClass(d,"content-opers-btns-more-selected"))}})});