var REP = (function(){
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
                return context[prop] = function(attrOrChildren = null, children){
                    var attr = attrOrChildren
                    if (!children){
                        children = attrOrChildren
                        attr = null
                    }
                    return React.createElement(prop, attrOrChildren, children)
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
    return Object.assign(Object.create(mask), React.DOM)
})()
if (typeof module !== 'undefined'){
    module.exports = REP
}
