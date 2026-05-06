window.RevealGrid = function () {
  return {
    id: "RevealGrid",
    init: function (deck) {
      function offsetFromAncestor(el, ancestor) {
        var top = 0;
        var node = el;
        while (node && node !== ancestor) {
          top += node.offsetTop;
          node = node.offsetParent;
        }
        return top;
      }

      function sizeRows() {
        var slides = document.querySelectorAll('.reveal .slides section.present');
        slides.forEach(function (slide) {
          slide.querySelectorAll('.rows').forEach(function (el) {
            el.style.height = '';
            var top = offsetFromAncestor(el, slide);
            el.style.height = (slide.offsetHeight - top) + 'px';
          });
        });
      }

      deck.on('ready', sizeRows);
      deck.on('slidechanged', sizeRows);
      deck.on('resize', sizeRows);
    }
  };
};
