// All material copyright ESRI, All Rights Reserved, unless otherwise specified.
// See http://js.arcgis.com/3.15/esri/copyright.txt and http://www.arcgis.com/apps/webappbuilder/copyright.txt for details.
//>>built
require({cache:{"url:builder/plugins/attribute-config/CustomLogoPage.html":'\x3cdiv class\x3d"container"\x3e\r\n  \x3cdiv class\x3d"preview-container jimu-float-leading"\x3e\r\n    \x3cdiv data-dojo-type\x3d"jimu/dijit/ImageChooser" data-dojo-attach-point\x3d"imageChooser" class\x3d"image-node"\r\n    data-dojo-props\x3d"cropImage:false,showSelfImg:true,stretchImg:false,goldenWidth:30,goldenHeight:30,format:[\'image/gif\',\'image/png\',\'image/jpeg\']"\x3e\x3c/div\x3e\r\n\r\n    \x3cdiv data-dojo-attach-point\x3d"noImage" class\x3d"no-image"\x3e\x3c/div\x3e\r\n  \x3c/div\x3e\r\n  \x3cdiv class\x3d"separator jimu-float-leading"\x3e\x3c/div\x3e\r\n  \x3cdiv class\x3d"setting-container jimu-float-leading"\x3e\r\n    \x3cdiv class\x3d"setting-item"\x3e\r\n      \x3cdiv class\x3d"label"\x3e${nls.image}\x3c/div\x3e\r\n      \x3cdiv class\x3d"choose-image-btn" data-dojo-attach-point\x3d"chooseImageBtn"\x3e${nls.upload}\x3c/div\x3e\r\n    \x3c/div\x3e\r\n\r\n    \x3cdiv class\x3d"setting-item"\x3e\r\n      \x3cdiv class\x3d"label"\x3e${nls.altText}\x3c/div\x3e\r\n      \x3cinput type\x3d"text" class\x3d"link-text" data-dojo-type\x3d"dijit/form/ValidationTextBox" data-dojo-props\x3d"required:true"\r\n        placeHolder\x3d"" data-dojo-attach-point\x3d"altText"/\x3e\r\n    \x3c/div\x3e\r\n\r\n    \x3cdiv class\x3d"setting-item"\x3e\r\n      \x3cdiv class\x3d"label"\x3e${nls.link}\x3c/div\x3e\r\n      \x3cinput type\x3d"text" class\x3d"link-text" data-dojo-type\x3d"jimu/dijit/URLInput" data-dojo-props\x3d"required:false,rest:false"\r\n        placeHolder\x3d"" data-dojo-attach-point\x3d"linkText"/\x3e\r\n    \x3c/div\x3e\r\n  \x3c/div\x3e\r\n\x3c/div\x3e'}});
define("dojo/_base/declare dojo/_base/lang dojo/_base/html dojo/on dojo/sniff builder/BasePlugin dijit/_WidgetsInTemplateMixin dojo/text!./CustomLogoPage.html".split(" "),function(e,c,b,d,f,g,h,k){return e([g,h],{templateString:k,baseClass:"custom-logo-page",nls:null,postMixInProperties:function(){this.inherited(arguments);this.nls=c.mixin(this.nls,window.jimuNls);this.nls=c.mixin(this.nls,builderNls)},postCreate:function(){this.inherited(arguments);this.noImage.innerHTML=this.nls.symbolChooser.noFileChoosen;
this.alt&&this.setAlt(this.alt);this.link&&this.setLink(this.link);this.defaultImg&&this.imageChooser.setDefaultSelfSrc(this.defaultImg);this.setImage(this.defaultImg);this.own(d(this.chooseImageBtn,"click",c.hitch(this,this.chooseImage)));this.own(d(this.imageChooser,"imageChange",c.hitch(this,function(a){this.setImage(a)})))},setImage:function(a){b.removeAttr(this.imageChooser.domNode,"title");b.addClass(this.imageChooser.domNode,"hide");b.addClass(this.noImage,"hide");""===a?b.removeClass(this.noImage,
"hide"):b.removeClass(this.imageChooser.domNode,"hide")},getImgData:function(){return this.imageChooser.getImageData()},chooseImage:function(){var a=this.imageChooser.mask;if(f("safari")){var b=document.createEvent("MouseEvents");b.initEvent("click",!0,!0);a.dispatchEvent(b)}else a.click()},setLink:function(a){this.linkText.setValue(a)},getLink:function(){var a=this.linkText.getValue();""!==a&&!1===/^\/\//.test(a)&&!1===/(^(.+):\/\/)/.test(a)&&(a="http://"+a);return a},setAlt:function(a){this.altText.setValue(a)},
getAlt:function(){return this.altText.getValue()},_isAltTextValid:function(){return""===this.linkText.getValue()&&!1===this.linkText.required?""===this.altText.getValue()?!0:this.altText.isValid():this.altText.isValid()},isValid:function(){var a=this._isAltTextValid();b.removeClass(this.altText.domNode,"dijitTextBoxError dijitValidationTextBoxError dijitError");a||b.addClass(this.altText.domNode,"dijitTextBoxError dijitValidationTextBoxError dijitError");return!1===this.linkText.isValid()||!1===a?
!1:!0}})});