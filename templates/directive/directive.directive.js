export default (scope, el, attrs, ctrl) => {

    el.focus();

    scope.$on('$destroy', () => {
      // Unbind listeners
    });
}
