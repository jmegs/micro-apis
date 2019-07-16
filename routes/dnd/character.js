const Airtable = require('airtable')
const processor = require('./lib/processors')

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY
})

const base = Airtable.base('appolcd4hC9nq6bRN')

async function fetchData() {
  const statsRecords = await base('stats')
    .select()
    .firstPage()
  const abilitiesRecords = await base('abilities')
    .select()
    .firstPage()
  const skillsRecords = await base('skills')
    .select({ view: 'list' })
    .firstPage()
  const weaponsRecords = await base('weapons')
    .select({ view: 'list' })
    .firstPage()
  const inventoryRecords = await base('inventory')
    .select({ view: 'list' })
    .firstPage()
  const featsRecords = await base('feats')
    .select()
    .firstPage()

  const stats = processor.stats(statsRecords)
  const abilities = processor.abilities(abilitiesRecords)
  const skills = processor.skills(skillsRecords)
  const weapons = processor.weapons(weaponsRecords)
  const inventory = processor.inventory(inventoryRecords)
  const feats = processor.feats(featsRecords)

  return { stats, abilities, skills, weapons, inventory, feats }
}

module.exports = async function(req, res) {
  try {
    const character = await fetchData()
    res.status(200).json(character)
  } catch (error) {
    console.log(error)
    res.status(500).json({ msg: error.message })
  }
}
