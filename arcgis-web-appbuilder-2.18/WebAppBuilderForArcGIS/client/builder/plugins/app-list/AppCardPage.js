// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:builder/plugins/app-list/AppCardPage.html":'\x3cdiv\x3e\r\n  \x3cdiv class\x3d"app-card-page-content" id\x3d"app-card-page-content" data-dojo-attach-point\x3d"appCardPageContent"\x3e\x3c/div\x3e\r\n\x3c/div\x3e\r\n\r\n'}});
define("dojo/_base/declare dojo/_base/html dojo/_base/array dojo/_base/lang dojo/_base/fx dojo/on dojo/dom jimu/utils ./AppOperMenu dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dojo/text!./AppCardPage.html dojox/form/Uploader dojo/NodeList-dom".split(" "),function(t,a,p,q,h,k,u,e,v,w,x,y,z){return t([w,x,y],{baseClass:"app-card-page",templateString:z,loading:null,folderUrl:null,appListWidget:null,_eventHandles:null,_appOperMenus:null,postMixInProperties:function(){this.inherited(arguments);
this.nls=this.appListWidget.nls;this.loading=this.appListWidget.loading;this.folderUrl=this.appListWidget.folderUrl},constructor:function(){this._eventHandles=[];this._appOperMenus=[]},startup:function(){this.inherited(arguments);a.setSelectable(this.domNode,!1)},refresh:function(a){this.createAppList(a)},cleanAppList:function(){a.empty(this.appCardPageContent);p.forEach(this._appOperMenus,function(a){a.destroy()});this._appOperMenus=[];p.forEach(this._eventHandles,function(a){a.remove()});this._eventHandles=
[]},createAppList:function(a){this.cleanAppList();p.forEach(a,function(a){this.createAppCard(a)},this)},createAppCard:function(c){var r=a.create("div",{"class":"app-card-box jimu-float-leading"},this.appCardPageContent),m=a.create("div",{"class":"card app-info-card"},r);a.create("div",{"class":"app-style-part",style:"background-color: "+c.styleColor},m);var l=a.create("div",{"class":"app-title-part"},m);a.create("div",{"class":"app-type-div "+("HTML"===c.appType?"app-type-2d":"app-type-3d")},l);var b=
a.create("table",{"class":"app-title-table"},l),b=a.create("tbody",{"class":"app-title-table-body"},b),b=a.create("tr",{"class":"app-title-table-tr"},b),d=a.create("td",{"class":"app-icon-td"},b);a.create("div",{"class":"app-icon "+(c._defaultIconClass?c._defaultIconClass:""),style:"background-image: url("+c.icon+"?date\x3d"+this.appListWidget.getRefreshImageFlag()+")"},d);b=a.create("td",{"class":"app-title-td"},b);a.create("div",{"class":"app-title-div",innerHTML:e.sanitizeHTML(c.name)},b);a.create("div",
{"class":"app-time-div",innerHTML:e.sanitizeHTML(this.appListWidget._getLocaleDateTime(c.lastUpdated))},b);b=a.create("div",{"class":"app-operation-part"},m);a.create("div",{innerHTML:'\x3ca href\x3d"'+e.sanitizeHTML(c.appUrl)+'" target\x3d"_blank"\x3e\x3c/a\x3e',"class":"app-operation launch-operation jimu-float-leading",title:this.nls.launch},b);a.create("div",{innerHTML:'\x3ca href\x3d"'+e.sanitizeHTML(c.downloadUrl)+'" target\x3d"downloadTargetFrame"\x3e\x3c/a\x3e',"class":"app-operation download-operation jimu-float-leading",
title:this.nls.download},b);var m=a.create("div",{"class":"app-operation edit-operation jimu-float-leading",title:this.nls.edit},b),n=a.create("div",{"class":"app-operation more-operation jimu-float-trailing"},b),g=a.create("div",{"class":"app-des-card"},r),b=a.create("div",{"class":"app-des-part"},g),d=a.create("table",{"class":"app-name"},b),d=a.create("tbody",{"class":"app-name-tbody"},d),d=a.create("tr",{"class":"app-name-tr"},d),d=a.create("td",{"class":"app-name-td"},d);a.create("div",{"class":"app-name-div",
innerHTML:e.sanitizeHTML(c.name),title:c.name},d);d=a.create("div",{"class":"app-info-div"},d);a.create("div",{"class":"app-time-div jimu-float-leading",innerHTML:e.sanitizeHTML(this.appListWidget._getLocaleDateTime(c.lastUpdated))},d);a.create("div",{"class":"app-creator-div jimu-float-trailing",innerHTML:e.sanitizeHTML(c.creator)},d);a.create("div",{"class":"app-des",innerHTML:e.sanitizeHTML(c.description),title:c.description},b);var f=(new v({app:c,posNode:n,appListWidget:this.appListWidget,nls:this.nls,
isTemplate:c.isTemplate,appContentNode:this.appCardPageContent,height:122,offset:{top:44,left:-10,right:-10}})).placeAt(n);this._appOperMenus.push(f);f.appTitlePart=l;f.appDesCard=g;b=k(n,"click",q.hitch(this,function(b){f.isShow?(f.hide(),a.removeClass(n,"item-more-selected")):(p.forEach(this._appOperMenus,function(b){b.isShow&&(b.hide(),a.removeClass(b.posNode,"item-more-selected"))}),f.show(),a.addClass(n,"item-more-selected"));b.stopPropagation()}));this._eventHandles.push(b);b=k(m,"click",q.hitch(this,
function(){this.appListWidget.pluginManager.getPluginByName("startup").switchToAppConfig(c)}));this._eventHandles.push(b);b=k(g,"mousemove",function(){h.fadeOut({node:l,duration:150}).play();h.fadeIn({node:g,duration:150}).play()});this._eventHandles.push(b);b=k(g,"mouseout",function(){h.fadeIn({node:l,duration:150}).play();h.fadeOut({node:g,duration:150}).play()});this._eventHandles.push(b);b=k(u.byId("content-box"),"click",q.hitch(this,function(){h.fadeIn({node:l,duration:150}).play();h.fadeOut({node:g,
duration:150}).play();a.removeClass(f.posNode,"item-more-selected");f.hide()}));this._eventHandles.push(b);b=k(r,"click",q.hitch(this,function(a){a.stopPropagation()}));this._eventHandles.push(b)}})});