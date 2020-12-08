/**
 * Copyright @ 2020 Esri.
 * All rights reserved under the copyright laws of the United States and applicable international laws, treaties, and conventions.
 */
define(["dojo/text!./JetTrailMaterial.xml","dojo/_base/declare","../../webgl-engine-extensions/GLSLShader","../../webgl-engine-extensions/GLSLProgramExt","../../support/fx3dUtils","../Materials"],function(t,e,i,s,r,n){var a=e([n],{declaredClass:"esri.views.3d.effects.JetTrail.JetTrailMaterial",constructor:function(t){this._gl=t.gl,this._shaderSnippets=t.shaderSnippets,this._program=null,this._pulseProgram=null,this._pushState=t.pushState,this._restoreState=t.restoreState,this._srcAlpha=770,this._dstAlpha=771,this._viewingMode=t.viewingMode,"local"==t.viewingMode&&(this._srcAlpha=770,this._dstAlpha=771)},destroy:function(){this._program&&(this._program.dispose(),delete this._program,this._program=null),this._pulseProgram&&(this._pulseProgram.dispose(),delete this._pulseProgram,this._pulseProgram=null)},_addDefines:function(t,e){var i="";if(null!=e)if(Array.isArray(e))for(var s=0,r=e.length;s<r;s++){var n=e[s];i+="#define "+n+"\n"}else for(var n in e)i+="#define "+n+"\n";return this._shaderSnippets.defines+"\n"+i+t},loadShaders:function(e){if(this._shaderSnippets){null!=this._shaderSnippets.jetTrailVS&&null!=this._shaderSnippets.jetTrailFS||this._shaderSnippets._parse(t);var r=[];"global"==this._viewingMode?r.push("GLOBAL"):r.push("LOCAL");var n=this._addDefines(this._shaderSnippets.jetTrailVS,r),a=new i(35633,n,this._gl),l=new i(35632,this._shaderSnippets.jetTrailFS,this._gl);this._program=new s([a,l],this._gl),null!=this._shaderSnippets.jetTrailPulseVS&&null!=this._shaderSnippets.jetTrailPulseFS||this._shaderSnippets._parse(t),n=this._addDefines(this._shaderSnippets.jetTrailPulseVS,r),a=new i(35633,n,this._gl),l=new i(35632,this._shaderSnippets.jetTrailPulseFS,this._gl),this._pulseProgram=new s([a,l],this._gl)}return this._initResources()},getProgram:function(){return this._program},_initResources:function(){return!0},bind:function(t,e){this._program.use(),this._program.uniformMatrix4fv("ss",t.proj),this._program.uniformMatrix4fv("ls",t.view),this._program.uniform3fv("pl",t.camPos),this._program.uniform3fv("es",t.lightingData.direction),this._program.uniform4fv("sl",t.lightingData.ambient),this._program.uniform4fv("ps",t.lightingData.diffuse),this._program.uniform4fv("le",t.lightingData.specular),this._oldTex=this._gl.getParameter(32873);var i=this.getOldActiveUnit(e);t.oo.bind(i+1),this._program.uniform1i("oo",i+1),this._program.uniform2fv("pm",t.pm),this._program.uniform2fv("mi",[t.mi,t.ml]),t.mo.bind(i+2),this._program.uniform1i("mo",i+2),this._program.uniform2fv("io",t.io),this._gl.activeTexture(33984+i+3),this._gl.bindTexture(3553,t.so),this._program.uniform1i("so",i+3),this._gl.activeTexture(33984+i+4),this._gl.bindTexture(3553,t.lm),this._program.uniform1i("lm",i+4),this._program.uniform1f("mm",t.mm),this._program.uniform1f("lp",t.lp),this._program.uniform1f("ms",t.ms),this._program.uniform1f("lo",t.time),0!=e._depthWriteEnabled&&(this._pushState(["setDepthWriteEnabled",e._depthWriteEnabled]),e.setDepthWriteEnabled(!1)),1!=e._polygonCullingEnabled&&(this._pushState(["setFaceCullingEnabled",e._polygonCullingEnabled]),e.setFaceCullingEnabled(!0)),1!=e._depthTestEnabled&&(this._pushState(["setDepthTestEnabled",e._depthTestEnabled]),e.setDepthTestEnabled(!0)),1!=e._blendEnabled&&(this._pushState(["setBlendingEnabled",e._blendEnabled]),e.setBlendingEnabled(!0))},bindPulse:function(t,e){this._pulseProgram.use(),this._pulseProgram.uniformMatrix4fv("ss",t.proj),this._pulseProgram.uniformMatrix4fv("ls",t.view),this._pulseProgram.uniform3fv("pl",t.camPos),this._pulseProgram.uniform3fv("es",t.lightingData.direction),this._pulseProgram.uniform4fv("sl",t.lightingData.ambient),this._pulseProgram.uniform4fv("ps",t.lightingData.diffuse),this._pulseProgram.uniform4fv("le",t.lightingData.specular);var i=e._activeTextureUnit;i>e.parameters.maxVertexTextureImageUnits-1-2&&(console.warn("Many textures are binded now, 3DFx lib may be work abnormally."),i=0),t.oo.bind(i+1),this._pulseProgram.uniform1i("oo",i+1),this._pulseProgram.uniform2fv("pm",t.pm),this._pulseProgram.uniform2fv("mi",[t.mi,t.ml]),this._gl.activeTexture(33984+i+2),this._gl.bindTexture(3553,t.lm),this._pulseProgram.uniform1i("lm",i+2),this._pulseProgram.uniform1f("mm",t.mm),this._pulseProgram.uniform2fv("li",t.li),this._pulseProgram.uniform1f("ms",t.ms),this._pulseProgram.uniform1f("lo",t.time),519!=e._depthFunction&&(this._pushState(["setDepthFunction",e._depthFunction]),e.setDepthFunction(519)),1!=e._blendEnabled&&(this._pushState(["setBlendingEnabled",e._blendEnabled]),e.setBlendingEnabled(!0))},blend:function(t,e){t?t&&(this._pushState(["setBlendFunctionSeparate",[e._blendFunctionState.srcRGB,e._blendFunctionState.dstRGB,e._blendFunctionState.srcAlpha,e._blendFunctionState.dstAlpha]]),e.setBlendFunction(770,771)):(this._pushState(["setBlendFunctionSeparate",[e._blendFunctionState.srcRGB,e._blendFunctionState.dstRGB,e._blendFunctionState.srcAlpha,e._blendFunctionState.dstAlpha]]),e.setBlendFunction(this._srcAlpha,this._dstAlpha))},release:function(t){this._gl.activeTexture(33984+t._activeTextureUnit+1),this._gl.bindTexture(3553,this._oldTex),this._restoreState(t),this._gl.useProgram(null)}});return a});