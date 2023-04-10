function Schema(schema) {
  const keys = Object.keys(schema);
  console.log(keys)
  for (const key of keys) {
    console.log(key, schema[key].type, schema[key].required);
  }
}

module.exports = Schema;