export function stats(records) {
  return records.reduce((stats, record) => {
    let value = record.get('value')
    let id = record.get('recordID')
    stats[record.get('name')] = { value, id }
    return stats
  }, {})
}

export function abilities(records) {
  // abilities.DEX.mod
  return records.reduce((abilities, record) => {
    let mod = record.get('mod')
    let skill = record.get('skill')
    let save = record.get('save')
    abilities[record.get('name')] = { mod, skill, save }
    return abilities
  }, {})
}

export function skills(records) {
  // skills["Animal Handling"]
  return records.reduce((skills, record) => {
    skills[record.get('name')] = record.get('mod')
    return skills
  }, {})
}

export function weapons(records) {
  // name, toHit, damage, notes
  return records.reduce((weapons, record) => {
    let toHit = record.get('toHit')
    let damage = record.get('damage')
    let name = record.get('name')
    let notes = record.get('notes')
    weapons.push({ name, toHit, damage, notes })
    return weapons
  }, [])
}

export function inventory(records) {
  // quantity, note (optional)
  return records.reduce((inventory, record) => {
    let name = record.get('name')
    let quantity = record.get('quantity')
    let note = record.get('note')
    inventory.push({ name, quantity, note })
    return inventory
  }, [])
}

export function feats(records) {
  // feat, [effect, effect, effect]
  return records.reduce((feats, record) => {
    let name = record.get('name')
    let effects = record.get('effects').split('\n')
    // feats[record.get('name')] = record.get('effects').split('\n')
    feats.push({ name, effects })
    return feats
  }, [])
}
