import { createPagesServerClient } from "@supabase/auth-helpers-nextjs";

module.exports = async (req, res) => {
  const supabaseServerClient = createPagesServerClient({
    req,
    res,
  });
  //as per the previous setup

  const {
    data: { user },
  } = await supabaseServerClient.auth.getUser();

  //or
  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession();
  //Get vehicles based on the roles
  // owner --> All vehicles owner
  //Driver--> assigned vehicles
  // specific vehicle may be seperately get by id - need to create anotehr hook/api
};
