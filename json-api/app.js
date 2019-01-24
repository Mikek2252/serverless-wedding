module.exports = function (schema, data) {
  let normalisedData
  if (Array.isArray(data)) {
    normalisedData = []
    data.forEach((record) => {
      normalisedData.push(normaliseRecord(schema, record))
    })
  } else {
    normalisedData = normaliseRecord(schema, data)
  }

  // probs shouldnt have two types
  return {
    data: normalisedData
  }
}

function normaliseRecord (schema, res) {
  const attributes = {}
  const relationships = {}
  schema.attributes.forEach((attribute) => {
    // TODO: check data for undefined
    const dasherized = dasherize(attribute)
    attributes[dasherized] = res[attribute]
  })
  schema.relationships.forEach((relationship) => {
    const name = relationship.name ? relationship.name : relationship.type
    const dasherized = dasherize(name)
    relationships[dasherized] = normaliseRelationship(relationship, res)
  })

  return {
    type: schema.type,
    id: res.id,
    attributes,
    relationships
  }
}

function normaliseRelationship (schema, res) {
  let data = null
  const relationship = {}
  const links = {}

  if (schema && schema.identifier) {
    data = {
      id: res[schema.identifier],
      type: schema.type
    }
  }
  if (schema && schema.links && schema.links.related) {
    const id = res.id
    links['related'] = schema.links.related.replace(':id', id)
    relationship.links = links
  } else {
    relationship.data = data
  }
  return relationship
}

function dasherize (input) {
  return input.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}
