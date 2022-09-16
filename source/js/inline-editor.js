(($, Drupal, drupalSettings, debounce) => {

  function getDrupalFormat(format_id) {
    return drupalSettings.editor.formats[format_id];
  }

  function getDrupalEditor(format_id) {
    const format = getDrupalFormat(format_id);
    const editor = Drupal.editors[format.editor];
    return editor;
  }

  function getFieldParameters(element) {
    const $field = $(element).closest('[data-lp-field_name]');
    return {
      fieldName: $field.attr('data-lp-field_name'),
      viewMode: $field.attr('data-lp-view_mode'),
      formatId: $field.attr('data-lp-format_id'),
      uuid: $field.closest('[data-uuid]').attr('data-uuid'),
      layoutId: $field.closest('[data-lpb-id]').attr('data-lpb-id'),
    };
  }

  function getRawFieldValue(uuid, fieldName, viewMode) {
    return drupalSettings.mercuryEditor.inlineEditor.rawValues[uuid][fieldName][viewMode];
  }

  function saveField(lpbUuid, uuid, fieldName, formatId, data) {
    Drupal.ajax({
      url: `${drupalSettings.path.baseUrl}${drupalSettings.path.pathPrefix}layout-paragraphs-inline-editor/${lpbUuid}/save-component/${uuid}`,
      submit: {
        field_name: fieldName,
        format_id: formatId,
        data,
      },
    }).execute();
  }

  function attachEditor(element) {
    if (element.classList.contains('lp-editor-attached')) {
      return;
    }
    const {fieldName, formatId, viewMode, uuid, layoutId } = getFieldParameters(element);
    const format = getDrupalFormat(formatId);
    const editor = getDrupalEditor(formatId);
    if (typeof editor.lpAttachInlineEditor !== 'undefined') {
      // const rawValue = getRawFieldValue(uuid, fieldName, viewMode);
      // element.innerHTML = getRawFieldValue(uuid, fieldName, viewMode);
      editor.lpAttachInlineEditor(element, format, () => {});
      const textElement = editor.lpGetTextElement(element);
      editor.onChange(textElement, function (htmlText) {
        debounce(saveField, 250)(layoutId, uuid, fieldName, formatId, htmlText);
      });
      element.classList.add('lp-editor-attached');
    }
  }

  function focusEditor(element) {
    const { formatId } = getFieldParameters(element);
    const editor = getDrupalEditor(formatId);
    if (typeof editor.lpFocusEditor !== 'undefined') {
      editor.lpFocusEditor(element);
    }
  }

  Drupal.behaviors.layoutParagraphsInlineEditor = {
    attach: (context) => {
      $('[data-lpb-id] .lp-is-editable').once('lp-inline-editor').each((i, e) => {
        attachEditor(e);
      });
      if (
        context.attributes
        && context.getAttribute('data-uuid')
        && $('.lp-is-editable', context).length > 0
      ) {
        focusEditor($('.lp-is-editable', context)[0]);
      }
    },
  }

})(jQuery, Drupal, drupalSettings, Drupal.debounce);
