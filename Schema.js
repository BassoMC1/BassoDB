class Schema {
  constructor() {
    this.schema = {};
  }

  addField(fieldName, fieldOptions = {}) {
    this.schema[fieldName] = fieldOptions;
  }

  getSchema() {
    return this.schema;
  }
}

module.exports = Schema;
