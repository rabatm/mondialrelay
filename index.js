
const axios = require('axios')
const parseString = require('xml2js').parseString
const md5 = require('md5')

const security = (md5("BDTEST13FR6600030PrivateK")).toUpperCase()
console.log(security)
const soap_action = 'http://www.mondialrelay.fr/webservice/WSI4_PointRelais_Recherche'
const xml = `<?xml version="1.0" encoding="UTF-8" ?> \
<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"> \
  <soap:Body>\
  <WSI4_PointRelais_Recherche xmlns="http://www.mondialrelay.fr/webservice/">
      <Enseigne>BDTEST13</Enseigne>\
      <Pays>FR</Pays>\
      <Ville></Ville>\
      <CP>66000</CP>\
      <Taille></Taille>
      <Poids></Poids>
      <Action></Action>
      <NombreResultats>30</NombreResultats>
      <Security>${security}</Security>\
      </WSI4_PointRelais_Recherche>\
  </soap:Body>\
</soap:Envelope>`

const options = {
  method: 'post',
  url: 'http://api.mondialrelay.com/Web_Services.asmx',
  headers: {
    'Content-Type':'text/xml',
    'SOAPAction': soap_action,
  },
  data: xml,
}

axios(options)
  .then(response => {
    parseString(response.data, (err, result) => {

      // console.log(JSON.stringify(result['soap:Envelope']['soap:Body']))
      var searchResult = result['soap:Envelope']['soap:Body']
      console.table(searchResult[0].WSI4_PointRelais_RechercheResponse[0].WSI4_PointRelais_RechercheResult[0])
      pointRelais=searchResult[0].WSI4_PointRelais_RechercheResponse[0].WSI4_PointRelais_RechercheResult[0].PointsRelais[0].PointRelais_Details
      pointRelais.map((point) => console.log(point.LgAdr1))
    })
  })
  .catch( err => {
    console.log(err)
  })