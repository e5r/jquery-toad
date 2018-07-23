$namespace(1, '@', function (exports) {
    var utils = $require('utils'),
        internals = exports.__internals__ = exports.__internals__ || {};

    internals.PlainObjectCloner = PlainObjectCloner;

    /**
     * Clonador de objetos
     * 
     * @param {object} target - Object to clone
     */
    function PlainObjectCloner(target) {
        this.target = target;
        this.cloning = [];
        this.validTypes = [
            (typeof true),
            (typeof 0),
            (typeof ''),
            (typeof {})
        ];
    }

    PlainObjectCloner.prototype.isValidProp = function (prop) {
        return this.validTypes.indexOf(typeof prop) >= 0;
    }

    PlainObjectCloner.prototype.cloneArray = function (target) {
        if (!utils.isArray(target))
            return;

        var arr = [];

        for (var p in target) {
            var prop = target[p];

            if (!this.isValidProp(prop))
                continue;

            if (this.cloning.indexOf(prop) >= 0)
                throw new Error('Circular reference detected!');

            this.cloning.push(prop);

            if (utils.isArray(prop)) {
                arr.push(this.cloneArray(prop));
            }
            else if (utils.isObject(prop)) {
                arr.push(this.cloneObject(prop));
            } else {
                arr.push(prop);
            }

            var cloningIdx = this.cloning.indexOf(prop);

            this.cloning.splice(cloningIdx, 1);
        }

        return arr;
    }

    PlainObjectCloner.prototype.cloneObject = function () {
        var target = arguments[0] || this.target;

        if (!utils.isObject(target))
            return;

        var clone = {};

        for (var p in target) {
            var prop = target[p];

            if (!this.isValidProp(prop))
                continue;

            if (this.cloning.indexOf(prop) >= 0)
                throw new Error('Circular reference detected!');

            this.cloning.push(prop);

            if (utils.isArray(prop)) {
                clone[p] = this.cloneArray(prop);
            }
            else if (utils.isObject(prop)) {
                clone[p] = this.cloneObject(prop);
            } else {
                clone[p] = prop;
            }

            var cloningIdx = this.cloning.indexOf(prop);

            this.cloning.splice(cloningIdx, 1);
        }

        return clone;
    }
})
