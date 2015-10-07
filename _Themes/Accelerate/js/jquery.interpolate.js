/*jslint devel: true, bitwise: true, regexp: true, browser: true, confusion: true, unparam: true, eqeq: true, white: true, nomen: true, plusplus: true, maxerr: 50, indent: 4 */
/*globals jQuery */

/*!
 * Interpolate
 *
 * Copyright (c) 2013 Martijn W. van der Lee
 * Licensed under the MIT.
 */
/* CSS style interpolation.
 * Requires jQuery 1.8+.
 * Optionally jQueryUI for color support
 */

!function(n,e){"use strict";n.fn.interpolate=function(t,i,r,a){var u=this[0];n.isPlainObject(t)?(a=r||"linear",r=i===e?.5:i,n.each(t,function(e,t){n.Tween(u,{duration:1},e,t,a).run(r)})):(r=r===e?.5:r,n.Tween(u,{duration:1},t,i,a||"linear").run(r))},n.interpolate=function(e,t,i,r){var a=n("<span/>"),u=n.extend({},e);return a.css(u).interpolate(t,i,r),n.each(t,function(n){u[n]=a.css(n)}),u}}(jQuery);