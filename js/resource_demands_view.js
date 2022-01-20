/*-------------------------------------------------------+
| SYSTOPIA Resource Framework                            |
| Copyright (C) 2021 SYSTOPIA                            |
| Author: B. Endres (endres@systopia.de)                 |
+--------------------------------------------------------+
| This program is released as free software under the    |
| Affero GPL license. You can redistribute it and/or     |
| modify it under the terms of this license which you    |
| can read by viewing the included agpl.txt or online    |
| at www.gnu.org/licenses/agpl.html. Removal of this     |
| copyright header is strictly prohibited without        |
| written permission from the original author(s).        |
+--------------------------------------------------------*/

(function ($, _, ts) {
  $(document).ready(function () {
    $(document)
      .off('crmPopupFormSuccess.resource-demand-view')
      .on('crmPopupFormSuccess.resource-demand-view', function (event) {
        CRM.refreshParent(event);
        $('#' + $("#tab_resourcedemands").attr('aria-controls'))
          .crmSnippet('refresh');
      });

    $('.resource-demand-view-demands .action--resource--demand-delete')
      .on('click', function (event) {
        var demand_id = $(this).data('demand-id');
        CRM.confirm({
          title: ts("Confirm Deletion"),
          message: ts("Do you really want to delete this resource demand, including all conditions?"),
        }).on('crmConfirm:yes', function () {
          CRM.api3('ResourceDemand', 'delete', {id: demand_id})
            .then(function () {
              CRM.alert(ts("Resource Demand deleted"), ts("Deleted"), "info");
              CRM.refreshParent(event);
            });
        });
      });
  });

})(CRM.$, CRM._, CRM.ts('de.systopia.resource'));
