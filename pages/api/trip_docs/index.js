import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

module.exports = async (req, res) => {
  const supabaseServerClient = createPagesServerClient({
    req,
    res,
  });

  const createTripDocs = async (trip_id, tripDoc) => {
    let { data, error } = await supabaseServerClient
      .from('trip_docs')
      .insert({
        trip_id: trip_id,
        docs: tripDoc.docs,
        doc_type: tripDoc.doc_type,
        url: tripDoc.url
      })
    
     if(error) {
      console.log({error})
      return error
    } else {
      return data;
    }
  } 

  const updateTrip = async (trip_id, status_id) => {
    let { data, error } = await supabaseServerClient
      .from('trips')
      .update({status_id: status_id})
      .eq("id", trip_id)
      .select()
    
    if(error) {
      console.log({error});
      return error;
    } else {
      return data;
    }
  }

  const processTripDocs = async () => {
    const tripDocsParams = req.body;
    const trip_id = tripDocsParams.trip_id
    const status_id = tripDocsParams.status_id
    let data = null;

    if(tripDocsParams.docs) {
      tripDocsParams.docs.map((tripDoc) => {
        createTripDocs(trip_id, tripDoc)
      })
      
      data = updateTrip(trip_id, status_id)
    } else {
      console.log('No Trip docs found.')
    }
    return data;
  }

  if(req.method == "POST") {
    const result = await processTripDocs();
    if(result) {
      res.status(200).json(result);
    } else {
      res.status(404).json([]);
    }
  } else {
    console.log('Unknown request')
  }
};
