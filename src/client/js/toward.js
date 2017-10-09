$(function () {

  var searchId1 = "#searchDrugLabel";
  var searchId2 = "#searchDrugLabelMini";

  function mappingModel(model) {
    var $modal = $("#modal");
    $modal.find("#orderId").val(model.orderId);
    $modal.find("#atcCode").val(model.atcCode);
    $modal.find("#drugNameThai").val(model.drugNameThai);
    $modal.find("#drugNameEng").val(model.drugNameEng);
    $modal.find("#groupNameEng").val(model.groupNameEng);
    $modal.find("#groupNameThai").val(model.groupNameThai);
    $modal.find("#drugType").val(model.drugType);
    $modal.find("#termsOfUse1").val(model.termsOfUse1);
    $modal.find("#termsOfUse2").val(model.termsOfUse2);
    $modal.find("#termsOfUse3").val(model.termsOfUse3);
    $modal.find("#instructionsForUse1").val(model.instructionsForUse1);
    $modal.find("#instructionsForUse2").val(model.instructionsForUse2);
    $modal.find("#instructionsForUse3").val(model.instructionsForUse3);
    $modal.find("#adverseEffects1").val(model.adverseEffects1);
    $modal.find("#adverseEffects2").val(model.adverseEffects2);
    $modal.find("#adverseEffects3").val(model.adverseEffects3);
    $modal.find("#contraindication1").val(model.contraindication1);
    $modal.find("#contraindication2").val(model.contraindication2);
    $modal.find("#contraindication3").val(model.contraindication3);
    $modal.find("#medicationPrecautions1").val(model.medicationPrecautions1);
    $modal.find("#medicationPrecautions2").val(model.medicationPrecautions2);
    $modal.find("#medicationPrecautions3").val(model.medicationPrecautions3);
    $modal.find("#combinationOtherDrugs").val(model.combinationOtherDrugs);
    $modal.find("#drugStorage").val(model.drugStorage);
  }

  function clearData() {
    var empty = {
      orderId: "",
      atcCode: "",
      drugNameThai: "",
      drugNameEng: "",
      groupNameEng: "",
      groupNameThai: "",
      drugType: "",
      termsOfUse1: "",
      termsOfUse2: "",
      termsOfUse3: "",
      instructionsForUse1: "",
      instructionsForUse2: "",
      instructionsForUse3: "",
      adverseEffects1: "",
      adverseEffects2: "",
      adverseEffects3: "",
      contraindication1: "",
      contraindication2: "",
      contraindication3: "",
      medicationPrecautions1: "",
      medicationPrecautions2: "",
      medicationPrecautions3: "",
      combinationOtherDrugs: "",
      drugStorage: ""
    };
    mappingModel(empty);
  }

  function getAutoOptions(containerId) {
    return {
      url: function (phrase) {
        var keyword = String(phrase).trim();
        if (phrase && keyword != "") {
          return "api/label/find/drug/" + keyword;
        }
      },

      getValue: function (data) {
        return data.drugNameThai + " / " + data.drugNameEng;
      },

      list: {
        maxNumberOfElements: 15,
        match: {
          enabled: true
        },
        sort: {
          enabled: true
        },
        onChooseEvent: function () {
          var label = $(containerId).getSelectedItemData();
          mappingModel(label);
        }
      },

      requestDelay: 300
    };
  }

  $(searchId1).easyAutocomplete(getAutoOptions(searchId1));
  $(searchId2).easyAutocomplete(getAutoOptions(searchId2));

  $(".btn-clear").on("click", function (e) {
    e.preventDefault();
    clearData();
    $(searchId1).val("");
    $(searchId2).val("");
  });

});
