"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('gallery/app', ['exports', 'ember', 'gallery/resolver', 'ember-load-initializers', 'gallery/config/environment'], function (exports, _ember, _galleryResolver, _emberLoadInitializers, _galleryConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _galleryConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _galleryConfigEnvironment['default'].podModulePrefix,
    Resolver: _galleryResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _galleryConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define('gallery/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'gallery/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _galleryConfigEnvironment) {

  var name = _galleryConfigEnvironment['default'].APP.name;
  var version = _galleryConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});
define('gallery/components/image-component', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        classNames: ['col', 's12', 'm4', 'l2', 'image-container'],
        data: null,
        showDate: false,
        showBackground: false
    });
});
define('gallery/components/mountain-section-component', ['exports', 'ember', 'gallery/components/section-component'], function (exports, _ember, _galleryComponentsSectionComponent) {
    exports['default'] = _galleryComponentsSectionComponent['default'].extend({
        showText: function showText() {
            this.set('textState', 'showing');

            return new _ember['default'].RSVP.Promise(function (resolve) {
                setTimeout(resolve, 4500);
            });
        },

        moveText: function moveText() {
            this.set('textState', this.get('textAlign'));

            return _ember['default'].RSVP.resolve().then(this.onMoveText.bind(this)).then(this.hideText.bind(this));
        },

        onMoveText: function onMoveText() {
            return new _ember['default'].RSVP.Promise(function (resolve) {
                setTimeout(resolve, 1500);
            });
        },

        hideText: function hideText() {
            this.set('textState', 'invisible');

            return new _ember['default'].RSVP.Promise(function (resolve) {
                setTimeout(resolve, 10);
            });
        },

        hide: function hide() {
            var _this = this;

            this.set('state', 'hiding');

            return new _ember['default'].RSVP.Promise(function (resolve) {
                setTimeout(function () {
                    _this.set('state', 'hidden');
                    resolve();
                }, 7000);
            });
        }
    });
});
define('gallery/components/romantic-section-component', ['exports', 'ember', 'gallery/components/section-component'], function (exports, _ember, _galleryComponentsSectionComponent) {
    exports['default'] = _galleryComponentsSectionComponent['default'].extend({
        showText: function showText() {
            this.set('textState', 'showing');

            return new _ember['default'].RSVP.Promise(function (resolve) {
                setTimeout(resolve, 5500);
            });
        },

        moveText: function moveText() {
            this.set('textState', this.get('textAlign'));

            return _ember['default'].RSVP.resolve().then(this.onMoveText.bind(this)).then(this.hideText.bind(this));
        },

        onMoveText: function onMoveText() {
            return new _ember['default'].RSVP.Promise(function (resolve) {
                setTimeout(resolve, 500);
            });
        },

        hideText: function hideText() {
            this.set('textState', 'invisible');

            return new _ember['default'].RSVP.Promise(function (resolve) {
                setTimeout(resolve, 10);
            });
        },

        hide: function hide() {
            var _this = this;

            this.set('state', 'hiding');

            return new _ember['default'].RSVP.Promise(function (resolve) {
                setTimeout(function () {
                    _this.set('state', 'hidden');
                    resolve();
                }, 10000);
            });
        }
    });
});
define('gallery/components/section-component', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Component.extend({
        classNameBindings: ['state'],
        tagName: 'section',
        state: 'hidden',
        textState: 'hidden',
        textAlign: '',
        photos: 0,
        photosStates: [],
        text: '',
        onRender: null,

        initText: (function () {
            this.set('text', _ember['default'].String.htmlSafe(this.get('text')));
        }).on('text').on('init'),

        initPhotoStates: (function () {
            var count = this.get('photos'),
                result = [];

            for (var i = 0; i < count; i++) result.push({
                state: 'hidden'
            });

            this.set('photosStates', result);
        }).on('photos').on('init'),

        willRender: function willRender() {
            this.get('onRender')(this.startAnimations.bind(this));
        },

        startAnimations: function startAnimations() {
            return _ember['default'].RSVP.resolve().then(this.show.bind(this)).then(this.showText.bind(this)).then(this.moveText.bind(this)).then(this.showPhotos.bind(this)).then(this.hide.bind(this));
        },

        show: function show() {
            this.set('state', 'visible');

            return new _ember['default'].RSVP.Promise(function (resolve) {
                setTimeout(resolve, 10);
            });
        },

        hide: function hide() {
            var _this = this;

            this.set('state', 'hiding');

            return new _ember['default'].RSVP.Promise(function (resolve) {
                setTimeout(function () {
                    _this.set('state', 'hidden');
                    resolve();
                }, 2000);
            });
        },

        showText: function showText() {
            this.set('textState', 'showing');

            return new _ember['default'].RSVP.Promise(function (resolve) {
                setTimeout(resolve, 4000);
            });
        },

        moveText: function moveText() {
            this.set('textState', this.get('textAlign'));

            return new _ember['default'].RSVP.Promise(function (resolve) {
                setTimeout(resolve, 2500);
            });
        },

        showPhotos: function showPhotos() {
            var count = this.get('photos'),
                promise = _ember['default'].RSVP.resolve();

            for (var i = 0; i < count; i++) promise = promise.then(this.showPhoto.bind(this, i));

            return promise;
        },

        showPhoto: function showPhoto(index) {
            var photo = this.get('photosStates')[index];
            _ember['default'].set(photo, 'state', 'showing');

            return new _ember['default'].RSVP.Promise(function (resolve) {
                setTimeout(resolve, 3500);
            });
        }
    });
});
define("gallery/components/typing-component", ["exports", "ember"], function (exports, _ember) {
    exports["default"] = _ember["default"].Component.extend({
        str: "",
        result: "",
        tagName: "span",

        enterLetter: function enterLetter() {
            var str = this.get('str'),
                char = str[0];

            if (!str.length) return this.stopTyping();

            this.set('str', str.slice(1));
            this.set('result', this.get('result') + char);
        },

        startTyping: (function () {
            setInterval(this.enterLetter.bind(this), 100);
        }).on('didInsertElement'),

        stopTyping: (function () {
            clearInterval(this.get('interval'));
        }).on('willDestroyElement')
    });
});
define('gallery/controllers/array', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define('gallery/controllers/index', ['exports', 'ember'], function (exports, _ember) {
    exports['default'] = _ember['default'].Controller.extend({
        items: [],
        imagesAvaible: false,
        titleState: '',
        imagesState: 'hidden',

        sectionsAnimations: [],

        start: function start() {
            this.loadImages().then(this.hideTitle.bind(this)).then(this.showSections.bind(this)).then(this.showImages.bind(this));
        },

        loadImages: function loadImages() {
            var _this = this;

            var items = this.get('items'),
                promises = items.map(function (item) {
                return _this.loadImage(item.url);
            });

            promises.push(new _ember['default'].RSVP.Promise(function (resolve) {
                setTimeout(resolve, 12000);
            }));

            return _ember['default'].RSVP.all(promises);
        },

        hideTitle: function hideTitle() {
            var _this2 = this;

            this.set('titleState', 'hiding');

            return new _ember['default'].RSVP.Promise(function (resolve) {
                setTimeout(function () {
                    _this2.set('titleState', 'hidden');
                    resolve();
                }, 1000);
            });
        },

        showSections: function showSections() {
            _ember['default'].$('#sound').get(0).play();

            var promise = _ember['default'].RSVP.resolve(),
                items = this.get('sectionsAnimations');

            // items.shift();
            // items.shift();
            // items.shift();

            items.map(function (item) {
                promise = promise.then(item);
            });

            return promise;
        },

        showImages: function showImages() {
            this.set('imagesState', 'visible');

            _ember['default'].run.schedule('afterRender', function () {
                _ember['default'].$('.items').masonry({
                    columnWidth: '.items-sizer',
                    itemSelector: '.item',
                    percentPosition: true
                });
            });
        },

        loadImage: function loadImage(src) {
            return new _ember['default'].RSVP.Promise(function (resolve) {
                var image = new Image();
                image.src = src;
                image.onload = resolve;
            });
        },

        onLoadImages: function onLoadImages() {
            this.set('imagesAvaible', true);
            this.startAnimations();
        },

        startAnimations: function startAnimations() {
            setInterval(this.animateDate.bind(this), 5500);
            setInterval(this.animateImage.bind(this), 3500);
        },

        animateDate: function animateDate() {
            var items = this.get('items'),
                number = this.random();

            _ember['default'].set(items[number], "showDate", !items[number].showDate);

            setTimeout(function () {
                _ember['default'].set(items[number], "showDate", false);
            }, 4000);
        },

        animateImage: function animateImage() {
            var items = this.get('items'),
                item1 = items[this.random()],
                item2 = items[this.random()];

            if (item1 == item2) return;

            var url1 = item1.url,
                url2 = item2.url;

            _ember['default'].set(item1, 'background', url2);
            _ember['default'].set(item2, 'url', url1);
        },

        random: function random() {
            return Math.round(Math.random() * this.get('items').length);
        },

        actions: {
            onSectionRender: function onSectionRender(callback) {
                this.get('sectionsAnimations').push(callback);
            }
        }
    });
});
define('gallery/controllers/object', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = _ember['default'].Controller;
});
define("gallery/helpers/grid-width-helper", ["exports", "ember"], function (exports, _ember) {
    exports.gridWidthHelper = gridWidthHelper;

    function gridWidthHelper(params, config) {
        var length = config.items.length,
            random = Math.round(Math.random() * 10),
            result1 = random % 3 == 0,
            cls = "";

        if (result1) cls += "item-height-2";

        return cls;
    }

    exports["default"] = _ember["default"].Helper.helper(gridWidthHelper);
});
define('gallery/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('gallery/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('gallery/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'gallery/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _galleryConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_galleryConfigEnvironment['default'].APP.name, _galleryConfigEnvironment['default'].APP.version)
  };
});
define('gallery/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('gallery/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('gallery/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.ArrayController.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('gallery/initializers/export-application-global', ['exports', 'ember', 'gallery/config/environment'], function (exports, _ember, _galleryConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_galleryConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var value = _galleryConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_galleryConfigEnvironment['default'].modulePrefix);
      }

      if (!window[globalName]) {
        window[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete window[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('gallery/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('gallery/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('gallery/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("gallery/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('gallery/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('gallery/router', ['exports', 'ember', 'gallery/config/environment'], function (exports, _ember, _galleryConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _galleryConfigEnvironment['default'].locationType
  });

  Router.map(function () {});

  exports['default'] = Router;
});
define('gallery/routes/index', ['exports', 'ember', 'npm:knuth-shuffle'], function (exports, _ember, _npmKnuthShuffle) {
    exports['default'] = _ember['default'].Route.extend({
        model: function model() {
            var items = [{
                id: 1,
                date: "Jan 1, 2016"
            }, {
                id: 2,
                date: "Jan 1, 2016"
            }, {
                id: 3,
                date: "Jan 1, 2016"
            }, {
                id: 4,
                date: "Jan 2, 2016"
            }, {
                id: 5,
                date: "Jan 2, 2016"
            }, {
                id: 6,
                date: "Jan 2, 2016"
            }, {
                id: 7,
                date: "Jan 2, 2016"
            }, {
                id: 8,
                date: "Jan 3, 2016"
            }, {
                id: 9,
                date: "Jan 9, 2016"
            }, {
                id: 10,
                date: "Jan 9, 2016"
            }, {
                id: 11,
                date: "Jan 9, 2016"
            }, {
                id: 12,
                date: "Jan 9, 2016"
            }, {
                id: 13,
                date: "Jan 16, 2016"
            }, {
                id: 14,
                date: "Jan 16, 2016"
            }, {
                id: 15,
                date: "Jan 16, 2016"
            }, {
                id: 16,
                date: "Jan 17, 2016"
            }, {
                id: 17,
                date: "Jan 17, 2016"
            }, {
                id: 18,
                date: "Dec 31, 2015"
            }, {
                id: 19,
                date: "June 3, 2013"
            }, {
                id: 20,
                date: "June 3, 2013"
            }, {
                id: 21,
                date: "Jan 29, 2016"
            }, {
                id: 22,
                date: "Jan 16, 2016"
            }, {
                id: 23,
                date: "Jan 9, 2016"
            }, {
                id: 24,
                date: "Jan 2, 2016"
            }];

            for (var i = 0, item; item = items[i]; i++) item.url = '/assets/images/image_' + item.id + '.jpg';

            return _npmKnuthShuffle['default'].knuthShuffle(items);
        },

        setupController: function setupController(controller, model) {
            controller.set('items', model);
            controller.start();
        }
    });
});
define('gallery/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("gallery/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes", "wrong-type"]
        },
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 3,
            "column": 0
          }
        },
        "moduleName": "gallery/templates/application.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("audio");
        dom.setAttribute(el1, "src", "/assets/audio/oe.mp3");
        dom.setAttribute(el1, "id", "sound");
        dom.setAttribute(el1, "preload", "auto");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 2, 2, contextualElement);
        return morphs;
      },
      statements: [["content", "outlet", ["loc", [null, [2, 0], [2, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("gallery/templates/components/image-component", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 5,
            "column": 0
          }
        },
        "moduleName": "gallery/templates/components/image-component.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element0 = dom.childAt(fragment, [0]);
        var element1 = dom.childAt(fragment, [2]);
        var morphs = new Array(4);
        morphs[0] = dom.createAttrMorph(element0, 'class');
        morphs[1] = dom.createAttrMorph(element0, 'style');
        morphs[2] = dom.createAttrMorph(element1, 'class');
        morphs[3] = dom.createMorphAt(element1, 1, 1);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", ["image ", ["subexpr", "if", [["get", "showDate", ["loc", [null, [1, 23], [1, 31]]]], "hidden"], [], ["loc", [null, [1, 18], [1, 42]]]]]]], ["attribute", "style", ["concat", ["background-image: url(", ["get", "data.url", ["loc", [null, [1, 75], [1, 83]]]], ")"]]], ["attribute", "class", ["concat", ["date ", ["subexpr", "unless", [["get", "showDate", ["loc", [null, [2, 26], [2, 34]]]], "hidden"], [], ["loc", [null, [2, 17], [2, 45]]]]]]], ["content", "data.date", ["loc", [null, [3, 4], [3, 17]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("gallery/templates/components/mountain-section-component", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 4
            },
            "end": {
              "line": 4,
              "column": 4
            }
          },
          "moduleName": "gallery/templates/components/mountain-section-component.hbs"
        },
        isEmpty: false,
        arity: 2,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("    \n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["photo photo-", ["get", "index", ["loc", [null, [3, 34], [3, 39]]]], " ", ["get", "item.state", ["loc", [null, [3, 44], [3, 54]]]]]]]],
        locals: ["item", "index"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 6
          }
        },
        "moduleName": "gallery/templates/components/mountain-section-component.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "photos");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [2]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createAttrMorph(element1, 'class');
        morphs[2] = dom.createMorphAt(element1, 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "photosStates", ["loc", [null, [2, 12], [2, 24]]]]], [], 0, null, ["loc", [null, [2, 4], [4, 13]]]], ["attribute", "class", ["concat", ["text ", ["get", "textState", ["loc", [null, [6, 19], [6, 28]]]]]]], ["content", "text", ["loc", [null, [7, 4], [7, 12]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("gallery/templates/components/romantic-section-component", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 4
            },
            "end": {
              "line": 4,
              "column": 4
            }
          },
          "moduleName": "gallery/templates/components/romantic-section-component.hbs"
        },
        isEmpty: false,
        arity: 2,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("    \n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["photo photo-", ["get", "index", ["loc", [null, [3, 34], [3, 39]]]], " ", ["get", "item.state", ["loc", [null, [3, 44], [3, 54]]]]]]]],
        locals: ["item", "index"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 6
          }
        },
        "moduleName": "gallery/templates/components/romantic-section-component.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "photos");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [2]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createAttrMorph(element1, 'class');
        morphs[2] = dom.createMorphAt(element1, 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "photosStates", ["loc", [null, [2, 12], [2, 24]]]]], [], 0, null, ["loc", [null, [2, 4], [4, 13]]]], ["attribute", "class", ["concat", ["text ", ["get", "textState", ["loc", [null, [6, 19], [6, 28]]]]]]], ["content", "text", ["loc", [null, [7, 4], [7, 12]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("gallery/templates/components/section-component", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
          "loc": {
            "source": null,
            "start": {
              "line": 2,
              "column": 4
            },
            "end": {
              "line": 4,
              "column": 4
            }
          },
          "moduleName": "gallery/templates/components/section-component.hbs"
        },
        isEmpty: false,
        arity: 2,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("        ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("    \n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var morphs = new Array(1);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["photo photo-", ["get", "index", ["loc", [null, [3, 34], [3, 39]]]], " ", ["get", "item.state", ["loc", [null, [3, 44], [3, 54]]]]]]]],
        locals: ["item", "index"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["multiple-nodes"]
        },
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 8,
            "column": 6
          }
        },
        "moduleName": "gallery/templates/components/section-component.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "photos");
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        var el1 = dom.createElement("div");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element1 = dom.childAt(fragment, [2]);
        var morphs = new Array(3);
        morphs[0] = dom.createMorphAt(dom.childAt(fragment, [0]), 1, 1);
        morphs[1] = dom.createAttrMorph(element1, 'class');
        morphs[2] = dom.createMorphAt(element1, 1, 1);
        return morphs;
      },
      statements: [["block", "each", [["get", "photosStates", ["loc", [null, [2, 12], [2, 24]]]]], [], 0, null, ["loc", [null, [2, 4], [4, 13]]]], ["attribute", "class", ["concat", ["text ", ["get", "textState", ["loc", [null, [6, 19], [6, 28]]]]]]], ["content", "text", ["loc", [null, [7, 4], [7, 12]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
define("gallery/templates/components/typing-component", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    return {
      meta: {
        "fragmentReason": {
          "name": "missing-wrapper",
          "problems": ["wrong-type"]
        },
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 2,
            "column": 0
          }
        },
        "moduleName": "gallery/templates/components/typing-component.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createComment("");
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var morphs = new Array(1);
        morphs[0] = dom.createMorphAt(fragment, 0, 0, contextualElement);
        dom.insertBoundary(fragment, 0);
        return morphs;
      },
      statements: [["content", "result", ["loc", [null, [1, 0], [1, 10]]]]],
      locals: [],
      templates: []
    };
  })());
});
define("gallery/templates/index", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template((function () {
    var child0 = (function () {
      return {
        meta: {
          "fragmentReason": false,
          "revision": "Ember@2.3.1",
          "loc": {
            "source": null,
            "start": {
              "line": 37,
              "column": 12
            },
            "end": {
              "line": 41,
              "column": 12
            }
          },
          "moduleName": "gallery/templates/index.hbs"
        },
        isEmpty: false,
        arity: 2,
        cachedFragment: null,
        hasRendered: false,
        buildFragment: function buildFragment(dom) {
          var el0 = dom.createDocumentFragment();
          var el1 = dom.createTextNode("                ");
          dom.appendChild(el0, el1);
          var el1 = dom.createElement("div");
          var el2 = dom.createTextNode("\n                    ");
          dom.appendChild(el1, el2);
          var el2 = dom.createElement("div");
          dom.setAttribute(el2, "class", "image");
          dom.appendChild(el1, el2);
          var el2 = dom.createTextNode("\n                ");
          dom.appendChild(el1, el2);
          dom.appendChild(el0, el1);
          var el1 = dom.createTextNode("\n");
          dom.appendChild(el0, el1);
          return el0;
        },
        buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
          var element0 = dom.childAt(fragment, [1]);
          var element1 = dom.childAt(element0, [1]);
          var morphs = new Array(2);
          morphs[0] = dom.createAttrMorph(element0, 'class');
          morphs[1] = dom.createAttrMorph(element1, 'style');
          return morphs;
        },
        statements: [["attribute", "class", ["concat", ["item ", ["subexpr", "grid-width-helper", [], ["index", ["get", "index", ["loc", [null, [38, 59], [38, 64]]]], "items", ["get", "items", ["loc", [null, [38, 71], [38, 76]]]]], ["loc", [null, [38, 33], [38, 78]]]]]]], ["attribute", "style", ["concat", ["background-image: url(", ["get", "image.url", ["loc", [null, [39, 70], [39, 79]]]], ")"]]]],
        locals: ["image", "index"],
        templates: []
      };
    })();
    return {
      meta: {
        "fragmentReason": {
          "name": "triple-curlies"
        },
        "revision": "Ember@2.3.1",
        "loc": {
          "source": null,
          "start": {
            "line": 1,
            "column": 0
          },
          "end": {
            "line": 45,
            "column": 0
          }
        },
        "moduleName": "gallery/templates/index.hbs"
      },
      isEmpty: false,
      arity: 0,
      cachedFragment: null,
      hasRendered: false,
      buildFragment: function buildFragment(dom) {
        var el0 = dom.createDocumentFragment();
        var el1 = dom.createElement("div");
        dom.setAttribute(el1, "class", "index-page");
        var el2 = dom.createTextNode("\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("h1");
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createComment("");
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n\n    ");
        dom.appendChild(el1, el2);
        var el2 = dom.createElement("section");
        var el3 = dom.createTextNode("\n        ");
        dom.appendChild(el2, el3);
        var el3 = dom.createElement("div");
        dom.setAttribute(el3, "class", "items");
        var el4 = dom.createTextNode("\n            ");
        dom.appendChild(el3, el4);
        var el4 = dom.createElement("div");
        dom.setAttribute(el4, "class", "items-sizer");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("\n");
        dom.appendChild(el3, el4);
        var el4 = dom.createComment("");
        dom.appendChild(el3, el4);
        var el4 = dom.createTextNode("        ");
        dom.appendChild(el3, el4);
        dom.appendChild(el2, el3);
        var el3 = dom.createTextNode("\n    ");
        dom.appendChild(el2, el3);
        dom.appendChild(el1, el2);
        var el2 = dom.createTextNode("\n");
        dom.appendChild(el1, el2);
        dom.appendChild(el0, el1);
        var el1 = dom.createTextNode("\n");
        dom.appendChild(el0, el1);
        return el0;
      },
      buildRenderNodes: function buildRenderNodes(dom, fragment, contextualElement) {
        var element2 = dom.childAt(fragment, [0]);
        var element3 = dom.childAt(element2, [1]);
        var element4 = dom.childAt(element2, [11]);
        var morphs = new Array(8);
        morphs[0] = dom.createAttrMorph(element3, 'class');
        morphs[1] = dom.createMorphAt(dom.childAt(element3, [1]), 0, 0);
        morphs[2] = dom.createMorphAt(element2, 3, 3);
        morphs[3] = dom.createMorphAt(element2, 5, 5);
        morphs[4] = dom.createMorphAt(element2, 7, 7);
        morphs[5] = dom.createMorphAt(element2, 9, 9);
        morphs[6] = dom.createAttrMorph(element4, 'class');
        morphs[7] = dom.createMorphAt(dom.childAt(element4, [1]), 3, 3);
        return morphs;
      },
      statements: [["attribute", "class", ["concat", ["section-title ", ["get", "titleState", ["loc", [null, [2, 36], [2, 46]]]]]]], ["inline", "typing-component", [], ["str", "Маленька історія великої подорожі Лілії та Руслана ... :)"], ["loc", [null, [3, 12], [3, 96]]]], ["inline", "section-component", [], ["photos", 3, "classNames", "history-1", "textAlign", "right", "onRender", ["subexpr", "action", ["onSectionRender"], [], ["loc", [null, [10, 17], [10, 43]]]], "text", "Будучи в Канаді ми відвідали багато крутих місць, адже ми дуже любимо подорожувати :D Отже ... З чого ж почалась наша подорож? Хех ... звичайно ж з дому :)"], ["loc", [null, [6, 4], [11, 172]]]], ["inline", "section-component", [], ["photos", 4, "classNames", "history-2", "textAlign", "left", "onRender", ["subexpr", "action", ["onSectionRender"], [], ["loc", [null, [17, 17], [17, 43]]]], "text", "А потім був Québec City та льодовий готель :)"], ["loc", [null, [13, 4], [18, 62]]]], ["inline", "mountain-section-component", [], ["photos", 5, "classNames", "history-3", "textAlign", "none", "onRender", ["subexpr", "action", ["onSectionRender"], [], ["loc", [null, [24, 17], [24, 43]]]], "text", "А пам’ятаєш ... ще ми були на горі Mont Royal :)"], ["loc", [null, [20, 4], [25, 65]]]], ["inline", "romantic-section-component", [], ["photos", 7, "classNames", "history-4", "textAlign", "none", "onRender", ["subexpr", "action", ["onSectionRender"], [], ["loc", [null, [31, 17], [31, 43]]]], "text", "Ех ... Ніагара ... Торонто ... Це було <b>\"So romantic\"</b> :D"], ["loc", [null, [27, 4], [32, 81]]]], ["attribute", "class", ["concat", ["section-images ", ["get", "imagesState", ["loc", [null, [34, 37], [34, 48]]]]]]], ["block", "each", [["get", "items", ["loc", [null, [37, 20], [37, 25]]]]], [], 0, null, ["loc", [null, [37, 12], [41, 21]]]]],
      locals: [],
      templates: [child0]
    };
  })());
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('gallery/config/environment', ['ember'], function(Ember) {
  var prefix = 'gallery';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = Ember['default'].$('meta[name="' + metaName + '"]').attr('content');
  var config = JSON.parse(unescape(rawConfig));

  return { 'default': config };
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("gallery/app")["default"].create({"name":"gallery","version":"0.0.0+b0ee5c7e"});
}

/* jshint ignore:end */
//# sourceMappingURL=gallery.map