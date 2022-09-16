(function () {
  'use strict';

  (($, Drupal, debounce) => {
    Drupal.editors.ckeditor5 = {
      ...Drupal.editors.ckeditor5,
      lpAttachInlineEditor(element, format) {
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
          format.editorSettings.config.placeholder = element.getAttribute('data-placeholder');
        }
        this.attachInlineEditor(content, format, toolBar.id);
        const id = content.getAttribute('data-ckeditor5-id');
        const i = setInterval(() => {
          if (Drupal.CKEditor5Instances.get(id)) {
            Drupal.CKEditor5Instances.get(id).editing.view.document.on('change:isFocused', (e, data, isFocused) => {
              if (isFocused) {
                $(content).closest('[data-uuid]').attr('data-is-live-editing', true);
              }
              else {
                console.log('not focused');
                $(content).closest('[data-uuid]').removeAttr('data-is-live-editing');
              }
            });
            clearInterval(i);
          }
        }, 100);
      },
      lpFocusEditor(element) {
        const id = $('[data-ckeditor5-id]', element).attr('data-ckeditor5-id');
        // Have to wait for editor to initialize.
        const i = setInterval(() => {
          if (Drupal.CKEditor5Instances.get(id)) {
            Drupal.CKEditor5Instances.get(id).editing.view.focus();
            clearInterval(i);
          }
        }, 100);
      },
      lpGetTextElement(element) {
        return $(element).find('.lpb-inline-editor--content')[0];
      },
    };
  })(jQuery, Drupal, Drupal.debounce);

})();
