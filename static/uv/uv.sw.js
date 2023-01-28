(()=>{"use strict";class e extends u{constructor(e=__uv$config){super(),e.bare||(e.bare="/bare/"),this.addresses="string"==typeof e.bare?[new URL(e.bare,location)]:e.bare.map((e=>new URL(e,location))),this.headers={csp:["cross-origin-embedder-policy","cross-origin-opener-policy","cross-origin-resource-policy","content-security-policy","content-security-policy-report-only","expect-ct","feature-policy","origin-isolation","strict-transport-security","upgrade-insecure-requests","x-content-type-options","x-download-options","x-frame-options","x-permitted-cross-domain-policies","x-powered-by","x-xss-protection"],forward:["accept-encoding","connection","content-length"]},this.method={empty:["GET","HEAD"]},this.statusCode={empty:[204,304]},this.config=e,this.browser=Ultraviolet.Bowser.getParser(self.navigator.userAgent).getBrowserName(),"Firefox"===this.browser&&(this.headers.forward.push("user-agent"),this.headers.forward.push("content-type"))}async fetch({request:e}){if(!e.url.startsWith(location.origin+(this.config.prefix||"/service/")))return fetch(e);try{const n=new Ultraviolet(this.config);"function"==typeof this.config.construct&&this.config.construct(n,"service");const i=await n.cookie.db();n.meta.origin=location.origin,n.meta.base=n.meta.url=new URL(n.sourceUrl(e.url));const o=new r(e,this,n,this.method.empty.includes(e.method.toUpperCase())?null:await e.blob());if("blob:"===n.meta.url.protocol&&(o.blob=!0,o.base=o.url=new URL(o.url.pathname)),e.referrer&&e.referrer.startsWith(location.origin)){const t=new URL(n.sourceUrl(e.referrer));(o.headers.origin||n.meta.url.origin!==t.origin&&"cors"===e.mode)&&(o.headers.origin=t.origin),o.headers.referer=t.href}const a=await n.cookie.getCookies(i)||[],u=n.cookie.serialize(a,n.meta,!1);"Firefox"===this.browser&&"iframe"!==e.destination&&"document"!==e.destination&&o.forward.shift(),u&&(o.headers.cookie=u),o.headers.Host=o.url.host;const h=new s(o,null,null);if(this.emit("request",h),h.intercepted)return h.returnValue;const c=await fetch(o.send);if(500===c.status)return Promise.reject("");const l=new t(o,c,this),d=new s(l,null,null);if(this.emit("beforemod",d),d.intercepted)return d.returnValue;for(const e of this.headers.csp)l.headers[e]&&delete l.headers[e];if(l.headers.location&&(l.headers.location=n.rewriteUrl(l.headers.location)),l.headers["set-cookie"]&&(Promise.resolve(n.cookie.setCookies(l.headers["set-cookie"],i,n.meta)).then((()=>{self.clients.matchAll().then((function(e){e.forEach((function(e){e.postMessage({msg:"updateCookies",url:n.meta.url.href})}))}))})),delete l.headers["set-cookie"]),l.body)switch(e.destination){case"script":case"worker":l.body=`if (!self.__uv && self.importScripts) importScripts('${__uv$config.bundle}', '${__uv$config.config}', '${__uv$config.handler}');\n`,l.body+=n.js.rewrite(await c.text());break;case"style":l.body=n.rewriteCSS(await c.text());break;case"iframe":case"document":(function(e,t=""){return"text/html"===(Ultraviolet.mime.contentType(t||e.pathname)||"text/html").split(";")[0]})(n.meta.url,l.headers["content-type"]||"")&&(l.body=n.rewriteHtml(await c.text(),{document:!0,injectHead:n.createHtmlInject(this.config.handler,this.config.bundle,this.config.config,n.cookie.serialize(a,n.meta,!0),e.referrer)}))}return"text/event-stream"===o.headers.accept&&(l.headers["content-type"]="text/event-stream"),this.emit("response",d),d.intercepted?d.returnValue:new Response(l.body,{headers:l.headers,status:l.status,statusText:l.statusText})}catch(e){return new Response(e.toString(),{status:500})}}getBarerResponse(e){const t={},r=JSON.parse(e.headers.get("x-bare-headers"));for(const e in r)t[e.toLowerCase()]=r[e];return{headers:t,status:+e.headers.get("x-bare-status"),statusText:e.headers.get("x-bare-status-text"),body:this.statusCode.empty.includes(+e.headers.get("x-bare-status"))?null:e.body}}get address(){return this.addresses[Math.floor(Math.random()*this.addresses.length)]}static Ultraviolet=Ultraviolet}self.UVServiceWorker=e;class t{constructor(e,t,r){const{headers:s,status:n,statusText:i,body:o}=e.blob?{status:t.status,statusText:t.statusText,headers:Object.fromEntries([...t.headers.entries()]),body:t.body}:r.getBarerResponse(t);this.request=e,this.raw=t,this.ultraviolet=e.ultraviolet,this.headers=s,this.status=n,this.statusText=i,this.body=o}get url(){return this.request.url}get base(){return this.request.base}set base(e){this.request.base=e}}class r{constructor(e,t,r,s=null){this.ultraviolet=r,this.request=e,this.headers=Object.fromEntries([...e.headers.entries()]),this.method=e.method,this.forward=[...t.headers.forward],this.address=t.address,this.body=s||null,this.redirect=e.redirect,this.credentials="omit",this.mode="cors"===e.mode?e.mode:"same-origin",this.blob=!1}get send(){return new Request(this.blob?"blob:"+location.origin+this.url.pathname:this.address.href+"v1/",{method:this.method,headers:{"x-bare-protocol":this.url.protocol,"x-bare-host":this.url.hostname,"x-bare-path":this.url.pathname+this.url.search,"x-bare-port":this.url.port||("https:"===this.url.protocol?"443":"80"),"x-bare-headers":JSON.stringify(this.headers),"x-bare-forward-headers":JSON.stringify(this.forward)},redirect:this.redirect,credentials:this.credentials,mode:location.origin!==this.address.origin?"cors":this.mode,body:this.body})}get url(){return this.ultraviolet.meta.url}set url(e){this.ultraviolet.meta.url=e}get base(){return this.ultraviolet.meta.base}set base(e){this.ultraviolet.meta.base=e}}class s{#e;#t;constructor(e={},t=null,r=null){this.#e=!1,this.#t=null,this.data=e,this.target=t,this.that=r}get intercepted(){return this.#e}get returnValue(){return this.#t}respondWith(e){this.#t=e,this.#e=!0}}var n,i="object"==typeof Reflect?Reflect:null,o=i&&"function"==typeof i.apply?i.apply:function(e,t,r){return Function.prototype.apply.call(e,t,r)};n=i&&"function"==typeof i.ownKeys?i.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};var a=Number.isNaN||function(e){return e!=e};function u(){u.init.call(this)}u.EventEmitter=u,u.prototype._events=void 0,u.prototype._eventsCount=0,u.prototype._maxListeners=void 0;var h=10;function c(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function l(e){return void 0===e._maxListeners?u.defaultMaxListeners:e._maxListeners}function d(e,t,r,s){var n,i,o,a;if(c(r),void 0===(i=e._events)?(i=e._events=Object.create(null),e._eventsCount=0):(void 0!==i.newListener&&(e.emit("newListener",t,r.listener?r.listener:r),i=e._events),o=i[t]),void 0===o)o=i[t]=r,++e._eventsCount;else if("function"==typeof o?o=i[t]=s?[r,o]:[o,r]:s?o.unshift(r):o.push(r),(n=l(e))>0&&o.length>n&&!o.warned){o.warned=!0;var u=new Error("Possible EventEmitter memory leak detected. "+o.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");u.name="MaxListenersExceededWarning",u.emitter=e,u.type=t,u.count=o.length,a=u,console&&console.warn&&console.warn(a)}return e}function f(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function p(e,t,r){var s={fired:!1,wrapFn:void 0,target:e,type:t,listener:r},n=f.bind(s);return n.listener=r,s.wrapFn=n,n}function v(e,t,r){var s=e._events;if(void 0===s)return[];var n=s[t];return void 0===n?[]:"function"==typeof n?r?[n.listener||n]:[n]:r?function(e){for(var t=new Array(e.length),r=0;r<t.length;++r)t[r]=e[r].listener||e[r];return t}(n):g(n,n.length)}function m(e){var t=this._events;if(void 0!==t){var r=t[e];if("function"==typeof r)return 1;if(void 0!==r)return r.length}return 0}function g(e,t){for(var r=new Array(t),s=0;s<t;++s)r[s]=e[s];return r}Object.defineProperty(u,"defaultMaxListeners",{enumerable:!0,get:function(){return h},set:function(e){if("number"!=typeof e||e<0||a(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");h=e}}),u.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},u.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||a(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},u.prototype.getMaxListeners=function(){return l(this)},u.prototype.emit=function(e){for(var t=[],r=1;r<arguments.length;r++)t.push(arguments[r]);var s="error"===e,n=this._events;if(void 0!==n)s=s&&void 0===n.error;else if(!s)return!1;if(s){var i;if(t.length>0&&(i=t[0]),i instanceof Error)throw i;var a=new Error("Unhandled error."+(i?" ("+i.message+")":""));throw a.context=i,a}var u=n[e];if(void 0===u)return!1;if("function"==typeof u)o(u,this,t);else{var h=u.length,c=g(u,h);for(r=0;r<h;++r)o(c[r],this,t)}return!0},u.prototype.addListener=function(e,t){return d(this,e,t,!1)},u.prototype.on=u.prototype.addListener,u.prototype.prependListener=function(e,t){return d(this,e,t,!0)},u.prototype.once=function(e,t){return c(t),this.on(e,p(this,e,t)),this},u.prototype.prependOnceListener=function(e,t){return c(t),this.prependListener(e,p(this,e,t)),this},u.prototype.removeListener=function(e,t){var r,s,n,i,o;if(c(t),void 0===(s=this._events))return this;if(void 0===(r=s[e]))return this;if(r===t||r.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete s[e],s.removeListener&&this.emit("removeListener",e,r.listener||t));else if("function"!=typeof r){for(n=-1,i=r.length-1;i>=0;i--)if(r[i]===t||r[i].listener===t){o=r[i].listener,n=i;break}if(n<0)return this;0===n?r.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(r,n),1===r.length&&(s[e]=r[0]),void 0!==s.removeListener&&this.emit("removeListener",e,o||t)}return this},u.prototype.off=u.prototype.removeListener,u.prototype.removeAllListeners=function(e){var t,r,s;if(void 0===(r=this._events))return this;if(void 0===r.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==r[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete r[e]),this;if(0===arguments.length){var n,i=Object.keys(r);for(s=0;s<i.length;++s)"removeListener"!==(n=i[s])&&this.removeAllListeners(n);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if("function"==typeof(t=r[e]))this.removeListener(e,t);else if(void 0!==t)for(s=t.length-1;s>=0;s--)this.removeListener(e,t[s]);return this},u.prototype.listeners=function(e){return v(this,e,!0)},u.prototype.rawListeners=function(e){return v(this,e,!1)},u.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):m.call(e,t)},u.prototype.listenerCount=m,u.prototype.eventNames=function(){return this._eventsCount>0?n(this._events):[]}})();
