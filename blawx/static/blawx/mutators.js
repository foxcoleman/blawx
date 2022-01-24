function blawxTypeToBlocklyType(blawxType) {
    if (blawxType == 'Yes / No') {
      return 'Boolean';
    } else if (blawxType == "Number") {
      return 'Number';
    } else if (blawxType == "Text") {
      return 'String';
    } else if (blawxType == "Date") {
      return 'DATE';
    } else if (blawxType == "Date and Time") {
      return 'DATETIME';
    } else if (blawxType == "Time") {
      return "TIME";
    } else if (blawxType == "Duration") {
      return "DURATION";
    } else {
      return null;
    }
  }

OBJECT_SELECTOR_MUTATOR_MIXIN = {
    mutationToDom: function() {
        var container = document.createElement('mutation');
        var objectName = this.getFieldValue('object_name');
        container.setAttribute('objectname', objectName);
        return container;
    },

    domToMutation: function(xmlElement) {
        var objectName = xmlElement.getAttribute('objectname');
        this.updateObjectName(objectName);
    },

    updateObjectName: function(objectName) {
        this.setFieldValue(objectName, 'object_name');
    }
    };

    Blockly.Extensions.registerMutator('object_selector_mutator', OBJECT_SELECTOR_MUTATOR_MIXIN);

CATEGORY_SELECTOR_MUTATOR_MIXIN = {
    mutationToDom: function() {
        var container = document.createElement('mutation');
        var categoryName = this.getFieldValue('category_name');
        container.setAttribute('category_name', categoryName);
        return container;
    },

    domToMutation: function(xmlElement) {
        var categoryName = xmlElement.getAttribute('category_name');
        this.updateCategoryName(categoryName);
    },

    updateCategoryName: function(categoryName) {
        this.setFieldValue(categoryName, 'category_name');
    }
    }

    Blockly.Extensions.registerMutator('category_selector_mutator', CATEGORY_SELECTOR_MUTATOR_MIXIN);

ATTRIBUTE_DECLARATION_MUTATOR_MIXIN = {
    mutationToDom: function() {
        var container = document.createElement('mutation');
        var attributeName = this.getFieldValue('attribute_name');
        var attributeType = this.getInput('attribute_type').connection.getCheck()[0];
        container.setAttribute('attribute_name', attributeName);
        container.setAttribute('attribute_type', attributeType);
        return container;
    },
    domToMutation: function(xmlElement) {
        var attributeName = xmlElement.getAttribute('attribute_name');
        var attributeType = xmlElement.getAttribute('attribute_type');
        this.updateAttributeSelector(attributeName,attributeType);
    },

    updateAttributeSelector: function(attributeName,attributeType) {
        this.setFieldValue(attributeName, "attribute_name");
        this.getInput('attribute_type').setCheck([attributeType,"ENTITY"]);
    }
    }


Blockly.Extensions.registerMutator('attribute_declaration_mutator', ATTRIBUTE_DECLARATION_MUTATOR_MIXIN);

Blockly.Extensions.register('changeAttributeDisplayText', function() {
    this.setOnChange(function(changeEvent) {
        if (this.getFieldValue('order') == "ov") {
        this.getField('first_element').setValue('object');
        this.getField('second_element').setValue('value');
        } else {
        this.getField('first_element').setValue('value');
        this.getField('second_element').setValue('object');
        }
    });
    });

ATTRIBUTE_SELECTOR_MUTATOR_MIXIN = {
      mutationToDom: function() {
          var container = document.createElement('mutation');
          container.setAttribute('attributename', this.blawxAttributeName);
          container.setAttribute('attributetype', this.blawxAttributeType);
          container.setAttribute('attributeorder', this.blawxAttributeOrder);
          return container;
      },
      domToMutation: function(xmlElement) {
          var attributeName = xmlElement.getAttribute('attributename');
          var attributeType = xmlElement.getAttribute('attributetype');
          var attributeOrder = xmlElement.getAttribute('attributeorder');
          this.blawxAttributeName = attributeName;
          this.blawxAttributeType = attributeType;
          this.blawxAttributeOrder = attributeOrder;

          // I "think" that the field values are automatically serialized,
          // as are the words "object" and "value" in the serialized text,
          // so the only thing to do here other than collecting the hidden
          // data should be to set the type checking.
          // This should only be done if the object has a type set, which may
          // not have happened yet for new blocks.
          if (attributeType) {
            if (attributeOrder == 'ov') {
                // Change the second input.
                this.getInput('second_element').connection.setCheck([blawxTypeToBlocklyType(attributeType),'ENTITY']);
                this.getInput('first_element').connection.setCheck('ENTITY');
            } else {
                // Change the first input.
                this.getInput('first_element').connection.setCheck([blawxTypeToBlocklyType(attributeType),'ENTITY']);
                this.getInput('second_element').connection.setCheck('ENTITY');
            }
          }
      }
      }
  
Blockly.Extensions.registerMutator('attribute_selector_mutator', ATTRIBUTE_SELECTOR_MUTATOR_MIXIN);