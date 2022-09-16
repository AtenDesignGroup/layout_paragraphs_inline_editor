<?php

namespace Drupal\layout_paragraphs_inline_editor\Plugin\CKEditorPlugin;

use Drupal\Core\Plugin\PluginBase;
use Drupal\editor\Entity\Editor;
use Drupal\ckeditor\CKEditorPluginContextualInterface;
use Drupal\ckeditor\CKEditorPluginConfigurableInterface;
use Drupal\Core\Form\FormStateInterface;

/**
 * Defines a CKEditor placeholder plugin.
 *
 * @CKEditorPlugin(
 *   id = "editorplaceholder",
 *   label = @Translation("CKEditor editor placeholder plugin"),
 * )
 */
class EditorPlaceholder extends PluginBase implements CKEditorPluginContextualInterface, CKEditorPluginConfigurableInterface {

  /**
   * {@inheritdoc}
   */
  public function isInternal() {
    return FALSE;
  }

  /**
   * {@inheritdoc}
   */
  public function isEnabled(Editor $editor) {
    return TRUE;
  }

  /**
   * {@inheritdoc}
   */
  public function getDependencies(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getLibraries(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function getFile() {
    $base_path = \Drupal::moduleHandler()
      ->getModule('layout_paragraphs_inline_editor')
      ->getPath();
    return $base_path . '/assets/vendor/ckeditor/plugins/editorplaceholder/plugin.js';
  }

  /**
   * {@inheritdoc}
   */
  public function getConfig(Editor $editor) {
    return [];
  }

  /**
   * {@inheritdoc}
   */
  public function settingsForm(array $form, FormStateInterface $form_state, Editor $editor) {
    return [];
  }

}
