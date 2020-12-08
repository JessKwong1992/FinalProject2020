/**
 * Copyright @ 2020 Esri.
 * All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 */
define(["dojo/_base/lang","dojo/_base/array","dojo/_base/declare","esri/core/Evented","esri/geometry/support/webMercatorUtils","esri/geometry/Extent","esri/core/libs/gl-matrix-2/vec3f64","esri/core/libs/gl-matrix-2/vec2f64","esri/core/libs/gl-matrix-2/vec2","esri/views/3d/webgl-engine/lib/GridLocalOriginFactory","esri/views/3d/support/projectionUtils","../webgl-engine-extensions/GLVerTexture","../support/fx3dUtils"],function(e,t,i,n,s,r,a,o,h,d,_,l,c){var u,p,f,g,y,m=o.vec2f64,h=h.vec2,v=a.vec3f64,x=(v.create(),v.create()),w={},z=i([n],{declaredClass:"esri.views.3d.effects.Effect",effectName:"Effect",constructor:function(e){this._view=e.view,this._layerView=e.layerView,this._renderCoordsHelper=e.view.renderCoordsHelper,this._renderSpatialReference=e.view.renderSpatialReference,this._layer=e.layer,this._wgs84SpatialReference=this._layerView._fx3dSpatialReference,this._stateStack=[],this._currentVizPage=0,this._preVizId=-1,this._repeatCount=0,this._isReachedRepeatLimit=!1,this._hasSentReady=!1,this._vizFieldDefault="default",this._vizFields=e.layer.vizFields,this._vizFieldMinMaxs={},this._vizFieldMinMaxs[this._vizFieldDefault]={min:0,max:0,maxFeature:null},t.forEach(this._vizFields,function(e){this._vizFieldMinMaxs[e]={min:null,max:null,maxFeature:null}}.bind(this)),this._eventHandlers=[],this._vizFieldVerTextureSize=m.create(),this._vizFieldVerTextures={},this._needsAllLoaded=!1,this._allLoaded=!1,this._gl=null,this._shaderSnippets=null,this._material=null,this._toAddGraphicsIndex=0,this._addedGraphicsCount=0,this._addedGraphics=[],this._resetState(),this._resetTime(),this._pause=!1,this._eventHandlers.push(this._layer.watch("pauseTag",function(e,t,i){this.ready&&(this._pause=e,e?e&&(this._pausedTime=this.time):this._lastTime=performance.now())}.bind(this))),this._spin=!1,this._eventHandlers.push(this._layer.watch("spinTag",function(e,t,i){return e&&"local"==this._view.viewingMode?(console.warn("Spinning operation is not supported in local scene."),void(this._layer.spinTag=!1)):(this._interactionHandlers||(this._interactionHandlers=[],this._stopPropagation=function(e){e["native"].preventDefault(),e.stopPropagation()}),1==e?(this._interactionHandlers.push(this._view.on("mouse-wheel",this._stopPropagation)),this._interactionHandlers.push(this._view.on("click",this._stopPropagation)),this._interactionHandlers.push(this._view.on("double-click",this._stopPropagation)),this._interactionHandlers.push(this._view.on("hold",this._stopPropagation)),this._interactionHandlers.push(this._view.on("drag",this._stopPropagation)),this._interactionHandlers.push(this._view.on("key-down",this._stopPropagation)),this._interactionHandlers.push(this._view.on("key-up",this._stopPropagation)),this._interactionHandlers.push(this._view.on("pointer-down",this._stopPropagation)),this._interactionHandlers.push(this._view.on("pointer-up",this._stopPropagation)),this._interactionHandlers.push(this._view.on("pointer-move",this._stopPropagation))):this._interactionHandlers instanceof Array&&(this._interactionHandlers.forEach(function(e){e&&(e.remove(),e=null)}),this._interactionHandlers=[]),void(this._spin=e))}.bind(this))),this._addLayerWatchHandler("visible"),this.renderingInfo={visible:!0,repeat:5,transparency:100,animationInterval:5},this.orderId=0},_addLayerWatchHandler:function(t){e.isString(t)&&this._eventHandlers.push(this._layer.watch(t,function(e,i,n){this.renderingInfo[n]=e,"visible"===t.toLowerCase()&&this.ready&&(e?this._lastTime=performance.now():e||(this._pausedTime=this.time))}.bind(this)))},_resetState:function(){this.ready=!1,this._pause=!1,this._vacDirty=!0,this._shapeDirty=!0,this._isAddingGeometry=!1,this._renderingInfoDirty=!0,this._colourMapDirty=!0,this._colorBarDirty=!0,this._shadersReady=!1,this._isReachedRepeatLimit=!1,this._firstAnimatedTo=!1,this._hasSentReady=!1},_resetTime:function(){this.time=this._lastTime=0,this._pausedTime=0},_pushState:function(e){for(var t=0;t<this._stateStack.length;t++)if(this._stateStack[t][0]==e[0])return;this._stateStack.push(e)},_restoreState:function(e){for(var t=0;t<this._stateStack.length;t++)"function"==typeof e[this._stateStack[t][0]]&&e[this._stateStack[t][0]].apply(e,this._stateStack[t][1]instanceof Array?this._stateStack[t][1]:[this._stateStack[t][1]]);this._stateStack=[]},destroy:function(){t.forEach(this._eventHandlers,function(e){"function"==typeof e.remove&&e.remove()||"function"==typeof e.destroy&&e.destroy()}),this._eventHandlers=[],this._interactionHandlers instanceof Array&&(t.forEach(this._interactionHandlers,function(e){"function"==typeof e.remove&&e.remove()||"function"==typeof e.destroy&&e.destroy(),e=null}),this._interactionHandlers=[]),this._resetState(),this._destroy("_material");var e=Object.getOwnPropertyNames(this._vizFieldVerTextures);t.forEach(e,function(e){this._vizFieldVerTextures[e]instanceof l&&this._vizFieldVerTextures[e].dispose()}.bind(this))},_dispose:function(e){this[e]&&(this[e].dispose(),delete this[e]),this[e]=null},_destroy:function(e){this[e]&&(this[e].destroy(),delete this[e]),this[e]=null},setContext:function(i){this._gl=i.gl,this._shaderSnippets=i.shaderSnippets,this._vaoExt=i.vaoExt,this._effectConfig=c.effectConfig(this.effectName),this._initRenderingInfo(this._effectConfig);var n=this._layer._get("renderingInfo");if(this._layer&&n){var s=Object.getOwnPropertyNames(n),r=Object.getOwnPropertyNames(this.renderingInfo),a=this;t.forEach(s,function(e){r?t.some(r,function(t){if(e.toLowerCase()===t.toLowerCase())return"shapetype"===e.toLowerCase()?a.renderingInfo[t]=n[e].toLowerCase():a.renderingInfo[t]=n[e],!0}):a.renderingInfo[e]=n[e]})}this._renderingInfoChange(this.renderingInfo),this._updateDefaultLabelHeight(),this._vizFieldVerTextures[this._vizFieldDefault]=new l(this._gl),t.forEach(this._vizFields,function(e){this._vizFieldVerTextures[e]=new l(this._gl)}.bind(this)),this._eventHandlers.push(this._layer.on("fx3d-add-graphics",function(e){this._needsAllLoaded||this._addGraphicsHandler(e)}.bind(this))),this._eventHandlers.push(this._layer.on("all-features-loaded",function(e){this._needsAllLoaded&&(this._addGraphicsHandler(e),this._allLoaded=!0),this._initVizFieldVertextures(),this._layer.emit("can-locating-now")}.bind(this))),this._eventHandlers.push(this._layer.on("fx3d-active-viz-field",e.hitch(this,this._activeVizFieldHandler))),this._eventHandlers.push(this._layer.watch("renderingInfo",this._renderingInfoChange.bind(this)))},_toWGS84Extent:function(e){var t={xmin:e.xmin,ymin:e.ymin,xmax:e.xmax,ymax:e.ymax};return e.spatialReference&&(w.x=e.xmin,w.y=e.ymin,w.z=0,w.spatialReference=e.spatialReference,_.pointToVector(w,x,this._wgs84SpatialReference),t.xmin=x[0],t.ymin=x[1],w.x=e.xmax,w.y=e.ymax,_.pointToVector(w,x,this._wgs84SpatialReference),t.xmax=x[0],t.ymax=x[1]),t},_calculateExtentCenter:function(e){var t=e.length;if(t){var i,n,s,a,o,h,d,_=0,l=e[0].attributes[this._vizFields[this._currentVizPage]];if("point"==this._layer.geometryType)for(i=n=e[0].geometry.longitude,s=a=e[0].geometry.latitude,h=1;h<t;h++)o=e[h],null!=o.geometry&&(o.geometry.longitude<i&&(i=o.geometry.longitude),o.geometry.longitude>n&&(n=o.geometry.longitude),o.geometry.latitude<s&&(s=o.geometry.latitude),o.geometry.latitude>a&&(a=o.geometry.latitude),l<o.attributes[this._vizFields[this._currentVizPage]]&&(_=h));else if("polyline"==this._layer.geometryType||"polygon"==this._layer.geometryType)for(d=e[0].geometry.extent,i=d.xmin,n=d.xmax,s=d.ymin,a=d.ymax,h=1;h<t;h++)o=e[h],null!=o.geometry&&null!=o.geometry.extent&&(d=o.geometry.extent,d.xmin<i&&(i=d.xmin),d.xmax>n&&(n=d.xmax),d.ymin<s&&(s=d.ymin),d.ymax>a&&(a=d.ymax),l<o.attributes[this._vizFields[this._currentVizPage]]&&(_=h));return new r(i,s,n,a,this._wgs84SpatialReference)}return null},_addGraphicsHandler:function(t){e.isArray(t.graphics)&&t.graphics.length>0&&(this._toAddGraphicsIndex=this._addedGraphicsCount,this._addedGraphicsCount+=t.graphics.length,this._needsAllLoaded?this._addedGraphics=t.graphics:this._addedGraphics=this._addedGraphics.concat(t.graphics),this._isAddingGeometry=!0,this._shapeDirty=!0)},_activeVizFieldHandler:function(t){"number"==typeof t.currentVizPage&&((this._currentVizPage<0||this._currentVizPage>=this._vizFields.length)&&(this._currentVizPage=0),this.ready=!1,this._hasSentReady=!1,this._restoreRenderingInfo(),e.isObject(t.newRenderingInfo)&&e.mixin(this.renderingInfo,t.newRenderingInfo),this._shapeDirty=!1,this._colorBarDirty=!1,this._colourMapDirty=!1,this._renderingInfoChange(this.renderingInfo),this._updateDefaultLabelHeight(),this.update(),this._resetAnimation(),this._currentVizPage=t.currentVizPage,this._updateVizFieldMinMaxToLayer(),this._layerView._updateSelectedFeatureLabel(),this._emitSyncEvent())},_resetAnimation:function(){this._repeatCount=0,this._preVizId=-1,this._isReachedRepeatLimit=!1,this._resetTime(),this._layer.startAnimation()},_resetAddGeometries:function(){this._addedGraphics=[]},_allGraphics:function(){return this._layerView.getLoadedGraphics()},_renderingInfoChange:function(t,i,n){t!==i&&t&&e.isObject(t)&&this._doRenderingInfoChange(t)},_doRenderingInfoChange:function(e){this._renderingInfoDirty=!0;for(var t in e)e.hasOwnProperty(t)&&this.renderingInfo.hasOwnProperty(t)&&("visible"===t.toLowerCase()?(this._layer&&(this._layer[t]=e[t]),this.renderingInfo[t]=e[t]):"repeat"!==t.toLowerCase()&&"animationinterval"!==t.toLowerCase()||(this._resetAnimation(),this._clampScope(e,t),this.renderingInfo[t]=e[t]))},_initRenderingInfo:function(i){this._scopes={},i&&e.isObject(i)&&e.isArray(i.renderingInfo)&&t.forEach(i.renderingInfo,function(t){"shapetype"===t.name.toLowerCase()?this.renderingInfo[t.name]=t.defaultValue.toLowerCase():this.renderingInfo[t.name]=t.defaultValue,e.isArray(t.scope)&&(this._scopes[t.name]=t.scope)}.bind(this))},_restoreRenderingInfo:function(){this.renderingInfo={visible:!0,repeat:5,transparency:100,animationInterval:5},this._initRenderingInfo(this._effectConfig);var e=this._layer._get("renderingInfo");if(this._layer&&e){var i=Object.getOwnPropertyNames(e),n=Object.getOwnPropertyNames(this.renderingInfo),s=this;t.forEach(i,function(i){n?t.some(n,function(t){if(i.toLowerCase()===t.toLowerCase())return"shapetype"===i.toLowerCase()?s.renderingInfo[t]=e[i].toLowerCase():s.renderingInfo[t]=e[i],!0}):s.renderingInfo[i]=e[i]})}this._updateDefaultLabelHeight()},_clampScope:function(t,i){var n=this._scopes[i];if(e.isArray(n)){if("number"!=typeof t[i]||"number"!=typeof n[0]||"number"!=typeof n[1])return;t[i]<n[0]?t[i]=n[0]:t[i]>n[1]&&(t[i]=n[1]),t[i]<0&&(t[i]=0)}},_updateRenderingInfo:function(){var e=!0;(!this._needsAllLoaded||this._needsAllLoaded&&this._allLoaded)&&this._allGraphics().length>0&&(this._colorBarDirty?(e=this._initColorBar(),e&&(this._colorBarDirty=!1)):e=!0,this._colourMapDirty&&e?(e=this._initColourMap(),e&&(this._colourMapDirty=!1)):e=!0,e=!(!this._renderingInfoDirty||!e),this._renderingInfoDirty=!e)},_updateRenderingGeometry:function(){var e=!0;(!this._needsAllLoaded||this._needsAllLoaded&&this._allLoaded)&&this._allGraphics().length>0&&(e=this._initRenderContext(),e?(e=this._initVizFieldVertextures(),this._shapeDirty=!e):this._shapeDirty=!0,this._shapeDirty===!0&&(this._isAddingGeometry=!1))},preRender:function(){this.renderingInfo.visible&&(this._shadersReady||(this._shadersReady=this._loadShaders()))},_emitSyncEvent:function(){this._layer&&this._repeatCount>0&&(this.renderingInfo.repeat<=0||this.renderingInfo.repeat>0&&this._repeatCount<=this.renderingInfo.repeat)&&this._layer.emit("sync-viz-timer",{vizPage:this._currentVizPage,repeat:this._repeatCount})},_calculateRepeatCount:function(){y=Math.floor(this.time/this.renderingInfo.animationInterval),this._preVizId!==y&&(this._repeatCount++,this._preVizId=y,this._emitSyncEvent())},_updateVizPage:function(){this.renderingInfo.repeat>0?this._repeatCount<=this.renderingInfo.repeat?this._calculateRepeatCount():this._isReachedRepeatLimit||(this._isReachedRepeatLimit=!0,this._layer.pauseAnimation(),this._layer.emit("reached-repeat-limit")):this.renderingInfo.repeat<0?(this._calculateRepeatCount(),this._isReachedRepeatLimit&&(this._isReachedRepeatLimit=!1)):this._isReachedRepeatLimit||(this._isReachedRepeatLimit=!0)},render:function(e,t){this.renderingInfo.visible&&(e.time=this.time,e.reachedRepeatLimit=this._isReachedRepeatLimit)},update:function(){this.renderingInfo.visible&&(this._renderingInfoDirty&&this._updateRenderingInfo(),this._shapeDirty&&this._updateRenderingGeometry(),this._renderingInfoDirty||this._shapeDirty||!this._shadersReady?this.ready=!1:this.ready=!0,this._updateSelfTime(),this._updateVizPage(),this._spin&&this._doSpin())},_doSpin:function(){u=this._view.camera.position,p=s.webMercatorToGeographic(u),f=p.x-1,f<=-180&&(f=179),g=u.z,g<8e6&&(g=8e6),this._view.goTo({position:[f,0,g],tilt:0,heading:0})},_bindPramsReady:function(){return this._currentVizPage>=0&&this._currentVizPage<Object.getOwnPropertyNames(this._vizFieldMinMaxs).length&&this._currentVizPage<Object.getOwnPropertyNames(this._vizFieldVerTextures).length},_updateSelfTime:function(){this.ready&&!this._pause&&(0!==this._lastTime?this.time=this._pausedTime+.001*(performance.now()-this._lastTime):(this._lastTime=performance.now(),this.time=0))},_loadShaders:function(){return!0},_initVertexLayout:function(){return!0},_initRenderContext:function(){return!0},_initVizFieldVertextures:function(){var e=this._allGraphics();if(e.length>0){var i=this._gl.getParameter(3379),n=e.length,s=c.nextHighestPowerOfTwo(n);s>i&&(s=i,console.warn("Too many graphics, and extra features will be discarded."));var r=Math.ceil(n/s);r=c.nextHighestPowerOfTwo(r),r>i&&(r=i,console.warn("Too many graphics, and extra features will be discarded.")),this._vizFieldVerTextures[this._vizFieldDefault].setData(s,r,new Float32Array(s*r*4));var a,o,d,_;return t.forEach(this._vizFields,function(t){var i=new Float32Array(s*r*4);o=e[0].attributes[t],o||(o=0),(!o||"number"!=typeof o||o<0)&&(o=0),d=_=o;for(var n=e[0],h=0;h<e.length;h++)a=e[h].attributes,o=a[t],(!o||"number"!=typeof o||o<0)&&(o=0),i[4*h]=o,_<o&&(_=o,n=e[h]),d>o&&(d=o);this._vizFieldVerTextures[t].setData(s,r,i),this._vizFieldMinMaxs[t].min=d,this._vizFieldMinMaxs[t].max=_,this._vizFieldMinMaxs[t].maxFeature=n,this._updateVizFieldMinMaxToLayer()}.bind(this)),h.set(this._vizFieldVerTextureSize,s,r),!0}return!1},_updateVizFieldMinMaxToLayer:function(){this._layer._currentVizPage=this._currentVizPage,this._layer._currentVizFieldMinMax=this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]]},_initColourMap:function(){return!0},_initColorBar:function(){return!0},_updateDefaultLabelHeight:function(){}});return z.createLocalOriginFactory=function(){return new d},z});