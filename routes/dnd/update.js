const Airtable = require('airtable')

Airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY
})

const base = Airtable.base('appolcd4hC9nq6bRN')

const updateValue = async (id, value) => {
  const record = await base('stats').update(id, { value: parseInt(value) })
  return record
}

module.exports = async (req, res) => {
  let { id, value } = req.query
  console.log(id, value)

  if (!id || !value) {
    return res.status(400).send('missing param')
  }

  try {
    const record = await updateValue(id, value)
    return res.status(200).send(`${record.get('name')} updated`)
  } catch (error) {
    console.error(error)
    return res.status(500).send('server error')
  }
}
