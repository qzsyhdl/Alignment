KISSY.add(function(g,v){function h(a,b){g.isObject(a)||(/^#/i.test(a)?a=g.one(a):/^\./i.test(a)?a=g.all(a):g.one(a)&&(a=!0===b?g.all(a):g.one(a)));if(!0===b){if(null!=a&&1<a.length)return a;throw Error("Align: The number of elements must be greater than one!");}if(null!=a&&0<a.length)return a;throw Error("Align: Element not found");}function m(a){var b=Number.MAX_VALUE;a.each(function(a){a=a.offset().top;a<b&&(b=a)});return b}function n(a){var b=Number.MIN_VALUE;a.each(function(a){a=a.offset().top+
a.height();b<a&&(b=a)});return b}function p(a){var b=Number.MAX_VALUE;a.each(function(a){a=a.offset().left;a<b&&(b=a)});return b}function q(a){var b=Number.MIN_VALUE;a.each(function(a){a=a.offset().left+a.width();b<a&&(b=a)});return b}function r(a){var b=0,c=0,d=0,e=!0,f=0;a.each(function(a){var e=a.width();b<e&&(b=e,c=a.offset().left,d=c+b)});for(var l=0;l<a.length;l++){var k=a.item(l),g=k.offset().left,k=g+k.width();if(c>g||d<k){e=!1;break}}e?f=Math.floor((c+d)/2):(a.each(function(a){f+=a.offset().left+
a.width()/2}),f=Math.floor(f/a.length));return f}function t(a){var b=0,c=0,d=0,e=!0,f=0;a.each(function(a){var e=a.height();b<e&&(b=e,c=a.offset().top,d=c+b)});for(var l=0;l<a.length;l++){var k=a.item(l),g=k.offset().top,k=g+k.height();if(c>g||d<k){e=!1;break}}e?f=Math.floor((c+d)/2):(a.each(function(a){f+=a.offset().top+a.height()/2}),f=Math.floor(f/a.length));return f}function u(a,b){a=Array.prototype.slice.call(a);a.sort(function(a,d){return parseInt(a.style[b],10)>parseInt(d.style[b],10)});return g.all(a)}
return{top:function(a,b){a=h(a,!0);var c=m(a),d=[];a.each(function(a){var b=parseInt(a.css("left"),10),e=parseInt(a.css("top"),10);a.offset({top:c});d.push({node:a,prevX:b,prevY:e,nextX:b,nextY:parseInt(a.css("top"),10)})});if(g.isFunction(b))b(d);else if(void 0!==b)throw Error("Align: callback must be function!");return d},bottom:function(a,b){a=h(a,!0);var c=n(a),d=[];a.each(function(a){var b=parseInt(a.css("left"),10),e=parseInt(a.css("top"),10);a.offset({top:c-a.height()});d.push({node:a,prevX:b,
prevY:e,nextX:b,nextY:parseInt(a.css("top"),10)})});if(g.isFunction(b))b(d);else if(void 0!==b)throw Error("Align: callback must be function!");return d},left:function(a,b){a=h(a,!0);var c=p(a),d=[];a.each(function(a){var b=parseInt(a.css("left"),10),e=parseInt(a.css("top"),10);a.offset({left:c});d.push({node:a,prevX:b,prevY:e,nextX:parseInt(a.css("left"),10),nextY:e})});if(g.isFunction(b))b(d);else if(void 0!==b)throw Error("Align: callback must be function!");return d},right:function(a,b){a=h(a,
!0);var c=q(a),d=[];a.each(function(a){var b=parseInt(a.css("left"),10),e=parseInt(a.css("top"),10);a.offset({left:c-a.width()});d.push({node:a,prevX:b,prevY:e,nextX:parseInt(a.css("left"),10),nextY:e})});if(g.isFunction(b))b(d);else if(void 0!==b)throw Error("Align: callback must be function!");return d},center:function(a,b){a=h(a,!0);var c=r(a),d=[];a.each(function(a){var b=parseInt(a.css("left"),10),e=parseInt(a.css("top"),10);a.offset({left:c-Math.floor(a.width()/2)});d.push({node:a,prevX:b,prevY:e,
nextX:parseInt(a.css("left"),10),nextY:e})});if(g.isFunction(b))b(d);else if(void 0!==b)throw Error("Align: callback must be function!");return d},vertical:function(a,b){a=h(a,!0);var c=t(a),d=[];a.each(function(a){var b=parseInt(a.css("left"),10),e=parseInt(a.css("top"),10);a.offset({top:c-Math.floor(a.height()/2)});d.push({node:a,prevX:b,prevY:e,nextX:b,nextY:parseInt(a.css("top"),10)})});if(g.isFunction(b))b(d);else if(void 0!==b)throw Error("Align: callback must be function!");return d},canvasTop:function(a,
b,c){a=h(a);b=h(b);b=b.offset().top;var d=m(a)-b,e=[];a.each(function(a){var b=parseInt(a.css("left"),10),c=parseInt(a.css("top"),10);a.offset({top:a.offset().top-d});e.push({node:a,prevX:b,prevY:c,nextX:b,nextY:parseInt(a.css("top"),10)})});if(g.isFunction(c))c(e);else if(void 0!==c)throw Error("Align: callback must be function!");return e},canvasBottom:function(a,b,c){a=h(a);b=h(b);var d=n(a),e=b.offset().top+b.height()-d,f=[];a.each(function(a){var b=parseInt(a.css("left"),10),c=parseInt(a.css("top"),
10);a.offset({top:a.offset().top+e});f.push({node:a,prevX:b,prevY:c,nextX:b,nextY:parseInt(a.css("top"),10)})});if(g.isFunction(c))c(f);else if(void 0!==c)throw Error("Align: callback must be function!");return f},canvasLeft:function(a,b,c){a=h(a);b=h(b);b=b.offset().left;var d=p(a)-b,e=[];a.each(function(a){var b=parseInt(a.css("left"),10),c=parseInt(a.css("top"),10);a.offset({left:a.offset().left-d});e.push({node:a,prevX:b,prevY:c,nextX:parseInt(a.css("left"),10),nextY:c})});if(g.isFunction(c))c(e);
else if(void 0!==c)throw Error("Align: callback must be function!");return e},canvasRight:function(a,b,c){a=h(a);b=h(b);var d=q(a),e=b.offset().left+b.width()-d,f=[];a.each(function(a){var b=parseInt(a.css("left"),10),c=parseInt(a.css("top"),10);a.offset({left:a.offset().left+e});f.push({node:a,prevX:b,prevY:c,nextX:parseInt(a.css("left"),10),nextY:c})});if(g.isFunction(c))c(f);else if(void 0!==c)throw Error("Align: callback must be function!");return f},canvasCenter:function(a,b,c){a=h(a);b=h(b);
var d=r(a),e=b.offset().left+Math.floor(b.width()/2)-d,f=[];a.each(function(a){var b=parseInt(a.css("left"),10),c=parseInt(a.css("top"),10);a.offset({left:a.offset().left+e});f.push({node:a,prevX:b,prevY:c,nextX:parseInt(a.css("left"),10),nextY:c})});if(g.isFunction(c))c(f);else if(void 0!==c)throw Error("Align: callback must be function!");return f},canvasVertical:function(a,b,c){a=h(a);b=h(b);var d=t(a),e=b.offset().top+Math.floor(b.height()/2)-d,f=[];a.each(function(a){var b=parseInt(a.css("left"),
10),c=parseInt(a.css("top"),10);a.offset({top:a.offset().top+e});f.push({node:a,prevX:b,prevY:c,nextX:b,nextY:parseInt(a.css("top"),10)})});if(g.isFunction(c))c(f);else if(void 0!==c)throw Error("Align: callback must be function!");return f},sortCenter:function(a,b,c){a=h(a,!0);b=parseInt(b,10);var d=[];if(isNaN(b))throw Error("Align: space must be number!");a=u(a,"left");a.each(function(c,f){var e=a.item(f-1),g=parseInt(c.css("left"),10),h=parseInt(c.css("top"),10);f&&c.offset({left:e.offset().left+
e.width()+b});d.push({node:c,prevX:g,prevY:h,nextX:parseInt(c.css("left"),10),nextY:h})});if(g.isFunction(c))c(d);else if(void 0!==c)throw Error("Align: callback must be function!");return d},sortVertical:function(a,b,c){a=h(a,!0);b=parseInt(b,10);var d=[];if(isNaN(b))throw Error("Align: space must be number!");a=u(a,"top");a.each(function(c,f){var e=a.item(f-1),g=parseInt(c.css("left"),10),h=parseInt(c.css("top"),10);f&&c.offset({top:e.offset().top+e.height()+b});d.push({node:c,prevX:g,prevY:h,nextX:g,
nextY:parseInt(c.css("top"),10)})});if(g.isFunction(c))c(d);else if(void 0!==c)throw Error("Align: callback must be function!");return d}}},{requires:["node"]});