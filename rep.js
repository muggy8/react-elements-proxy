var REP = (function(){
	var reactElementSymbol = React.createElement("div", {}).$$typeof
    var proxyProto = new Proxy(Object.prototype, {
        get: function(proto, prop, context){
            if (proto[prop]){
                Object.defineProperty(mask, prop, {
                    value: proto[prop]
                })
                return mask[prop]
            }
            else {
                // if we got here we know that this prop isn't in the mask or the elements object so we can create it
                return context[prop] = function(){
					var args = Array.prototype.slice.call(arguments)
					if (
						!Object.prototype.hasOwnProperty.call(args, "0") ||
						args[0].$$typeof === reactElementSymbol ||
						(typeof args[0] !== "object" && args[0]) ||
                        Array.isArray(args[0])
					){
						args.unshift({})
					}
					args.unshift(prop)
                    return React.createElement.apply(React, args)
                }
            }
        }
    })
    var mask = Object.create(proxyProto)
    Object.getOwnPropertyNames(Object.prototype).forEach(function(name){
        Object.defineProperty(mask, name, {
            value: Object.prototype[name]
        })
    })
})()
if (typeof module !== 'undefined'){
    module.exports = REP
}
