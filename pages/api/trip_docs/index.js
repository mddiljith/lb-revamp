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
      console.log({data})
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
      console.log({data});
      return data;
    }
  }

  const processTripDocs = async () => {
    const tripDocsParams = req.body;
    const trip_id = tripDocsParams.trip_id
    const status_id = tripDocsParams.status_id
    let data = null;
    console.log({tripDocsParams})

    if(tripDocsParams.docs) {
      tripDocsParams.docs.map((tripDoc) => {
        console.log({tripDoc})
        createTripDocs(trip_id, tripDoc)
      })
      
      data = updateTrip(trip_id, status_id)
    } else {
      console.log('No Trip docs found.')
    }
    return data;
  }

  const result = await processTripDocs();

  if(result) {
    res.status(200).json(result);
  } else {
    res.status(404).json([]);
  }

};
