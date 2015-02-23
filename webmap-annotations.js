// ==UserScript==
// @name        7DTD Webmap Annotations
// @namespace   http://fienen.com
// @include     http://*/static/index.html
// @version     0.1
// ==/UserScript==

// ===============================================================================================
// Add Marker control

L.Control.AddMarker = L.Control.extend({
	options: {
		position: 'bottomleft'
	},

	onAdd: function (map) {
		var name = 'control-addmarker',
		    container = L.DomUtil.create('div', name + ' leaflet-bar');

		this._map = map;

		this._reloadbutton = this._createButton(
			"Add Marker", "Add Marker",
			name + "-btn", container, this._reload, this);

		return container;
	},

	onRemove: function (map) {
	},

	_reload: function (e) {
		tileTime = new Date().getTime();
		tileLayer.redraw();
		tileLayerMiniMap.redraw();
	},

	_createButton: function (html, title, className, container, fn, context) {
		var link = L.DomUtil.create('a', className, container);
		link.innerHTML = html;
		link.href = '#';
		link.title = title;

		var stop = L.DomEvent.stopPropagation;

		L.DomEvent
		    .on(link, 'click', stop)
		    .on(link, 'mousedown', stop)
		    .on(link, 'dblclick', stop)
		    .on(link, 'click', L.DomEvent.preventDefault)
		    .on(link, 'click', fn, context)
		    .on(link, 'click', this._refocusOnMap, context);

		return link;
	}

});

new L.Control.AddMarker({
}).addTo(map);