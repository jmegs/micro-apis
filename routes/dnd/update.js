const Airtable = require('airtable')

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY
})

const base = Airtable.base('appolcd4hC9nq6bRN')

// table:String, id:String, payload:Obj
// pass the name of the table, the record id, and an object containing the
// fields and values that will be merged into the airtable record.
const updateValue = async (table, id, payload) => {
  const record = await base(table).update(id, payload)
  return record
}

module.exports = async (req, res) => {
  let { table, id, payload } = req.body
  console.log(table, id, payload)

  if (!table || !id || !payload) {
    return res.status(400).send('missing param')
  }

  try {
    await updateValue(table, id, payload)
    return res.status(200).send(`${id} updated`)
  } catch (error) {
    console.error(error)
    return res.status(500).send('server error')
  }
}
