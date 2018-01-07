// Wallpaper animated icons
;(function(window) {

  'use strict';

    // taken from mo.js demos
  function isIOSSafari() {
    var userAgent;
    userAgent = window.navigator.userAgent;
    return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
  };

  // taken from mo.js demos
  function isTouch() {
    var isIETouch;
    isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;
  };
  
  // taken from mo.js demos
  var isIOS = isIOSSafari(),
    clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';

  function extend( a, b ) {
    for( var key in b ) { 
      if( b.hasOwnProperty( key ) ) {
        a[key] = b[key];
      }
    }
    return a;
  }

  function Animocon(el, options) {
    this.el = el;
    this.options = extend( {}, this.options );
    extend( this.options, options );

    this.timeline = new mojs.Timeline();
    
    for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
      this.timeline.add(this.options.tweens[i]);
    }

    var self = this;

    // define the checking status of Favorite button
    $(document).on("click", ".remove-fav", function() {
      // check if only Favorite
      if($(self.el).hasClass("favorite"))
      {
        $(self.el).removeClass("active");
        self.options.onUnCheck();  
      }
    });

    // define the checking status of Like button
    $(self.el).on("click", function() {
      if($(this).hasClass("like"))
      {
        if($(this).hasClass("active"))
        {
          $(this).removeClass("active");
          self.options.onUnCheck();
        }
        else
        {
          $(this).addClass("active");
          self.options.onCheck(); 
        }
      }
    });

    this.el.addEventListener(clickHandler, function() {
      // set Checked initialization

      if($(self.el).hasClass("active")) self.checked=true;
      else self.checked = false;

      if( self.checked ) {
        if($(self.el).hasClass("like"))
        {
          self.timeline.replay();
          self.options.onUnCheck();          
        }
      }
      else {
        if($(self.el).hasClass("favorite"))
        { 
          $(self.el).addClass("active");
          self.options.onCheck();
          self.timeline.replay();
        }
      }
    });
  }

  Animocon.prototype.options = {
    tweens : [
      new mojs.Burst({})
    ],
    onCheck : function() { return false; },
    onUnCheck : function() { return false; }
  };

  // grid items:
  var items = document.querySelectorAll('.mojs-icon');
  function init() {

   /* Icon 1 */
    var el1 = items[0].querySelector('button.icobutton'), el1span = el1.querySelector('span');
    el1span.style.WebkitTransformOrigin = el1span.style.transformOrigin = '-10% 50%';
    new Animocon(el1, {
      tweens : [
        // burst animation
        new mojs.Burst({
          parent:     el1,
          count:      6,
          radius:     {40:90},
          angle:      135,
          degree:     90,
          children: {
            fill :      [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
            scale:      1,
            radius:     { 7 : 0 },
            opacity:    0.6,
            duration:   1500,
            delay:      350,
            easing:     mojs.easing.bezier(0.1, 1, 0.3, 1)
          }
        }),
        // burst animation
        new mojs.Burst({
          parent:   el1,
          count:    6,
          angle:    45,
          degree:  -90,
          radius:   {40:100},
          children: {
            fill:       [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
            scale:      1,
            radius:     { 7 : 0 },
            opacity:    0.6,
            duration:   1500,
            delay:      550,
            easing:     mojs.easing.bezier(0.1, 1, 0.3, 1)
          }
        }),
        // ring animation
        new mojs.Shape({
          parent:   el1,
          radius:   {0: 50},
          fill:     'transparent',
          stroke:   '#988ADE',
          strokeWidth: {35:0},
          opacity:    0.6,
          duration:   750,
          easing:     mojs.easing.bezier(0, 1, 0.5, 1)
        }),
        // ring animation
        new mojs.Shape({
          parent:       el1,
          radius:       {0: 50},
          fill:         'transparent',
          stroke:       '#988ADE',
          strokeWidth:  {35:0},
          opacity:      0.6,
          duration:     750,
          delay:        200,
          easing:       mojs.easing.bezier(0, 1, 0.5, 1)
        }),
        // icon scale animation
        new mojs.Tween({
          duration : 1500,
          onUpdate: function(progress) {
            if(progress > 0.3) {
              var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
              el1span.style.WebkitTransform = el1span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1) rotate3d(0,0,1,' + 90*(1-elasticOutProgress) + 'deg)';
            }
            else {
              el1span.style.WebkitTransform = el1span.style.transform = 'scale3d(0,0,1)';
            }
          }
        })
      ],
      onCheck : function() {
        el1.style.color = '#1f55a7';
      },
      onUnCheck : function() {
        el1.style.color = '#aab8c2';  
      }
    });
    /* Icon 1 */

    /* Icon 2 */
    if(items[1] !=undefined)
    {
      var el2 = items[1].querySelector('button.icobutton'), el2span = el2.querySelector('span');
      new Animocon(el2, {
        tweens : [
          // ring animation
          new mojs.Shape({
            parent: el2,
            duration: 750,
            type: 'circle',
            radius: {0: 40},
            fill: 'transparent',
            stroke: '#e2264d',
            strokeWidth: {35:0},
            opacity: 0.2,
            top: '45%',
            easing: mojs.easing.bezier(0, 1, 0.5, 1)
          }),
          new mojs.Shape({
            parent: el2,
            duration: 500,
            delay: 100,
            type: 'circle',
            radius: {0: 20},
            fill: 'transparent',
            stroke: '#e2264d',
            strokeWidth: {5:0},
            opacity: 0.2,
            x : 40, 
            y : -60,
            easing: mojs.easing.sin.out
          }),
          new mojs.Shape({
            parent: el2,
            duration: 500,
            delay: 180,
            type: 'circle',
            radius: {0: 10},
            fill: 'transparent',
            stroke: '#e2264d',
            strokeWidth: {5:0},
            opacity: 0.5,
            x: -10, 
            y: -80,
            isRunLess: true,
            easing: mojs.easing.sin.out
          }),
          new mojs.Shape({
            parent: el2,
            duration: 800,
            delay: 240,
            type: 'circle',
            radius: {0: 20},
            fill: 'transparent',
            stroke: '#e2264d',
            strokeWidth: {5:0},
            opacity: 0.3,
            x: -70, 
            y: -10,
            easing: mojs.easing.sin.out
          }),
          new mojs.Shape({
            parent: el2,
            duration: 800,
            delay: 240,
            type: 'circle',
            radius: {0: 20},
            fill: 'transparent',
            stroke: '#e2264d',
            strokeWidth: {5:0},
            opacity: 0.4,
            x: 80, 
            y: -50,
            easing: mojs.easing.sin.out
          }),
          new mojs.Shape({
            parent: el2,
            duration: 1000,
            delay: 300,
            type: 'circle',
            radius: {0: 15},
            fill: 'transparent',
            stroke: '#e2264d',
            strokeWidth: {5:0},
            opacity: 0.2,
            x: 20, 
            y: -100,
            easing: mojs.easing.sin.out
          }),
          new mojs.Shape({
            parent: el2,
            duration: 600,
            delay: 330,
            type: 'circle',
            radius: {0: 25},
            fill: 'transparent',
            stroke: '#e2264d',
            strokeWidth: {5:0},
            opacity: 0.4,
            x: -40, 
            y: -90,
            easing: mojs.easing.sin.out
          }),
          // icon scale animation
          new mojs.Tween({
            duration : 1200,
            easing: mojs.easing.ease.out,
            onUpdate: function(progress) {
              if(progress > 0.3) {
                var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
                el2span.style.WebkitTransform = el2span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
              }
              else {
                el2span.style.WebkitTransform = el2span.style.transform = 'scale3d(0,0,1)';
              }
            }
          })
        ],
        onCheck : function() {
          el2.style.color = '#e2264d';
        },
        onUnCheck : function() {
          el2.style.color = '#aab8c2';
        }
      });
      /* Icon 2 */
    }

    if(items[2]!=undefined){
      /* Icon 3 */
      var el3 = items[2].querySelector('button.icobutton'), el3span = el3.querySelector('span');
      el3span.style.WebkitTransformOrigin = el3span.style.transformOrigin = '-10% 50%';
      new Animocon(el3, {
        tweens : [
          // burst animation
          new mojs.Burst({
            parent:     el3,
            count:      6,
            radius:     {40:90},
            angle:      135,
            degree:     90,
            children: {
              fill :      [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
              scale:      1,
              radius:     { 7 : 0 },
              opacity:    0.6,
              duration:   1500,
              delay:      350,
              easing:     mojs.easing.bezier(0.1, 1, 0.3, 1)
            }
          }),
          // burst animation
          new mojs.Burst({
            parent:   el3,
            count:    6,
            angle:    45,
            degree:  -90,
            radius:   {40:100},
            children: {
              fill:       [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
              scale:      1,
              radius:     { 7 : 0 },
              opacity:    0.6,
              duration:   1500,
              delay:      550,
              easing:     mojs.easing.bezier(0.1, 1, 0.3, 1)
            }
          }),
          // ring animation
          new mojs.Shape({
            parent:   el3,
            radius:   {0: 50},
            fill:     'transparent',
            stroke:   '#988ADE',
            strokeWidth: {35:0},
            opacity:    0.6,
            duration:   750,
            easing:     mojs.easing.bezier(0, 1, 0.5, 1)
          }),
          // ring animation
          new mojs.Shape({
            parent:       el3,
            radius:       {0: 50},
            fill:         'transparent',
            stroke:       '#988ADE',
            strokeWidth:  {35:0},
            opacity:      0.6,
            duration:     750,
            delay:        200,
            easing:       mojs.easing.bezier(0, 1, 0.5, 1)
          }),
          // icon scale animation
          new mojs.Tween({
            duration : 1500,
            onUpdate: function(progress) {
              if(progress > 0.3) {
                var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
                el3span.style.WebkitTransform = el3span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1) rotate3d(0,0,1,' + 90*(1-elasticOutProgress) + 'deg)';
              }
              else {
                el3span.style.WebkitTransform = el3span.style.transform = 'scale3d(0,0,1)';
              }
            }
          })
        ],
        onCheck : function() {
          el3.style.color = '#1f55a7';
        },
        onUnCheck : function() {
          el3.style.color = '#aab8c2';  
        }
      });
      /* Icon 3 */
    }

    /* Icon 4 */
    if(items[3]!=undefined)
    {
      var el4 = items[3].querySelector('button.icobutton'), el4span = el4.querySelector('span');
      new Animocon(el4, {
        tweens : [
          // ring animation
          new mojs.Shape({
            parent: el4,
            duration: 750,
            type: 'circle',
            radius: {0: 40},
            fill: 'transparent',
            stroke: '#e2264d',
            strokeWidth: {35:0},
            opacity: 0.2,
            top: '45%',
            easing: mojs.easing.bezier(0, 1, 0.5, 1)
          }),
          new mojs.Shape({
            parent: el4,
            duration: 500,
            delay: 100,
            type: 'circle',
            radius: {0: 20},
            fill: 'transparent',
            stroke: '#e2264d',
            strokeWidth: {5:0},
            opacity: 0.2,
            x : 40, 
            y : -60,
            easing: mojs.easing.sin.out
          }),
          new mojs.Shape({
            parent: el4,
            duration: 500,
            delay: 180,
            type: 'circle',
            radius: {0: 10},
            fill: 'transparent',
            stroke: '#e2264d',
            strokeWidth: {5:0},
            opacity: 0.5,
            x: -10, 
            y: -80,
            isRunLess: true,
            easing: mojs.easing.sin.out
          }),
          new mojs.Shape({
            parent: el4,
            duration: 800,
            delay: 240,
            type: 'circle',
            radius: {0: 20},
            fill: 'transparent',
            stroke: '#e2264d',
            strokeWidth: {5:0},
            opacity: 0.3,
            x: -70, 
            y: -10,
            easing: mojs.easing.sin.out
          }),
          new mojs.Shape({
            parent: el4,
            duration: 800,
            delay: 240,
            type: 'circle',
            radius: {0: 20},
            fill: 'transparent',
            stroke: '#e2264d',
            strokeWidth: {5:0},
            opacity: 0.4,
            x: 80, 
            y: -50,
            easing: mojs.easing.sin.out
          }),
          new mojs.Shape({
            parent: el4,
            duration: 1000,
            delay: 300,
            type: 'circle',
            radius: {0: 15},
            fill: 'transparent',
            stroke: '#e2264d',
            strokeWidth: {5:0},
            opacity: 0.2,
            x: 20, 
            y: -100,
            easing: mojs.easing.sin.out
          }),
          new mojs.Shape({
            parent: el4,
            duration: 600,
            delay: 330,
            type: 'circle',
            radius: {0: 25},
            fill: 'transparent',
            stroke: '#e2264d',
            strokeWidth: {5:0},
            opacity: 0.4,
            x: -40, 
            y: -90,
            easing: mojs.easing.sin.out
          }),
          // icon scale animation
          new mojs.Tween({
            duration : 1200,
            easing: mojs.easing.ease.out,
            onUpdate: function(progress) {
              if(progress > 0.3) {
                var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
                el4span.style.WebkitTransform = el4span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
              }
              else {
                el4span.style.WebkitTransform = el4span.style.transform = 'scale3d(0,0,1)';
              }
            }
          })
        ],
        onCheck : function() {
          el4.style.color = '#e2264d';
        },
        onUnCheck : function() {
          el4.style.color = '#aab8c2';
        }
      });
      /* Icon 4 */
    }
    
    /* Icon 5 */
    if(items[4]!=undefined)
    {
        var el5 = items[4].querySelector('button.icobutton'), el5span = el5.querySelector('span');
        new Animocon(el5, {
          tweens : [
            // burst animation
            new mojs.Burst({
              parent:     el5,
              count:      6,
              radius:     {40:90},
              children: {
                fill:       [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
                opacity:    0.6,
                scale:      1,
                radius:     { 7: 0 },
                duration:   1500,
                delay:      300,
                easing:     mojs.easing.bezier(0.1, 1, 0.3, 1)
              }
            }),
            // ring animation
            new mojs.Shape({
              parent:       el5,
              type:         'circle',
              scale:        { 0: 1 },
              radius:       50,
              fill:         'transparent',
              stroke:       '#988ADE',
              strokeWidth:  {35:0},
              opacity:      0.6,
              duration:     750,
              easing:       mojs.easing.bezier(0, 1, 0.5, 1)
            }),
            // icon scale animation
            new mojs.Tween({
              duration : 1100,
              onUpdate: function(progress) {
                if(progress > 0.3) {
                  var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
                  el5span.style.WebkitTransform = el5span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
                }
                else {
                  el5span.style.WebkitTransform = el5span.style.transform = 'scale3d(0,0,1)';
                }
              }
            })
          ],
          onCheck : function() {
            el5.style.color = '#988ADE';
          },
          onUnCheck : function() {
            el5.style.color = '#C0C1C3';  
          }
        });
        /* Icon 5 */
    }
    /* Icon 6 */
    if(items[5]!=undefined)
    {
      var el6 = items[5].querySelector('button.icobutton'), el6span = el6.querySelector('span');
      el6span.style.WebkitTransformOrigin = el6span.style.transformOrigin = '-10% 50%';
      new Animocon(el6, {
        tweens : [
          // burst animation
          new mojs.Burst({
            parent:     el6,
            count:      6,
            radius:     {40:90},
            angle:      135,
            degree:     90,
            children: {
              fill :      [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
              scale:      1,
              radius:     { 7 : 0 },
              opacity:    0.6,
              duration:   1500,
              delay:      350,
              easing:     mojs.easing.bezier(0.1, 1, 0.3, 1)
            }
          }),
          // burst animation
          new mojs.Burst({
            parent:   el6,
            count:    6,
            angle:    45,
            degree:  -90,
            radius:   {40:100},
            children: {
              fill:       [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
              scale:      1,
              radius:     { 7 : 0 },
              opacity:    0.6,
              duration:   1500,
              delay:      550,
              easing:     mojs.easing.bezier(0.1, 1, 0.3, 1)
            }
          }),
          // ring animation
          new mojs.Shape({
            parent:   el6,
            radius:   {0: 50},
            fill:     'transparent',
            stroke:   '#988ADE',
            strokeWidth: {35:0},
            opacity:    0.6,
            duration:   750,
            easing:     mojs.easing.bezier(0, 1, 0.5, 1)
          }),
          // ring animation
          new mojs.Shape({
            parent:       el6,
            radius:       {0: 50},
            fill:         'transparent',
            stroke:       '#988ADE',
            strokeWidth:  {35:0},
            opacity:      0.6,
            duration:     750,
            delay:        200,
            easing:       mojs.easing.bezier(0, 1, 0.5, 1)
          }),
          // icon scale animation
          new mojs.Tween({
            duration : 1500,
            onUpdate: function(progress) {
              if(progress > 0.3) {
                var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
                el6span.style.WebkitTransform = el6span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1) rotate3d(0,0,1,' + 90*(1-elasticOutProgress) + 'deg)';
              }
              else {
                el6span.style.WebkitTransform = el6span.style.transform = 'scale3d(0,0,1)';
              }
            }
          })
        ],
        onCheck : function() {
          el6.style.color = '#1f55a7';
        },
        onUnCheck : function() {
          el6.style.color = '#aab8c2';  
        }
      });
      /* Icon 6 */
    }
   /* Icon 7 */
   if(items[6]!=undefined){
      var el7 = items[6].querySelector('button.icobutton'), el7span = el7.querySelector('span');
      new Animocon(el7, {
        tweens : [
          // ring animation
          new mojs.Shape({
            parent: el7,
            duration: 750,
            type: 'circle',
            radius: {0: 40},
            fill: 'transparent',
            stroke: '#e2264d',
            strokeWidth: {35:0},
            opacity: 0.2,
            top: '45%',
            easing: mojs.easing.bezier(0, 1, 0.5, 1)
          }),
          new mojs.Shape({
            parent: el7,
            duration: 500,
            delay: 100,
            type: 'circle',
            radius: {0: 20},
            fill: 'transparent',
            stroke: '#e2264d',
            strokeWidth: {5:0},
            opacity: 0.2,
            x : 40, 
            y : -60,
            easing: mojs.easing.sin.out
          }),
          new mojs.Shape({
            parent: el7,
            duration: 500,
            delay: 180,
            type: 'circle',
            radius: {0: 10},
            fill: 'transparent',
            stroke: '#e2264d',
            strokeWidth: {5:0},
            opacity: 0.5,
            x: -10, 
            y: -80,
            isRunLess: true,
            easing: mojs.easing.sin.out
          }),
          new mojs.Shape({
            parent: el7,
            duration: 800,
            delay: 240,
            type: 'circle',
            radius: {0: 20},
            fill: 'transparent',
            stroke: '#e2264d',
            strokeWidth: {5:0},
            opacity: 0.3,
            x: -70, 
            y: -10,
            easing: mojs.easing.sin.out
          }),
          new mojs.Shape({
            parent: el7,
            duration: 800,
            delay: 240,
            type: 'circle',
            radius: {0: 20},
            fill: 'transparent',
            stroke: '#e2264d',
            strokeWidth: {5:0},
            opacity: 0.4,
            x: 80, 
            y: -50,
            easing: mojs.easing.sin.out
          }),
          new mojs.Shape({
            parent: el7,
            duration: 1000,
            delay: 300,
            type: 'circle',
            radius: {0: 15},
            fill: 'transparent',
            stroke: '#e2264d',
            strokeWidth: {5:0},
            opacity: 0.2,
            x: 20, 
            y: -100,
            easing: mojs.easing.sin.out
          }),
          new mojs.Shape({
            parent: el7,
            duration: 600,
            delay: 330,
            type: 'circle',
            radius: {0: 25},
            fill: 'transparent',
            stroke: '#e2264d',
            strokeWidth: {5:0},
            opacity: 0.4,
            x: -40, 
            y: -90,
            easing: mojs.easing.sin.out
          }),
          // icon scale animation
          new mojs.Tween({
            duration : 1200,
            easing: mojs.easing.ease.out,
            onUpdate: function(progress) {
              if(progress > 0.3) {
                var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
                el7span.style.WebkitTransform = el7span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
              }
              else {
                el7span.style.WebkitTransform = el7span.style.transform = 'scale3d(0,0,1)';
              }
            }
          })
        ],
        onCheck : function() {
          el7.style.color = '#e2264d';
        },
        onUnCheck : function() {
          el7.style.color = '#aab8c2';
        }
      });
      /* Icon 7 */
    }
   /* Icon 8 */
   if(items[7]!=undefined)
   {
      var el8 = items[7].querySelector('button.icobutton'), el8span = el8.querySelector('span');
      new Animocon(el8, {
        tweens : [
          // burst animation
          new mojs.Burst({
            parent:     el8,
            count:      6,
            radius:     {40:90},
            children: {
              fill:       [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
              opacity:    0.6,
              scale:      1,
              radius:     { 7: 0 },
              duration:   1500,
              delay:      300,
              easing:     mojs.easing.bezier(0.1, 1, 0.3, 1)
            }
          }),
          // ring animation
          new mojs.Shape({
            parent:       el8,
            type:         'circle',
            scale:        { 0: 1 },
            radius:       50,
            fill:         'transparent',
            stroke:       '#988ADE',
            strokeWidth:  {35:0},
            opacity:      0.6,
            duration:     750,
            easing:       mojs.easing.bezier(0, 1, 0.5, 1)
          }),
          // icon scale animation
          new mojs.Tween({
            duration : 1100,
            onUpdate: function(progress) {
              if(progress > 0.3) {
                var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
                el8span.style.WebkitTransform = el8span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
              }
              else {
                el8span.style.WebkitTransform = el8span.style.transform = 'scale3d(0,0,1)';
              }
            }
          })
        ],
        onCheck : function() {
          el8.style.color = '#35980e';
        },
        onUnCheck : function() {
          el8.style.color = '#C0C1C3';  
        }
      });
      /* Icon 8 */
    }
    
  }

  init();

})(window);