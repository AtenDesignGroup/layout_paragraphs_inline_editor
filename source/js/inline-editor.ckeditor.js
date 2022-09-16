(($, Drupal, CKEDITOR, debounce) => {

  Drupal.editors.ckeditor = {
    ...Drupal.editors.ckeditor,
    lpAttachInlineEditor(element, format) {

      const self = this;
      const content = document.createElement('div');
      content.classList.add('lpb-inline-editor--content');
      const children = [ ...element.childNodes ];
      children.forEach((child) => (content.append(child)));
      const toolBar = document.createElement('div');
      toolBar.id = Math.random().toString().slice(2, 9);
      toolBar.classList.add('lpb-inline-editor--toolbar');
      element.prepend(content);
      element.prepend(toolBar);

      if (element.getAttribute('data-placeholder')) {
        format.editorSettings.editorplaceholder = element.getAttribute('data-placeholder');
      }
      this.attachInlineEditor(content, format, toolBar.id);
      const instance = CKEDITOR.dom.element.get(content).getEditor();
      instance.on('focus', (e) => {
        $(element).closest('[data-uuid]').attr('data-is-live-editing', true);
      });
      instance.on('blur', (e) => {
        $(element).closest('[data-uuid]').removeAttr('data-is-live-editing');
      });
    },
    lpFocusEditor(element) {
      $('.lpb-inline-editor--content', element).focus();
    },
    lpGetTextElement(element) {
      return $(element).find('.lpb-inline-editor--content')[0];
    }
  }

})(jQuery, Drupal, CKEDITOR, Drupal.debounce);
