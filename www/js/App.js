!function(t){var e={};function i(s){if(e[s])return e[s].exports;var n=e[s]={i:s,l:!1,exports:{}};return t[s].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=t,i.c=e,i.d=function(t,e,s){i.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},i.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,e){if(1&e&&(t=i(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(i.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)i.d(s,n,function(e){return t[e]}.bind(null,n));return s},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},i.p="",i(i.s=5)}([function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.sFWindow=void 0;const s=i(9),n=i(10);e.sFWindow=class{constructor(t){this._=Object.assign({title:"",x:0,y:0,width:400,height:400},t),this.createDom()}css(t,e){for(let i in t)e.style[i]=t[i]}cElt(t){return document.createElement(t)}set x(t){this._.x=t,this.update()}set y(t){this._.y=t,this.update()}set width(t){this._.width=t,this.update()}set height(t){this._.height=t,this.update()}update(){this.dom.style.width=this._.width+"px",this.dom.style.height=this._.height+"px",this.dom.style.left=this._.x+"px",this.dom.style.top=this._.y+"px"}createDom(){this.dom=document.createElement("div"),this.id=performance.now().toString(),this.dom.setAttribute("id",this.id),this.dom.style.width=this._.width+"px",this.dom.style.height=this._.height+"px",this.dom.style.left=this._.x+"px",this.dom.style.top=this._.y+"px",this.dom.style.backgroundColor="#252526",this.dom.style.position="fixed",this.dom.style.zIndex="10000",this.dom.style.boxShadow="4px 3px 5px 1px rgba(0,0,0,0.20)";const t=document.createElement("div");this.css({height:"20px",backgroundColor:"#007acc",position:"absolute",right:"0px",left:"0px",bottom:"0px"},t),this.dom.appendChild(t);const e=document.createElement("div");this.css({width:"20px",height:"20px",backgroundColor:"#007acc",position:"absolute",right:"0px",bottom:"0px",cursor:"se-resize"},e),this.dom.appendChild(e),e.appendChild(n.createIcon(n.IconResize,{transform:"scaleX(-.8) scaleY(.8)"}));const i=document.createElement("div");this.css({height:"30px",backgroundColor:"#323233",position:"absolute",right:"0px",left:"0px",top:"0px",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Segoe WPC,Segoe UI,sans-serif",color:"rgb(255 255 255 / 0.5)",userSelect:"none"},i),this.dom.appendChild(i);const r=document.createElement("span");r.innerText=this._.title,this.css({whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},r),i.appendChild(r),this.titleDom=r;const o=document.createElement("div");this.css({backgroundColor:"#252526",position:"absolute",right:"0px",left:"0px",top:"30px",bottom:"20px",display:"flex",justifyContent:"stretch",fontFamily:"Segoe WPC,Segoe UI,sans-serif",borderLeft:"1px dashed #323233",borderRight:"1px dashed #323233",color:"rgb(255 255 255 / 0.5)"},o),o.classList.add("sFScrollable"),this.dom.appendChild(o),this.contentDom=o;new s.DragNDrogManager(this.dom,i,this,e)}}},function(t,e,i){"use strict";var s=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))((function(n,r){function o(t){try{l(s.next(t))}catch(t){r(t)}}function a(t){try{l(s.throw(t))}catch(t){r(t)}}function l(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}l((s=s.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0}),e.Dispatcher=void 0;const n=i(7),r=i(8),o=i(2),a=n.constantTree({DISPATCHER:{CYCLE:{START:"",END:"",RETREIVE_STORE_LIST:"",ABORT_ALREADY_RUNNING:"",START_PROCESSING:"",ANOTHER_CYCLE_PENDING:""},DISPATCH:{RECEIVE_PAYLOAD:"",SET_DEBUG_STATUS:""},STORE:{START_WAITING:"",CHECK_ACTION_NAME:"",WILL_PROCESS:"",WILL_NOT_PROCESS:"",EMIT:"",NEXT_STATE:"",REGISTERING_NEW:"",SEND_ACTION:""}}},"DEBUG");e.Dispatcher=class{constructor(){this._StoreHash={},this._payloads=[],this._currentPayload=null,this._cycle={},this._IsCycleRunning=!1,this._EvtBus=new r.EventBus(".",4),this._DebugMode=!1,this._DebugOrder=0,this._DebugCycleIdx=0}emitDbg(t,e){this._DebugMode&&this._EvtBus.emitAsync(t,{cycle:this._DebugCycleIdx,order:this._DebugOrder++,event:t,timestamp:(new Date).getTime(),data:e})}dispatch(t){return this.emitDbg(a.DISPATCHER.DISPATCH.RECEIVE_PAYLOAD,t),"SET_DEBUG_MODE_ON"===t.type?(this._DebugMode=!0,void this.emitDbg(a.DISPATCHER.DISPATCH.SET_DEBUG_STATUS,!0)):"SET_DEBUG_MODE_OFF"===t.type?(this.emitDbg(a.DISPATCHER.DISPATCH.SET_DEBUG_STATUS,!1),void(this._DebugMode=!1)):(this._payloads.push(t),void this.processNextCycle())}wait(t){return new Promise(e=>setTimeout(()=>e(),t))}registerStore(t,e){const i=this;if(t.id=null!=e?e:o.Guid.getGuid(),this.emitDbg(a.DISPATCHER.STORE.REGISTERING_NEW,t.id),t.nextState=function(e,s){this.state=s?Object.assign(Object.assign({},this.state),e):e,i.emitDbg(a.DISPATCHER.STORE.NEXT_STATE,{storeId:t.id,state:e,mergeToPreviousState:s})},t.sendAction=(e,s)=>{i.emitDbg(a.DISPATCHER.STORE.SEND_ACTION,{storeId:t.id,type:e,payload:s}),this.dispatch(Object.assign({type:e},s))},t.id in this._StoreHash)throw Error(`A store named ${t.id} already exists, maybe you are trying to add the same store several times...`);this._StoreHash[t.id]=t}processNextCycle(){var t,e;return s(this,void 0,void 0,(function*(){const i=this;if(this._IsCycleRunning||0===this._payloads.length)return void this.emitDbg(a.DISPATCHER.CYCLE.ABORT_ALREADY_RUNNING);this._IsCycleRunning=!0,this._currentPayload=this._payloads.shift(),this.emitDbg(a.DISPATCHER.CYCLE.START,this._currentPayload),this._cycle={};const n=[],r={};function o(t,e){if(i.emitDbg(a.DISPATCHER.STORE.START_WAITING,{sourceId:t,targetIds:e}),e.includes(t))throw Error(t+" cannot wait for itself to finish berofe it can finish... Cycling dependency detected.");if(t in r)throw Error(t+" already waiting in this current cycle, and it cannot wait a second time");e.forEach(e=>{if(e in r&&r[e].includes(t))throw Error(`Cycling dependency detected, store ${t} is trying to wait for store ${e} to finish, but ${e} is already waiting for ${t} to finish first`)}),r[t]=e}this.emitDbg(a.DISPATCHER.CYCLE.RETREIVE_STORE_LIST);for(const i in this._StoreHash){const r=this._StoreHash[i],l=null!==(e=null===(t=r.mappedActions)||void 0===t?void 0:t[this._currentPayload.type])&&void 0!==e?e:this._currentPayload.type;if(this.emitDbg(a.DISPATCHER.STORE.CHECK_ACTION_NAME,{storeId:r.id,payloadAction:this._currentPayload.type,selectedAction:l}),l in r)this.emitDbg(a.DISPATCHER.STORE.WILL_PROCESS,{storeId:r.id,willProcess:l}),this._cycle[i]=(()=>s(this,void 0,void 0,(function*(){const t=yield r[l](this._currentPayload,(...t)=>s(this,void 0,void 0,(function*(){o(i,t);for(const e of t)for(;!this._cycle[e];)yield this.wait(0);return Promise.all(t.map(t=>this._cycle[t]))})));return{id:r.id,result:t}})))();else if("dispatchHandler"in r){const t=this._StoreHash[i];this._cycle[i]=(()=>s(this,void 0,void 0,(function*(){const e=yield t.dispatchHandler(this._currentPayload,(...t)=>s(this,void 0,void 0,(function*(){o(i,t);for(const e of t)for(;!this._cycle[e];)yield this.wait(0);return Promise.all(t.map(t=>this._cycle[t]))})));return{id:t.id,result:e}})))()}else this.emitDbg(a.DISPATCHER.STORE.WILL_NOT_PROCESS,{storeId:r.id,willNotProcess:l}),this._cycle[i]=new Promise(t=>t({id:r.id,result:null}));n.push(this._cycle[i])}try{this.emitDbg(a.DISPATCHER.CYCLE.START_PROCESSING);(yield Promise.all(n)).forEach(t=>{var e,i,s,n;null!==t.result?(this._EvtBus.emitAsync(`STORE.${t.id}.EMIT.ALL`,this._StoreHash[t.id].state),this.emitDbg(a.DISPATCHER.STORE.EMIT,{storeId:t.id,event:`STORE.${t.id}.EMIT.ALL`,state:this._StoreHash[t.id].state,subscribers:null!==(i=null===(e=this._EvtBus._Emitter_.onPool[`STORE.${t.id}.EMIT.ALL`])||void 0===e?void 0:e.length)&&void 0!==i?i:0}),"string"==typeof t.result&&"ALL"!==t.result&&(this._EvtBus.emitAsync(`STORE.${t.id}.EMIT.${t.result}`,this._StoreHash[t.id].state),this.emitDbg(a.DISPATCHER.STORE.EMIT,{storeId:t.id,event:`STORE.${t.id}.EMIT.${t.result}`,state:this._StoreHash[t.id].state,subscribers:null!==(n=null===(s=this._EvtBus._Emitter_.onPool[`STORE.${t.id}.EMIT.${t.result}`])||void 0===s?void 0:s.length)&&void 0!==n?n:0})),Array.isArray(t.result)&&t.result.filter(t=>"ALL"!==t).forEach(e=>{var i,s;this._EvtBus.emitAsync(`STORE.${t.id}.EMIT.${e}`,this._StoreHash[t.id].state),this.emitDbg(a.DISPATCHER.STORE.EMIT,{storeId:t.id,event:`STORE.${t.id}.EMIT.${e}`,state:this._StoreHash[t.id].state,subscribers:null!==(s=null===(i=this._EvtBus._Emitter_.onPool[`STORE.${t.id}.EMIT.${e}`])||void 0===i?void 0:i.length)&&void 0!==s?s:0})})):this.emitDbg(a.DISPATCHER.STORE.EMIT,{storeId:t.id,event:`STORE.${t.id}.EMIT.--`,state:this._StoreHash[t.id].state,subscribers:0})})}catch(t){console.error(t)}finally{this._IsCycleRunning=!1,this.emitDbg(a.DISPATCHER.CYCLE.END),this._DebugCycleIdx++,this._payloads.length>0&&(yield this.wait(0),this.emitDbg(a.DISPATCHER.CYCLE.ANOTHER_CYCLE_PENDING),this.processNextCycle())}}))}subscribe(t,e,i="ALL"){return this._EvtBus.on(`STORE.${t}.EMIT.${i}`,e)}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Guid=void 0;class s{constructor(){const[t,e]=s.generate4bytesNumber(),[i,n]=s.generate2bytesNumber(),[r,o]=s.generate2bytesNumber(),[a,l]=s.generate2bytesNumber(),[c,d]=s.generate6bytesNumber();this._Guid_={part1:t,part2:i,part3:r,part4:a,part5:c,toString:`${e}-${n}-${o}-${l}-${d}`}}static generate2bytesNumber(){const t=Math.round(65535*Math.random());return[t,s.pad(t.toString(16),4)]}static generate4bytesNumber(){const t=Math.round(4294967295*Math.random());return[t,s.pad(t.toString(16),8)]}static generate6bytesNumber(){const t=Math.round(0xffffffffffff*Math.random());return[t,s.pad(t.toString(16),12)]}static pad(t,e){var i="";for(let t=0;t<e;t++)i+="0";return(i+t).substr(-e)}get part1(){return this._Guid_.part1}get part2(){return this._Guid_.part2}get part3(){return this._Guid_.part3}get part4(){return this._Guid_.part4}get part5(){return this._Guid_.part5}toString(){return this._Guid_.toString}static getGuid(){return(new s).toString()}}e.Guid=s},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.registerStore=e.withEvents=e.BaseStore=void 0;const s=i(1),n=i(2),r=i(4);class o{constructor(){this.id="",this.init=()=>{},this.nextState=(t,e)=>{},this.sendAction=(t,e)=>{}}getState(){return this.state}}e.BaseStore=o,e.withEvents=function(t){for(const e in t)t[e]=e;return t};const a=new s.Dispatcher;e.registerStore=function(t){const e=this;e.__dispatcher||(e.__dispatcher=new s.Dispatcher);const i=new o;i.mappedActions=t.mappedActions,t.id||(t.id=n.Guid.getGuid()),e.__dispatcher.registerStore(i,t.id);const r={};for(const s in t.actions)r[s]=i=>{e.__dispatcher.dispatch(Object.assign({type:t.localActions?`${t.id}-${s}`:s},i))},i[t.localActions?`${t.id}-${s}`:s]=t.actions[s];t.dispatchHandler&&(i.dispatchHandler=t.dispatchHandler);const a={};for(const s in t.events)a[s]=t=>e.__dispatcher.subscribe(i.id,t,s);return a.All=t=>e.__dispatcher.subscribe(i.id,t,"ALL"),t.init&&(i.init=t.init,i.init()),t.nextState&&(i.nextState=t.nextState),{id:i.id,actions:r,subscribeTo:a,getState:()=>i.state}}.bind({__dispatcher:a}),r.sFDebugger.evtBus=a._EvtBus,r.sFDebugger._dispatcher=a},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.sFDebugger=void 0;const s=i(0),n=i(11),r=i(12),o=i(13);const a=new class{getEvent(t,e){return e.filter(e=>e.event.endsWith(t))[0]}getEvents(t,e){return e.filter(e=>e.event.endsWith(t))}chkCycle(t,e){return t.stores[e]||(t.stores[e]={emit:[]}),t.stores[e]}setOn(){n.sfCycle.evtBus=this.evtBus,o.sfTrace.evtBus=this.evtBus,this.events=[],this.cycles=[];var t=document.createElement("style");t.appendChild(document.createTextNode('\n      .sFScrollable::-webkit-scrollbar {-webkit-appearance: none;width: 7px;}\n      .sFScrollable::-webkit-scrollbar-thumb {background-color: #007acc; -webkit-box-shadow: 0 0 1px rgba(255,255,255,.5);}\n      .jsonTree ul>li>ul {display:none;}\n      .jsonTree ul>li.selected>ul{display:block;}\n      .jsonTree li {\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n      }\n      .jsonTree ul {\n        white-space: nowrap;\n        overflow: hidden;\n        text-overflow: ellipsis;\n        padding-left: 15px\n      }\n\n      .jsonTree > ul {\n        overflow: initial;\n      }\n    \n     /* .jsonTree > ul li:before {\n        content:"";\n        padding-left: 15px;\n        border-left: 1px dashed #ffffff22;\n        height: 100%;\n        width: 1px;\n    }*/\n\n    .jsonTree > ul ul {\n      content: "";\n      padding-left: 15px;\n      border-left: 1px dashed #ffffff22;\n      height: 100%;\n  }\n\n    .strColor {\n      color: #00CCB8;\n    }\n\n    .boolColor {\n      color: #7ACC00;\n    }\n\n    .otherColor {\n      color: #CC007A;\n    }\n      ')),document.getElementsByTagName("head")[0].appendChild(t),document.body.appendChild(n.sfCycle.dom),document.body.appendChild(o.sfTrace.dom);const e=new s.sFWindow({title:"Explorer",x:window.innerWidth-400-10,y:10,width:400,height:600});o.sfTrace.height=330,o.sfTrace.width=710,o.sfTrace.x=innerWidth-10-400-10-300,o.sfTrace.y=620,n.sfCycle.height=600,n.sfCycle.width=300,n.sfCycle.x=innerWidth-10-400-10-300,n.sfCycle.y=10,e.css({display:"flex",flexDirection:"column",overflowY:"auto"},e.contentDom),document.body.appendChild(e.dom),this.evtBus.on("DEBUG",t=>{var i,s,a;if(console.log(t),this.events.push(t),"DEBUG.DISPATCHER.CYCLE.END"===t.event){const e=this.events.filter(e=>e.cycle===t.cycle),r={id:t.cycle,type:null===(s=null===(i=this.getEvent("CYCLE.START",e))||void 0===i?void 0:i.data)||void 0===s?void 0:s.type,payload:null===(a=this.getEvent("CYCLE.START",e))||void 0===a?void 0:a.data,stores:{}},o=this.getEvents("STORE.CHECK_ACTION_NAME",e),l=this.getEvents("STORE.START_WAITING",e),c=this.getEvents("STORE.WILL_PROCESS",e),d=this.getEvents("STORE.WILL_NOT_PROCESS",e),h=this.getEvents("STORE.NEXT_STATE",e),u=this.getEvents("STORE.EMIT",e);o.forEach(t=>this.chkCycle(r,t.data.storeId).action=t.data.selectedAction),l.forEach(t=>{var e;return this.chkCycle(r,t.data.sourceId).wait=null!==(e=t.data.targetIds)&&void 0!==e?e:"--"}),c.forEach(t=>this.chkCycle(r,t.data.storeId).will=!0),d.forEach(t=>this.chkCycle(r,t.data.storeId).will=!1),h.forEach(t=>this.chkCycle(r,t.data.storeId).nextState=JSON.parse(JSON.stringify(t.data.state))),u.forEach(t=>this.chkCycle(r,t.data.storeId).emit.push(t.data.event.split(".").pop())),u.forEach(t=>this.chkCycle(r,t.data.storeId).subscribers=t.data.subscribers),console.log(r),this.cycles.push(r),n.sfCycle.addCycle(r)}if("DEBUG.DEBUGGER.CYCLE.SELECT"===t.event){new r.jsonTree(e.contentDom,this.cycles.filter(e=>e.id===t.id)[0].payload,5);const i=this.cycles.filter(e=>e.id===t.id)[0];o.sfTrace.showTrace(i)}"DEBUG.DEBUGGER.CYCLE.EXPLORE"===t.event&&new r.jsonTree(e.contentDom,t.data,5)}),this._dispatcher.dispatch({type:"SET_DEBUG_MODE_ON"})}setOff(){this._dispatcher.dispatch({type:"SET_DEBUG_MODE_OFF"})}};e.sFDebugger=a},function(t,e,i){"use strict";var s=this&&this.__awaiter||function(t,e,i,s){return new(i||(i=Promise))((function(n,r){function o(t){try{l(s.next(t))}catch(t){r(t)}}function a(t){try{l(s.throw(t))}catch(t){r(t)}}function l(t){var e;t.done?n(t.value):(e=t.value,e instanceof i?e:new i((function(t){t(e)}))).then(o,a)}l((s=s.apply(t,e||[])).next())}))};Object.defineProperty(e,"__esModule",{value:!0});const n=i(3),r=n.withEvents({add:""}),o={add(t,e){return s(this,void 0,void 0,(function*(){return yield e(c.id),this.nextState({counter:this.getState().counter+t.howMany}),r.add}))},SET_DEBUG_MODE_ON(){return s(this,void 0,void 0,(function*(){return null}))}},a=n.registerStore({id:"Store-1",actions:o,events:r,init(){this.nextState({counter:0},!0)}}),l={addA(t){return s(this,void 0,void 0,(function*(){return this.nextState({counter:this.getState().counter+t.howMany},!0),r.add}))}},c=n.registerStore({id:"Store-2",localActions:!0,actions:l,events:r,init(){this.nextState({counter:0})},dispatchHandler(t,e){return s(this,void 0,void 0,(function*(){this.nextState(t,!0)}))}});a.actions.add({howMany:3}),c.actions.addA({howMany:99});for(let t=0;t<5;t++)setTimeout(()=>{c.actions.addA({howMany:500*t})},500*t)},,function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.constantTree=void 0,e.constantTree=function t(e,i=""){for(const s in e){const n=`${i}${""!==i?".":""}${s}`;"string"!=typeof e[s]||0!==e[s].length?"object"==typeof e[s]&&t(e[s],n):e[s]=n}return e}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.EventBus=void 0;e.EventBus=class{constructor(t=".",e=3){this._Emitter_={oncePool:{},onPool:{},parent:void 0,Ids:0},""===t.trim()&&(t="."),e<1&&(e=1),this._separator=t,this._depthLevel=e}get _errors(){const t=this;return{get eventNameBadFormat(){return`The event name is not in the correct format :\nShould be in '${t._depthLevel}' part${t._depthLevel>1?"s":""}\n${t._depthLevel>1?"separated by '"+t._separator+"'":""}`}}}checkEventNameFormat(t){return t&&t.trim().length>0&&t.split(this._separator).length<=this._depthLevel||!1}get pools(){return[this._Emitter_.onPool,this._Emitter_.oncePool]}get separator(){return this._separator}set separator(t){""===t.trim()&&(t="."),this._separator=t}get parent(){return this._Emitter_.parent}set parent(t){this._Emitter_.parent=t}get depthLevel(){return this._depthLevel}set depthLevel(t){t<1&&(t=1),this._depthLevel=t}on(t,e){if(!this.checkEventNameFormat(t))throw Error(this._errors.eventNameBadFormat);this._Emitter_.onPool[t]||(this._Emitter_.onPool[t]=[]);let i={id:this._Emitter_.Ids++,callback:e};return this._Emitter_.onPool[t].push(i),this.emit("registerEvent",{eventName:t,callback:e}),{off:()=>this.off(i.id),id:i.id}}once(t,e){if(!this.checkEventNameFormat(t))throw Error(this._errors.eventNameBadFormat);this._Emitter_.oncePool[t]||(this._Emitter_.oncePool[t]=[]);let i={id:this._Emitter_.Ids++,callback:t=>{this.off(i.id),e(t)},originalCallback:e};return this._Emitter_.oncePool[t].push(i),this.emit("registerEvent",{eventName:t,callback:i.callback}),{off:()=>this.off(i.id),id:i.id}}off(...t){let e=void 0,i=void 0,s=void 0;if(0===t.length||!t)return this._Emitter_.oncePool={},void(this._Emitter_.onPool={});if(1===t.length)switch(typeof t[0]){case"string":e=t[0];break;case"number":s=t[0];break;default:i=t[0]}else e=t[0],i=t[1],s=t[2]||void 0;if(e&&"string"==typeof e){const t=e;this.pools.forEach(e=>{let s=e[t]||[];i&&(s=s.filter(t=>t.originalCallback?t.originalCallback===i:t.callback===i)),s.forEach(i=>{e[t]=e[t].filter(t=>t.id!==i.id)})})}else[this._Emitter_.onPool,this._Emitter_.oncePool].forEach(t=>{for(let e in t){let n=t[e];s&&(n=n.filter(t=>t.id===s)),i&&(n=n.filter(t=>t.originalCallback?t.originalCallback===i:t.callback===i)),n.forEach(i=>{t[e]=t[e].filter(t=>t.id!==i.id)})}})}emit(t,e){return"allEvents"!==t&&this.emit("allEvents",{eventName:t,data:e}),this.pools.forEach(i=>{for(const s in i){const n=s.split(this._separator),r=t.split(this._separator);for(;r.length>0&&n.length<r.length;)r.pop();"string"==typeof s&&n.join()===r.join()&&i[s].forEach(i=>{"allEvents"!==t&&this.emit("allEvents",{eventName:"callback."+t,data:i.id}),i.callback(e)})}}),this._Emitter_.parent&&this._Emitter_.parent.emit(t,e),!0}emitAsync(t,e){return setTimeout(()=>{this.pools.forEach(i=>{for(const s in i){const n=s.split(this._separator),r=t.split(this._separator);for(;r.length>0&&n.length<r.length;)r.pop();"string"==typeof s&&n.join()===r.join()&&i[s].forEach(t=>t.callback(e))}}),this._Emitter_.parent&&this._Emitter_.parent.emitAsync(t,e),"allEvents"!==t&&this.emitAsync("allEvents",{eventName:t,data:e})},0),!0}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.DragNDrogManager=void 0;e.DragNDrogManager=class{constructor(t,e,i,s){this.source=t,this.sourceDragZone=e,this.parent=i,this._resize=!1;let n=0,r=0,o=i._.x,a=i._.y,l=!1;i._[this.XX()]=o,i._[this.YY()]=a,i.update(),window.addEventListener("dblclick",t=>{this._resize=!this._resize}),window.addEventListener("mousedown",t=>{var o;if(!l){if(t.target===s||t.target.parentElement===s||(null===(o=t.target.parentElement)||void 0===o?void 0:o.parentElement)===s)this._resize=!0;else{if(t.target!==e&&t.target.parentElement!==e)return;this._resize=!1}l=!0,n=t.clientX-i._[this.XX()],r=t.clientY-i._[this.YY()],i._[this.XX()]=t.clientX-n,i._[this.YY()]=t.clientY-r,i.update()}}),t.addEventListener("dragstart",t=>t.preventDefault()),e.addEventListener("dragstart",t=>t.preventDefault()),s.addEventListener("dragstart",t=>t.preventDefault()),window.addEventListener("mouseup",t=>{if(!l)return;l=!1;let e=t.clientX-n,s=t.clientY-r;this._resize||(e=Math.max(10,e),e=Math.min(window.innerWidth-10-this.parent._.width,e),s=Math.max(10,s),s=Math.min(window.innerHeight-10-this.parent._.height,s)),e-=e%10,s-=s%10,o=e,a=s,i._[this.XX()]=o,i._[this.YY()]=a,i.update()}),window.addEventListener("resize",t=>{let e=i._.x,s=i._.y;e=Math.max(10,e),e=Math.min(window.innerWidth-10-this.parent._.width,e),s=Math.max(10,s),s=Math.min(window.innerHeight-10-this.parent._.height,s),e-=e%10,s-=s%10,o=e,a=s,i._.x=o,i._.y=a,i.update()}),window.addEventListener("mousemove",t=>{if(l){let e=t.clientX-n,s=t.clientY-r;this._resize||(e=Math.max(10,e),e=Math.min(window.innerWidth-10-this.parent._.width,e),s=Math.max(10,s),s=Math.min(window.innerHeight-10-this.parent._.height,s)),e-=e%10,s-=s%10,i._[this.XX()]=e,i._[this.YY()]=s,i.update()}})}XX(){return this._resize?"width":"x"}YY(){return this._resize?"height":"y"}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.createIcon=e.IconMaximize=e.IconResize=void 0,e.IconResize='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">\n<metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>\n<g><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"><path d="M7337.8,4974c-69-71-72.9-151.5-9.6-226.3l46-53.7l962.7-9.6l962.7-9.6L7878.6,3242.2C6518.9,1872.9,6457.5,1807.7,6457.5,1742.5c0-97.8,69-164.9,166.8-164.9c71,0,111.2,38.4,1492.1,1419.2C8897,3777.3,9541.4,4415.9,9549,4415.9c9.6,0,15.3-431.5,15.3-957v-957l61.4-51.8c49.9-42.2,74.8-49.9,128.5-40.3c36.4,5.8,84.4,28.8,105.5,49.9c40.3,38.4,40.3,53.7,40.3,1258.1v1219.7l-53.7,46l-53.7,46H8594H7393.4L7337.8,4974z"/><path d="M1883.6-2756.7C1103-3537.3,458.6-4175.9,451-4175.9c-9.6,0-15.3,431.5-15.3,957v957l-61.4,51.8c-49.9,42.2-74.8,49.9-128.5,40.3c-36.4-5.8-84.4-28.8-105.5-49.9c-40.3-38.4-40.3-53.7-40.3-1258.1v-1219.7l53.7-46l53.7-46H1406h1200.5l55.6,55.6c38.4,38.4,55.6,74.8,55.6,117s-17.3,78.6-55.6,117l-55.6,55.6h-951.2c-523.6,0-951.2,5.8-951.2,13.4c0,9.6,638.6,654,1421.1,1436.4c1392.3,1392.3,1421.1,1423,1421.1,1495.9c0,95.9-71,161.1-172.6,161.1C3304.7-1337.5,3251-1389.3,1883.6-2756.7z"/></g></g>\n</svg>',e.IconMaximize='<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve">\n<metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>\n<g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M918.6,3326v-842H509.3H100V-732v-3216h4221.7h4221.7l4.7,776.5l7,778.8l673.6,7l671.3,4.7V893.5V4168H5409.3H918.6V3326z M9638,888.8l-7-3000.8h-537.9h-537.9l-7,2296.8l-4.7,2299.1l-3667.4,4.7l-3665.1,7l-7,697l-4.7,694.7H5421h4221.7L9638,888.8z M8262.8-732v-2958.7L4317-3686L369-3679l-7,2923.6c-2.3,1609.2,0,2937.7,7,2954c7,21.1,821,28.1,3952.7,28.1h3941.1V-732z"/></g></g>\n</svg>',e.createIcon=(t,e)=>{const i=document.createElement("span");if(i.innerHTML=t,i.children[0].setAttribute("fill","white"),e)for(let t in e)i.children[0].style[t]=e[t];return i}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.sfCycle=void 0;const s=i(0);class n extends s.sFWindow{constructor(){super({title:"Cycles",height:450,width:250}),this.css({display:"flex",flexDirection:"column",overflowY:"auto"},this.contentDom)}addCycle(t){const e=document.createElement("div"),i=document.createElement("span");i.innerText=t.type,e.appendChild(i),e.onclick=()=>{var e;null===(e=this.evtBus)||void 0===e||e.emitAsync("DEBUG.DEBUGGER.CYCLE.SELECT",{event:"DEBUG.DEBUGGER.CYCLE.SELECT",id:t.id})},this.css({whiteSpace:"nowrap",textOverflow:"ellipsis",overflow:"hidden",height:"30px",backgroundColor:"#2d2d2d",lineHeight:"30px",textAlign:"center",color:"#ffffffaa",margin:"5px",border:"1px dotted #ffffffaa",flexShrink:"0",userSelect:"none"},e),this.contentDom.prepend(e)}}const r=new n;e.sfCycle=r},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.jsonTree=void 0;e.jsonTree=class{constructor(t,e,i){this.generateTree(t,e),this.classify(t,i)}generateTree(t,e){const i="string"==typeof t?document.querySelector(t):t;i.classList.add("jsonTree"),i.innerHTML=this.json2html(e);i.querySelector('[data-id="top"]').addEventListener("click",t=>{var e,i;const s=t.target;t.preventDefault(),"LI"===(null===(i=null===(e=null==s?void 0:s.nodeName)||void 0===e?void 0:e.toUpperCase)||void 0===i?void 0:i.call(e))&&Array.from(s.childNodes).length>1&&this.toggleClass(s,"selected")})}classify(t,e){this.applyClasses(t,"li","ul",e),this.applyClasses(t,"ul","li",e)}applyClasses(t,e,i,s){const n=this;("string"==typeof t?Array.from(document.querySelectorAll(`${t} ${e}`)):Array.from(t.querySelectorAll(""+e))).forEach((function(t){if(Array.from(t.children).filter(t=>t.tagName.toLowerCase()===i.toLowerCase().toString()).length>0?(t.classList.add("parent"),t.style.cursor="pointer"):t.style.cursor="auto",s){const e=n.depth(t);t.classList.add("depth-"+e)}}))}depth(t){var e;return"top"===(null===(e=null==t?void 0:t.parentElement)||void 0===e?void 0:e.getAttribute("data-id"))?null==t?0:1+this.depth(t.parentElement):0}getJsonTypeIcon(t){switch(typeof t){case"object":return Array.isArray(t)?`[${t.length}]`:`{${Object.keys(t).length}}`}return""}getColorType(t){switch(typeof t){case"string":return"strColor";case"boolean":return"boolColor";default:return"otherColor"}}json2html(t){let e,i="";for(e in t=this.htmlEscape(JSON.stringify(t)),i+='<ul data-id="top">',t=JSON.parse(t))i+="<li>"+e+": "+this.getJsonTypeIcon(t[e]),"object"==typeof t[e]?i+=this.json2html(t[e]):i+=`<span class="${this.getColorType(t[e])}">${JSON.stringify(t[e])}</span>`,i+="</li>";return i+="</ul>",i}htmlEscape(t){const e={"&":"&amp;","<":"&lt;",">":"&gt;"};return t.replace(/[&<>]/g,(function(t){return e[t]||t}))}toggleClass(t,e){t&&t.classList.toggle(e)}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.sfTrace=void 0;const s=i(0);class n extends s.sFWindow{constructor(){super({title:"Execution plan",height:450,width:250}),this.idx=0,this.css({display:"flex",flexDirection:"column",overflowY:"auto"},this.contentDom)}showTrace(t){var e,i,s,n;const r=this.cElt("table");r.setAttribute("cellspacing","0"),r.appendChild(this.createHeader(["Name","Action","Wait For","New State","Emit","Subscribers"]));for(const o in t.stores){const a=t.stores[o];r.appendChild(this.createRow([o,a.action,(null===(e=a.wait)||void 0===e?void 0:e.join(","))||"--",null!==(i=a.nextState)&&void 0!==i?i:"--",(null===(s=a.emit)||void 0===s?void 0:s.join(","))||"--",null!==(n=a.subscribers)&&void 0!==n?n:"--"]))}this.contentDom.innerHTML="",this.contentDom.appendChild(r)}createRow(t){const e=this.cElt("tr");return t.forEach(t=>{const i=this.cElt("td");if(this.css({textAlign:"center",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},i),this.idx%2==1&&this.css({backgroundColor:"#ffffff1a"},i),"object"==typeof t){const e=document.createElement("div");e.style.textAlign="center",e.style.textDecoration="underline",e.style.cursor="pointer",e.appendChild(document.createTextNode("Explore...")),e.onclick=()=>{this.evtBus.emitAsync("DEBUG.DEBUGGER.CYCLE.EXPLORE",{event:"DEBUG.DEBUGGER.CYCLE.EXPLORE",data:t})},i.appendChild(e)}else i.innerHTML=t;e.appendChild(i)}),this.idx++,e}createHeader(t){const e=this.cElt("tr");return t.forEach(t=>{const i=this.cElt("th");this.css({textAlign:"center",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",borderBottom:"1px solid #ffffff80"},i),i.innerHTML=t,e.appendChild(i)}),e}}const r=new n;e.sfTrace=r}]);