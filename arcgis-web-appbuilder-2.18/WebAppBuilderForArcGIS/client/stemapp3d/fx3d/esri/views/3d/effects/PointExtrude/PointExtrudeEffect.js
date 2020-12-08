/**
 * Copyright @ 2020 Esri.
 * All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 */
define(["dojo/_base/lang","dojo/_base/array","dojo/_base/declare","esri/views/3d/webgl-engine/lib/Util","esri/core/libs/gl-matrix-2/vec3f64","esri/core/libs/gl-matrix-2/mat4f64","esri/core/libs/gl-matrix-2/vec3","esri/core/libs/gl-matrix-2/mat4","esri/views/3d/support/projectionUtils","../../webgl-engine-extensions/VertexBufferLayout","../../webgl-engine-extensions/GLXBO","../../webgl-engine-extensions/GLVertexArrayObject","../../support/fx3dUtils","../../support/fx3dUnits","../Effect","./PointExtrudeMaterial"],function(e,i,t,r,n,s,a,o,h,d,l,_,g,f,m,c){var u=n.vec3f64,a=a.vec3,p=s.mat4f64,o=o.mat4,v=r.VertexAttrConstants,b=r.setMatrixTranslation3,T={Down:0,Up:1},I=u.create();p.create();tmpTranslationOriginMat=p.create(),tmpTransformationRelToOrigin=p.create(),tmpInvTranspTransformation=p.create(),renderObjectItem=null,tmpViewMat=p.create();var x={Cuboid:"cuboid",Hexahedron:"hexahedron",Cylinder:"cylinder"},y={Cuboid:4,Hexahedron:6,Cylinder:32},O=t([m],{declaredClass:"esri.views.3d.effects.PointExtrude.PointExtrudeEffect",effectName:"PointExtrude",constructor:function(e){this.orderId=2,this._sizeInMeters=[],this.localOriginFactory=m.createLocalOriginFactory(),this._renderObjects={}},_initRenderingInfo:function(){this.renderingInfo.radius=6e4,this.renderingInfo.height=8e5,this.renderingInfo.topColors=[g.rgbNames.cadetblue,g.rgbNames.yellowgreen,g.rgbNames.lightpink,g.rgbNames.orangered,g.rgbNames.green,g.rgbNames.indianred],this._colorBarDirty=!0,this.renderingInfo.bottomColor=[0,255,0],this.renderingInfo.shapeType=x.Cylinder,this._renderingInfoDirty=!0,this._segments=y.Cylinder,this._vacDirty=!0,this._shapeDirty=!0,this.inherited(arguments)},_doRenderingInfoChange:function(e){this.inherited(arguments);for(var i in e)e.hasOwnProperty(i)&&this.renderingInfo.hasOwnProperty(i)&&(g.endsWith(i.toLowerCase(),"info")?g.isInforAttrChanged(this.renderingInfo[i],e[i])&&(this._renderingInfoDirty=!0):g.endsWith(i.toLowerCase(),"color")?e[i]instanceof Array&&3==e[i].length&&(this.renderingInfo[i]=[e[i][0]/255,e[i][1]/255,e[i][2]/255]):g.endsWith(i.toLowerCase(),"colors")?e[i]instanceof Array&&(this.renderingInfo[i]=e[i],this._colorBarDirty=!0,this._renderingInfoDirty=!0):"shapetype"===i.toLowerCase()?this.renderingInfo[i]!=e[i].toLowerCase()&&(this._vacDirty=!0,this._shapeDirty=!0,this._isAddingGeometry=!1,this._renderingInfoDirty=!0,this.renderingInfo[i]=e[i].toLowerCase(),this.renderingInfo[i]===x.Cuboid?this._segments=y.Cuboid:this.renderingInfo[i]===x.Hexahedron?this._segments=y.Hexahedron:this.renderingInfo[i]===x.Cylinder&&(this._segments=y.Cylinder)):"radius"===i.toLowerCase()||"height"===i.toLowerCase()||"transparency"===i.toLowerCase()?(this._clampScope(e,i),"radius"==i&&this._radiusUnit?this.renderingInfo[i]=f.toMeters(this._radiusUnit,e[i],this._view.viewingMode):"height"==i&&this._heightUnit?(this.renderingInfo[i]=f.toMeters(this._heightUnit,e[i],this._view.viewingMode),this._updateDefaultLabelHeight()):this.renderingInfo[i]=e[i]):typeof e[i]==typeof this.renderingInfo[i]&&(this.renderingInfo[i]=e[i]))},_updateDefaultLabelHeight:function(){this._layer._labelDefaultHeight={flag:1,min:this._scopes.height[0],max:this.renderingInfo.height}},setContext:function(t){this.inherited(arguments),this._effectConfig&&e.isArray(this._effectConfig.renderingInfo)&&(this._radiusUnit=null,this._heightUnit=null,i.forEach(this._effectConfig.renderingInfo,function(e){"radius"===e.name.toLowerCase()?(this._radiusUnit=e.unit,this.renderingInfo.radius=f.toMeters(this._radiusUnit,this.renderingInfo.radius,this._view.viewingMode)):"height"===e.name.toLowerCase()&&(this._heightUnit=e.unit,this.renderingInfo.height=f.toMeters(this._heightUnit,this.renderingInfo.height,this._view.viewingMode),this._updateDefaultLabelHeight())}.bind(this)))},destroy:function(){this._resetBuffers()},_resetBuffers:function(){for(var e in this._renderObjects)this._dispose(this._renderObjects[e].vbo),this._dispose(this._renderObjects[e].ibo),this._dispose(this._renderObjects[e].vao);this._renderObjects={}},_initVertexLayout:function(){var e=[v.POSITION,v.AUXPOS1,v.NORMAL,v.AUXPOS2];this._vertexBufferLayout=new d(e,[3,3,3,3],[5126,5126,5126,5126])},_initRenderContext:function(){if(this.inherited(arguments),this._vacDirty)if(this._initVertexLayout(),this._vacDirty=!1,this._isAddingGeometry)for(var e in this._renderObjects)this._unBindBuffer(this._renderObjects[e].vao,this._renderObjects[e].vbo,this._renderObjects[e].ibo),this._renderObjects[e].vao&&(this._renderObjects[e].vao._initialized=!1);else this._resetBuffers();return this._geometryVertexNum=2*this._segments,this._geometryIndexNum=3*(2*this._segments+(this._segments-2)),this._localBindsCallback||(this._localBindsCallback=this._localBinds.bind(this)),this._buildPolyHedronGeometries()},_buildPolyHedronGeometries:function(){var e=this._isAddingGeometry?this._addedGraphics:this._allGraphics(),i=this._isAddingGeometry?this._toAddGraphicsIndex:0;if(e.length>0){var t,r,n,s,d,f,m,c,u,v,x,y,O,w,M,C,j=(this._vertexBufferLayout.getStride(),2*Math.PI),z=1/this._segments;for(r=0;r<e.length;r++)if(t=e[r].geometry,null!=t){a.set(I,t.longitude,t.latitude,t.altitude||1);var B=p.create();h.computeLinearTransformation(this._wgs84SpatialReference,I,B,this._view.renderSpatialReference),"global"===this._view.viewingMode?g.wgs84ToSphericalEngineCoords(I,0,I,0):"local"===this._view.viewingMode&&g.wgs84ToWebMerc(I,0,I,0);var D=this.localOriginFactory.getOrigin(I);this._renderObjects[D.id]||(this._renderObjects[D.id]={vbo:new l(this._gl,(!0),this._vertexBufferLayout),ibo:new l(this._gl,(!1)),vao:this._vaoExt?new _(this._gl,this._vaoExt):null,offset:0,origin:D.vec3}),d=this._renderObjects[D.id],b(tmpTranslationOriginMat,-d.origin[0],-d.origin[1],-d.origin[2]),o.multiply(tmpTransformationRelToOrigin,tmpTranslationOriginMat,B),o.invert(tmpInvTranspTransformation,tmpTransformationRelToOrigin),o.transpose(tmpInvTranspTransformation,tmpInvTranspTransformation),m=0,c=0,u=1,O=tmpInvTranspTransformation[0]*m+tmpInvTranspTransformation[4]*c+tmpInvTranspTransformation[8]*u+tmpInvTranspTransformation[12],w=tmpInvTranspTransformation[1]*m+tmpInvTranspTransformation[5]*c+tmpInvTranspTransformation[9]*u+tmpInvTranspTransformation[13],M=tmpInvTranspTransformation[2]*m+tmpInvTranspTransformation[6]*c+tmpInvTranspTransformation[10]*u+tmpInvTranspTransformation[14];var L=[],R=[];for(f=d.offset,n=0;n<this._segments;n++)C=j*n*z,m=Math.cos(C),c=Math.sin(C),u=0,v=tmpTransformationRelToOrigin[0]*m+tmpTransformationRelToOrigin[4]*c+tmpTransformationRelToOrigin[8]*u,x=tmpTransformationRelToOrigin[1]*m+tmpTransformationRelToOrigin[5]*c+tmpTransformationRelToOrigin[9]*u,y=tmpTransformationRelToOrigin[2]*m+tmpTransformationRelToOrigin[6]*c+tmpTransformationRelToOrigin[10]*u,L.push(v,x,y,tmpTransformationRelToOrigin[12],tmpTransformationRelToOrigin[13],tmpTransformationRelToOrigin[14],O,w,M,r+i,n,T.Down),L.push(v,x,y,tmpTransformationRelToOrigin[12],tmpTransformationRelToOrigin[13],tmpTransformationRelToOrigin[14],O,w,M,r+i,n,T.Up),n!==this._segments-1?R.push(2*n+f,2*n+2+f,2*n+3+f,2*n+f,2*n+3+f,2*n+1+f):R.push(2*n+f,0+f,1+f,2*n+f,1+f,2*n+1+f);for(s=0;s<this._segments-2;s++)R.push(1+f,2*s+3+f,2*s+5+f);d.vbo.addData(!0,new Float32Array(L)),d.offset+=this._geometryVertexNum,d.ibo.addData(!0,new Uint32Array(R)),d.vao&&(d.vao._initialized=!1)}return this._resetAddGeometries(),!0}return!1},_loadShaders:function(){return this.inherited(arguments),this._material||(this._material=new c({pushState:this._pushState.bind(this),restoreState:this._restoreState.bind(this),gl:this._gl,viewingMode:this._view.viewingMode,shaderSnippets:this._shaderSnippets})),this._material.loadShaders()},_initColorBar:function(){if(!this._colorBarDirty)return!0;this._colorBarTexture||(this._colorBarTexture=this._gl.createTexture());var e=this._gl.getParameter(32873);this._gl.bindTexture(3553,this._colorBarTexture),this._gl.pixelStorei(37440,!0),this._gl.texParameteri(3553,10240,9728),this._gl.texParameteri(3553,10241,9728),this._gl.texParameteri(3553,10242,33071),this._gl.texParameteri(3553,10243,33071);var i=g.createColorBarTexture(32,1,this.renderingInfo.topColors);return this._gl.texImage2D(3553,0,6408,6408,5121,i),this._gl.generateMipmap(3553),this._gl.bindTexture(3553,e),0===this._gl.getError()},_localBinds:function(e,i){e.bind(this._material._program),this._vertexBufferLayout.enableVertexAttribArrays(this._gl,this._material._program),i.bind()},_bindBuffer:function(e,i,t){e?(e._initialized||e.initialize(this._localBindsCallback,[i,t]),e.bind()):this._localBinds(i,t)},_unBindBuffer:function(e,i,t){e?e.unbind():(i.unbind(),this._vertexBufferLayout.disableVertexAttribArrays(this._gl,this._material._program),t.unbind())},render:function(i,t){if(this.inherited(arguments),this._layer.visible&&this.ready&&this._bindPramsReady()){this._hasSentReady||(this._layer.emit("fx3d-ready"),this._hasSentReady=!0),this._sizeInMeters[0]=this.renderingInfo.radius,this._sizeInMeters[1]=this._scopes.height[0],this._sizeInMeters[2]=this.renderingInfo.height,this._material.bind(e.mixin({},{ls:this._vizFieldVerTextures[this._vizFieldDefault],ip:this._vizFieldVerTextures[this._vizFields[this._currentVizPage]],op:this._vizFieldVerTextureSize,es:this.renderingInfo.animationInterval,si:this._sizeInMeters,io:this.renderingInfo.transparency,ss:this.renderingInfo.bottomColor,is:this._vizFieldMinMaxs[this._vizFieldDefault].min>this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].min?this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].min:this._vizFieldMinMaxs[this._vizFieldDefault].min,om:this._vizFieldMinMaxs[this._vizFieldDefault].max>this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].max?this._vizFieldMinMaxs[this._vizFieldDefault].max:this._vizFieldMinMaxs[this._vizFields[this._currentVizPage]].max,oe:1/this._segments,ps:this._colorBarTexture},i),t);for(var r in this._renderObjects)renderObjectItem=this._renderObjects[r],o.translate(tmpViewMat,i.view,renderObjectItem.origin),this._material.bindMat4("viewMat",tmpViewMat),this._material.bindVec3fv("origin",renderObjectItem.origin),this._material.bindVec3f("camPos",i.viewInvTransp[3]-renderObjectItem.origin[0],i.viewInvTransp[7]-renderObjectItem.origin[1],i.viewInvTransp[11]-renderObjectItem.origin[2]),this._bindBuffer(renderObjectItem.vao,renderObjectItem.vbo,renderObjectItem.ibo),this._gl.drawElements(4,renderObjectItem.ibo.getNum(),5125,0);this._material.release(t),this._unBindBuffer(renderObjectItem.vao,renderObjectItem.vbo,renderObjectItem.ibo)}}});return O});