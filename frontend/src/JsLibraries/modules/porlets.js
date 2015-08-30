/**=========================================================
 * Module: portlet.js
 * Drag and drop any panel to change its position
 * The Selector should could be applied to any object that contains
 * panel, so .col-* element are ideal.
 =========================================================*/

(function($, window, document){
  'use strict';

  // Component is optional
  if(!$.fn.sortable) return;

  var Selector = '[data-toggle="portlet"]',
      storageKeyName = 'jq-portletState';

  $(function(){

    $( Selector ).sortable({
      connectWith:          Selector,
      items:                'div.panel',
      handle:               '.portlet-handler',
      opacity:              0.7,
      placeholder:          'portlet box-placeholder',
      cancel:               '.portlet-cancel',
      forcePlaceholderSize: true,
      iframeFix:            false,
      tolerance:            'pointer',
      helper:               'original',
      revert:               200,
      forceHelperSize:      true,
      update:               savePortletOrder,
      create:               loadPortletOrder
    })
    // optionally disables mouse selection
    //.disableSelection()
    ;

  });

  function savePortletOrder(event, ui) {
    
    var data = $.localStorage.get(storageKeyName);
    
    if(!data) { data = {}; }

    data[this.id] = $(this).sortable('toArray');

    if(data) {
      $.localStorage.set(storageKeyName, data);
    }
    
  }

  function loadPortletOrder() {
    
    var data = $.localStorage.get(storageKeyName);

    if(data) {
      
      var porletId = this.id,
          panels   = data[porletId];

      if(panels) {
        var portlet = $('#'+porletId);
        
        $.each(panels, function(index, value) {
           $('#'+value).appendTo(portlet);
        });
      }

    }

  }

}(jQuery, window, document));

