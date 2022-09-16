<?php

namespace Drupal\layout_paragraphs_inline_editor\Controller;

use Drupal\Core\Controller\ControllerBase;
use Symfony\Component\HttpFoundation\Request;
use Drupal\layout_paragraphs\LayoutParagraphsLayout;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\layout_paragraphs\LayoutParagraphsLayoutTempstoreRepository;

/**
 * SaveComponentController class definition.
 */
class SaveComponentController extends ControllerBase {

  /**
   * The tempstore service.
   *
   * @var \Drupal\layout_paragraphs\LayoutParagraphsLayoutTempstoreRepository
   */
  protected $tempstore;

  /**
   * {@inheritDoc}
   */
  public function __construct(LayoutParagraphsLayoutTempstoreRepository $tempstore) {
    $this->tempstore = $tempstore;
  }

  /**
   * {@inheritDoc}
   */
  public static function create(ContainerInterface $container) {
    return new static(
      $container->get('layout_paragraphs.tempstore_repository')
    );
  }

  /**
   * Reorders a Layout Paragraphs Layout's components.
   *
   * Expects an two-dimmensional array of components in the "components" POST
   * parameter with key/value pairs for "uuid", "parent_uuid", and "region".
   *
   * @param \Symfony\Component\HttpFoundation\Request $request
   *   The request object containing a "components" POST parameter.
   * @param \Drupal\layout_paragraphs\LayoutParagraphsLayout $layout_paragraphs_layout
   *   The Layout Paragraphs Layout object.
   * @param string $uuid
   *   The paragraph uuid.
   */
  public function save(Request $request, LayoutParagraphsLayout $layout_paragraphs_layout, string $uuid) {

    $field_name = $request->request->get('field_name', NULL);
    $data = $request->request->get('data', NULL);
    $format = $request->request->get('format_id', NULL);
    $paragraph = $layout_paragraphs_layout
      ->getComponentByUuid($uuid)
      ->getEntity();
    $paragraph->{$field_name}->setValue(['value' => $data, 'format' => $format]);
    $paragraph->setNeedsSave(TRUE);
    $layout_paragraphs_layout->setComponent($paragraph);
    $this->tempstore->set($layout_paragraphs_layout);

    return [
      '#type' => 'layout_paragraphs_builder',
      '#layout_paragraphs_layout' => $layout_paragraphs_layout,
    ];
  }

}
